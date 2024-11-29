"use client";
import { useState, useEffect } from "react";
import { createSupabaseBrowser } from "@/lib/supabase/client";
import { Book, FileText, Plus } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import Link from "next/link";

interface LearningMaterial {
  id: string;
  name: string;
  url: string;
}

export function MaterialsList() {
  const [materials, setMaterials] = useState<LearningMaterial[]>([]);
  const supabase = createSupabaseBrowser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('learning_materials')
      .select('id, name, url')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      toast.error("Failed to fetch materials");
      return;
    }

    setMaterials(data || []);
  };

  const handleMaterialClick = (material: LearningMaterial) => {
    if (pathname.startsWith('/quiz')) {
      router.push('/quiz/new');
    } else if (pathname.startsWith('/podcast')) {
      router.push('/podcast');
    }
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="flex justify-between items-center">
        <span>Materials</span>
        <Link href="/materials">
          <Plus className="h-4 w-4 hover:text-primary" />
        </Link>
      </SidebarGroupLabel>
      <SidebarMenu>
        {materials.map((material) => (
          <SidebarMenuItem key={material.id}>
            <SidebarMenuButton
              onClick={() => handleMaterialClick(material)}
              tooltip={material.name}
            >
              <Book className="h-4 w-4" />
              <span className="truncate">{material.name}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
        {materials.length === 0 && (
          <SidebarMenuItem>
            <span className="text-xs text-muted-foreground px-2">
              No materials yet
            </span>
          </SidebarMenuItem>
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
} 