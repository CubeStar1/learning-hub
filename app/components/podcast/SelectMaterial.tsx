"use client";
import { useState, useEffect } from "react";
import { createSupabaseBrowser } from "@/lib/supabase/client";
import { FileText, Upload } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

interface LearningMaterial {
  id: string;
  name: string;
  url: string;
  created_at: string;
}

interface SelectMaterialProps {
  onSelect: (url: string) => void;
}

export function SelectMaterial({ onSelect }: SelectMaterialProps) {
  const [materials, setMaterials] = useState<LearningMaterial[]>([]);
  const supabase = createSupabaseBrowser();

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('learning_materials')
      .select('id, name, url, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      toast.error("Failed to fetch materials");
      return;
    }
    console.log(data);

    setMaterials(data || []);
  };

  return (
    <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Upload className="h-6 w-6" />
          Select from Materials
        </CardTitle>
        <CardDescription className="text-base">
          Choose from your previously uploaded materials to create a podcast
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-2">
            {materials.map((material) => (
              <Button
                key={material.id}
                variant="outline"
                className="w-full justify-start text-left h-auto p-4"
                onClick={() => onSelect(material.url)}
              >
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{material.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(material.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Button>
            ))}
            {materials.length === 0 && (
              <div className="text-center text-sm text-muted-foreground p-4">
                No materials found. Upload some materials first!
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
} 