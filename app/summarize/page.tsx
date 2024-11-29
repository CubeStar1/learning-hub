"use client"

import { useState } from "react"
import { useCompletion } from "ai/react"
import { toast } from "sonner"
import { FileUp, Book, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SelectMaterial } from "../components/podcast/SelectMaterial"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import Markdown from "react-markdown"
import { cn } from "@/lib/utils"

interface FileData {
  name: string;
  type: string;
  data: string;
}

// Add this mock data
const MOCK_SUMMARY = `# Operating System Process Synchronization Summary

## Key Points

* **Process Synchronization** is a fundamental concept in operating systems that manages concurrent access to shared resources
* **Race Conditions** occur when multiple processes access shared data simultaneously
* **Critical Section** is the part of code where shared resources are accessed
* **Mutual Exclusion** ensures only one process can execute in the critical section at a time

## Important Details

### Synchronization Mechanisms

1. **Mutex Locks**
   * Simple solution for mutual exclusion
   * Uses acquire() and release() operations
   * Provides strict mutual exclusion

2. **Semaphores**
   * More versatile than mutex locks
   * Can handle multiple resources
   * Types:
     * Binary semaphores (similar to mutex)
     * Counting semaphores (for multiple resources)

3. **Monitors**
   * High-level synchronization construct
   * Provides built-in mutual exclusion
   * Uses condition variables for process coordination

## Conclusions

* Process synchronization is crucial for maintaining data consistency
* Multiple solutions exist, each with their own trade-offs
* Key challenges include:
  * Avoiding deadlocks
  * Preventing starvation
  * Ensuring fairness`;

export default function Summarize() {
  const [files, setFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [showSelectMaterial, setShowSelectMaterial] = useState(false)
  const [summary, setSummary] = useState<string>("")

  const {
    completion,
    complete,
    isLoading,
  } = useCompletion({
    api: "/api/generate-summary",
    onResponse: (response) => {
      console.log("Response received:", response)
    },
    onFinish: (completion) => {
      console.log("Final completion:", completion)
      toast.success("Summary generated successfully!")
    },
    onError: (error) => {
      console.error("Error:", error)
      toast.error("Failed to generate summary. Please try again.")
      setFiles([])
    },
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    const validFiles = selectedFiles.filter(
      (file) => file.type === "application/pdf" && file.size <= 5 * 1024 * 1024,
    )

    if (validFiles.length !== selectedFiles.length) {
      toast.error("Only PDF files under 5MB are allowed.")
    }

    setFiles(validFiles)
  }

  const encodeFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }

  const handleSubmitWithFiles = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (files.length === 0) {
      toast.error("Please select a file first")
      return
    }

    try {
      // Simulate loading
      setSummary("")
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Set mock summary
      setSummary(MOCK_SUMMARY)
      toast.success("Summary generated successfully!")
    } catch (error) {
      console.error('Error processing file:', error)
      toast.error("Failed to process the file")
    }
  }

  const handleMaterialSelect = async (url: string) => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const file = new File([blob], "selected-material.pdf", { type: "application/pdf" })
      setFiles([file])
      setShowSelectMaterial(false)
    } catch (error) {
      toast.error("Failed to load the selected material")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="container py-12 max-w-4xl mx-auto px-4">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600">
              Document Summarizer
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Upload your document and get an AI-powered summary in seconds
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Upload Section */}
            {showSelectMaterial ? (
              <SelectMaterial onSelect={handleMaterialSelect} />
            ) : (
              <Card className="border border-gray-100 dark:border-gray-800 shadow-xl">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Upload PDF</CardTitle>
                      <CardDescription>
                        Upload a PDF to generate a comprehensive summary
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setShowSelectMaterial(true)}
                    >
                      <Book className="h-4 w-4 mr-2" />
                      Select Material
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitWithFiles} className="space-y-6">
                    <div
                      className={cn(
                        "relative flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 transition-colors",
                        isDragging 
                          ? "border-primary/50 bg-primary/5" 
                          : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700",
                      )}
                      onDragOver={(e) => {
                        e.preventDefault()
                        setIsDragging(true)
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={(e) => {
                        e.preventDefault()
                        setIsDragging(false)
                        handleFileChange({
                          target: { files: e.dataTransfer.files },
                        } as React.ChangeEvent<HTMLInputElement>)
                      }}
                    >
                      <input
                        type="file"
                        onChange={handleFileChange}
                        accept="application/pdf"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <FileUp className="h-10 w-10 mb-4 text-gray-400" />
                      <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                        {files.length > 0 ? (
                          <span className="font-medium text-primary">
                            {files[0].name}
                          </span>
                        ) : (
                          <span>Drop your PDF here or click to browse</span>
                        )}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                        PDF files up to 5MB
                      </p>
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={files.length === 0 || isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center space-x-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Generating Summary...</span>
                        </span>
                      ) : (
                        "Generate Summary"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Summary Display */}
            {summary && (
              <Card className="border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden">
                <CardHeader>
                  <CardTitle>Summary</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none p-6">
                  <Markdown>{summary}</Markdown>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 