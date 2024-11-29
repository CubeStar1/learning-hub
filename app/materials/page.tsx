"use client";
import { useState, useEffect } from "react";
import { createSupabaseBrowser } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { FileUp, Book, Headphones, Loader2, Trash2, Upload, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { toast } from "sonner";

interface LearningMaterial {
  id: string;
  name: string;
  type: string;
  size: number;
  created_at: string;
  url: string;
  file_path: string;
}

export default function MaterialsPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [materials, setMaterials] = useState<LearningMaterial[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const supabase = createSupabaseBrowser();

  // Fetch existing materials
  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Please login to view materials");
      return;
    }

    const { data, error } = await supabase
      .from('learning_materials')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      toast.error("Failed to fetch materials");
      return;
    }

    setMaterials(data || []);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = selectedFiles.filter(
      (file) => file.type === "application/pdf" && file.size <= 5 * 1024 * 1024
    );

    if (validFiles.length !== selectedFiles.length) {
      toast.error("Only PDF files under 5MB are allowed.");
    }

    setFiles(validFiles);
  };

  const uploadMaterials = async () => {
    setIsUploading(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("Please login to upload materials");
      return;
    }

    try {
      for (const file of files) {
        // Create a unique filename to prevent conflicts
        const timestamp = Date.now();
        const uniqueFileName = `${timestamp}-${file.name.replace(/\s+/g, '-')}`;
        const filePath = `${user.id}/${uniqueFileName}`;

        // Upload to storage bucket
        const { error: uploadError } = await supabase.storage
          .from('learning_materials')
          .upload(filePath, file);

        if (uploadError) {
          console.error('Upload error:', uploadError);
          throw uploadError;
        }

        // Get the public URL
        const { data: { publicUrl } } = supabase.storage
          .from('learning_materials')
          .getPublicUrl(filePath);

        // Save reference in the database
        const { error: dbError } = await supabase
          .from('learning_materials')
          .insert({
            user_id: user.id,
            name: file.name,
            type: 'pdf',
            size: file.size,
            url: publicUrl,
            file_path: filePath // Store the file path for deletion later
          });

        if (dbError) {
          console.error('Database error:', dbError);
          throw dbError;
        }
      }

      toast.success("Materials uploaded successfully!");
      setFiles([]);
      fetchMaterials(); // Refresh the materials list
    } catch (error) {
      console.error('Upload error:', error);
      toast.error("Failed to upload materials");
    } finally {
      setIsUploading(false);
    }
  };

  const deleteMaterial = async (material: LearningMaterial) => {
    try {
      // First delete from storage
      const { error: storageError } = await supabase.storage
        .from('learning_materials')
        .remove([material.file_path]);

      if (storageError) {
        console.error('Storage deletion error:', storageError);
        throw storageError;
      }

      // Then delete from database
      const { error: dbError } = await supabase
        .from('learning_materials')
        .delete()
        .eq('id', material.id);

      if (dbError) {
        console.error('Database deletion error:', dbError);
        throw dbError;
      }

      setMaterials(materials.filter(m => m.id !== material.id));
      toast.success("Material deleted successfully");
    } catch (error) {
      console.error('Deletion error:', error);
      toast.error("Failed to delete material");
    }
  };

  return (
    <div className="container max-w-7xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Learning Materials</h1>
          <p className="text-muted-foreground mt-2">
            Upload and manage your study materials in one place
          </p>
        </div>
      </div>

      {/* Upload Section */}
      <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Upload className="h-6 w-6" />
            Upload Materials
          </CardTitle>
          <CardDescription className="text-base">
            Upload PDF files to create quizzes or podcasts. Maximum file size is 5MB.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-primary/20 hover:border-primary/40 rounded-xl p-8 transition-colors bg-background/40">
            <input
              type="file"
              onChange={handleFileChange}
              accept="application/pdf"
              multiple
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <FileUp className="h-12 w-12 mb-4 text-primary/60" />
            <p className="text-lg text-center mb-2">
              {files.length > 0 ? (
                <span className="font-medium text-primary">
                  {files.length} file(s) selected
                </span>
              ) : (
                <span>Drop your PDFs here or click to browse</span>
              )}
            </p>
            <p className="text-sm text-muted-foreground">
              PDF files up to 5MB
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={uploadMaterials} 
            disabled={files.length === 0 || isUploading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
            size="lg"
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <FileUp className="mr-2 h-5 w-5" />
                Upload Materials
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {/* Materials List */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <FileText className="h-6 w-6" />
          Your Materials
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((material) => (
            <Card 
              key={material.id}
              className="group hover:shadow-lg transition-all duration-300 border border-border/50"
            >
              <CardHeader>
                <CardTitle className="text-lg truncate flex items-center gap-2">
                  <Book className="h-5 w-5 text-primary" />
                  {material.name}
                </CardTitle>
                <CardDescription className="flex items-center justify-between">
                  <span>{new Date(material.created_at).toLocaleDateString()}</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {(material.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <Button
                    variant="default"
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                    onClick={() => {
                      localStorage.setItem('selectedMaterial', JSON.stringify(material));
                      router.push('/quiz/new');
                    }}
                  >
                    <Book className="mr-2 h-4 w-4" />
                    Create Quiz
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                    onClick={() => {
                      localStorage.setItem('selectedMaterial', JSON.stringify(material));
                      router.push('/podcast');
                    }}
                  >
                    <Headphones className="mr-2 h-4 w-4" />
                    Create Podcast
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => deleteMaterial(material)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
          
          {materials.length === 0 && (
            <Card className="col-span-full p-12 text-center bg-muted/40">
              <CardContent className="space-y-3">
                <div className="flex justify-center">
                  <FileText className="h-12 w-12 text-muted-foreground/60" />
                </div>
                <h3 className="text-xl font-medium">No materials yet</h3>
                <p className="text-muted-foreground">
                  Upload your first PDF to get started with quizzes and podcasts
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
} 