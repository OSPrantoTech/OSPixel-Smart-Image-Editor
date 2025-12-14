"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface UploadedFile {
  file: File
  preview: string
  id: string
}

interface FileUploadProps {
  onFilesUploaded: (files: UploadedFile[]) => void
  maxFiles?: number
}

export function FileUpload({ onFilesUploaded, maxFiles = 10 }: FileUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        id: Math.random().toString(36).substr(2, 9),
      }))

      const updatedFiles = [...uploadedFiles, ...newFiles].slice(0, maxFiles)
      setUploadedFiles(updatedFiles)
      onFilesUploaded(updatedFiles)
    },
    [uploadedFiles, maxFiles, onFilesUploaded],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".bmp", ".webp", ".tiff", ".svg"],
    },
    maxFiles: maxFiles - uploadedFiles.length,
    disabled: uploadedFiles.length >= maxFiles,
  })

  const removeFile = (id: string) => {
    const updatedFiles = uploadedFiles.filter((file) => file.id !== id)
    setUploadedFiles(updatedFiles)
    onFilesUploaded(updatedFiles)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="w-full space-y-4"> {/* space-y-6 থেকে 4 করা হলো */}
      {/* Upload Area */}
      <Card className="p-0 border-none shadow-none bg-transparent"> {/* p-8 থেকে p-0 করা হলো এবং Card ডিজাইন রিমুভ করা হলো */}
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200 {/* p-12 থেকে p-8 করা হলো */}
            ${
              isDragActive
                ? "border-blue-500 bg-blue-900/10 scale-[1.02]"
                : "border-blue-600/50 hover:border-blue-500/80 bg-gray-900/50" // কালার `page.tsx`-এর সাথে ম্যাচ করানো হলো
            }
            ${uploadedFiles.length >= maxFiles ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          <input {...getInputProps()} />

          <div className="flex flex-col items-center gap-3"> {/* gap-4 থেকে 3 করা হলো */}
            <div className="p-3 bg-blue-600/10 text-blue-400 rounded-full"> {/* p-4 থেকে 3 করা হলো এবং ডিজাইন প্রিমিয়াম করা হলো */}
              <svg
                width="32" /* 48 থেকে 32 করা হলো */
                height="32" /* 48 থেকে 32 করা হলো */
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7,10 12,15 17,10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
            </div>

            <div className="space-y-1"> {/* space-y-2 থেকে 1 করা হলো */}
              <h3 className="text-lg font-semibold text-white"> {/* text-xl থেকে lg করা হলো */}
                {isDragActive ? "Drop your images here" : "Upload your images"}
              </h3>
              <p className="text-sm text-gray-400 font-manrope">Drag and drop your images here, or click to browse</p> {/* text-muted-foreground থেকে text-gray-400 করা হলো */}
              <p className="text-xs text-gray-500">Supports: JPEG, PNG, GIF, BMP, WebP, TIFF, SVG</p> {/* text-sm থেকে xs করা হলো */}
            </div>

            {uploadedFiles.length < maxFiles && (
              <Button 
                    variant="default" 
                    className="mt-3 bg-blue-600 hover:bg-blue-700 text-white" /* mt-4 থেকে 3 করা হলো এবং default প্রিমিয়াম কালার */
                    size="sm" /* সাইজ ছোট করা হলো */
                >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7,10 12,15 17,10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
                Choose Files
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Uploaded Files Section - এখানেও সামান্য স্পেস কমানো হলো */}
      {uploadedFiles.length > 0 && (
        <Card className="p-4 bg-gray-800 border-gray-700"> {/* p-6 থেকে 4 করা হলো */}
          <div className="flex items-center justify-between mb-3"> {/* mb-4 থেকে 3 করা হলো */}
            <h3 className="text-base font-semibold text-white">Uploaded Files ({uploadedFiles.length})</h3> {/* text-lg থেকে base করা হলো */}
            <Button
              variant="ghost"
              size="xs" /* নতুন সাইজ */
              onClick={() => {
                setUploadedFiles([])
                onFilesUploaded([])
              }}
            >
              Clear All
            </Button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"> {/* gap-4 থেকে 3 করা হলো */}
            {uploadedFiles.map((uploadedFile) => (
              <div
                key={uploadedFile.id}
                className="group relative border border-gray-700 p-3 hover:border-blue-500/50 transition-colors bg-gray-900" /* p-4 থেকে 3 করা হলো */
              >
                <div className="flex items-start gap-2"> {/* gap-3 থেকে 2 করা হলো */}
                  <div className="flex-shrink-0">
                    <img
                      src={uploadedFile.preview || "/placeholder.svg"}
                      alt={uploadedFile.file.name}
                      className="h-10 w-10 object-cover border border-gray-600 rounded-sm" /* h-12 w-12 থেকে 10 করা হলো */
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{uploadedFile.file.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(uploadedFile.file.size)}</p>
                    <Badge variant="secondary" className="mt-1 text-xs bg-gray-700 text-gray-300">
                      {uploadedFile.file.type.split("/")[1].toUpperCase()}
                    </Badge>
                  </div>

                  <Button
                    variant="ghost"
                    size="xs" /* নতুন সাইজ */
                    className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:bg-gray-700" /* h-8 w-8 থেকে 7 করা হলো */
                    onClick={() => removeFile(uploadedFile.id)}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
