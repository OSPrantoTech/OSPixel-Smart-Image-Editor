// =======================================================
// File: HomePage.tsx (Fixed)
// Branding: OSPranto Tech - Technology with a Sense of Ease
// Description: Updated file with modern upload box design and branding.
// =======================================================

"use client"

import { useState } from "react"
// Header এবং Footer কম্পোনেন্টগুলি রাখা হয়েছে
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
// বাকি প্রয়োজনীয় কম্পোনেন্টগুলি
import { FileUpload } from "@/components/file-upload"
import { FormatSelector, type ConversionSettings } from "@/components/format-selector"
import { DownloadResults } from "@/components/download-results"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ImageConverter, type ConversionResult } from "@/lib/image-converter"

// ইন্টারফেসগুলো ডেটা টাইপ ডিফাইন করার জন্য রাখা হলো
interface UploadedFile {
  file: File
  preview: string
  id: string
}

export default function HomePage() {
  // সমস্ত স্টেট ম্যানেজমেন্ট রাখা হলো
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [conversionSettings, setConversionSettings] = useState<ConversionSettings>({
    format: "jpg",
    quality: 85,
    resize: false,
  })
  const [isConverting, setIsConverting] = useState(false)
  const [conversionResults, setConversionResults] = useState<ConversionResult[]>([])
  const [converter, setConverter] = useState<ImageConverter | null>(null)

  // ইউটিলিটি ফাংশন
  const getConverter = () => {
    if (!converter) {
      setConverter(new ImageConverter())
    }
    return converter
  }

  // কনভার্ট হ্যান্ডলার
  const handleConvert = async () => {
    if (uploadedFiles.length === 0) return

    setIsConverting(true)
    setConversionResults([])

    try {
      const files = uploadedFiles.map((uf) => uf.file)
      const converterInstance = getConverter()
      if (converterInstance) {
        const results = await converterInstance.convertMultiple(files, conversionSettings)
        setConversionResults(results)
      }
    } catch (error) {
      console.error("Conversion failed:", error)
    } finally {
      setIsConverting(false)
    }
  }

  // সমস্ত ফাইল ডাউনলোড হ্যান্ডলার
  const handleDownloadAll = () => {
    const converterInstance = getConverter()
    if (converterInstance) {
      converterInstance.downloadMultiple(conversionResults, conversionSettings.format)
    }
  }

  // একক ফাইল ডাউনলোড হ্যান্ডলার
  const handleDownloadSingle = (result: ConversionResult) => {
    const converterInstance = getConverter()
    if (converterInstance) {
      const originalName = result.originalFile.name
      const nameWithoutExt = originalName.substring(0, originalName.lastIndexOf("."))
      const newFilename = `${nameWithoutExt}_converted.${conversionSettings.format}`
      converterInstance.downloadFile(result.convertedBlob, newFilename)
    }
  }

  // ফলাফল মুছে ফেলার হ্যান্ডলার
  const handleClearResults = () => {
    setConversionResults([])
    setUploadedFiles([])
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        
        {/* Converter Section - মূল কন্টেন্ট এবং লেআউট পরিবর্তন করা হয়েছে */}
        <section id="converter" className="py-16 px-4 min-h-[calc(100vh-64px)] flex items-center">
          <div className="container mx-auto max-w-6xl space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                    OSPixel Converter 
                    <span className="block text-sm font-normal text-muted-foreground mt-1 italic">
                        OSPranto Tech: Technology with a Sense of Ease
                    </span>
                </h2> 
              <p className="text-lg text-muted-foreground font-manrope max-w-2xl mx-auto">
                Upload your images, choose your desired format, and convert with professional quality.
              </p>
            </div>

            {/* Upload Section: মূল পরিবর্তন এখানে করা হয়েছে */}
            <div 
                className="
                    p-10 sm:p-12 lg:p-16 
                    bg-gray-800 
                    border-2 border-gray-700 
                    rounded-2xl 
                    shadow-2xl 
                    shadow-blue-500/10 
                    hover:border-blue-500 
                    transition-all duration-300
                "
            >
              <FileUpload onFilesUploaded={setUploadedFiles} maxFiles={20} />
            </div>

            {/* Settings and Convert */}
            {uploadedFiles.length > 0 && (
              <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                  <FormatSelector onSettingsChange={setConversionSettings} />

                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      Selected Files ({uploadedFiles.length})
                    </h3>
                    {/* ফাইল প্রিভিউ */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {uploadedFiles.slice(0, 8).map((file) => (
                        <div key={file.id} className="relative group">
                          <div className="aspect-square bg-muted border border-border overflow-hidden">
                            <img
                              src={file.preview || "/placeholder.svg"}
                              alt={file.file.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <p className="text-white text-xs text-center px-2">{file.file.name}</p>
                          </div>
                        </div>
                      ))}
                      {uploadedFiles.length > 8 && (
                        <div className="aspect-square bg-muted border border-border flex items-center justify-center">
                          <p className="text-muted-foreground text-sm">+{uploadedFiles.length - 8} more</p>
                        </div>
                      )}
                    </div>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card className="p-6 bg-primary/5 border-primary/20">
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-primary/10 text-primary mx-auto mb-4 flex items-center justify-center">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                          >
                            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Ready to Convert</h3>
                      </div>

                      {/* কনভারশন সেটিং ডিটেইলস */}
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center py-2 border-b border-border/50">
                          <span className="text-muted-foreground">Files selected:</span>
                          <span className="font-medium text-foreground">{uploadedFiles.length}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-border/50">
                          <span className="text-muted-foreground">Output format:</span>
                          <span className="font-medium text-foreground uppercase">{conversionSettings.format}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-border/50">
                          <span className="text-muted-foreground">Quality:</span>
                          <span className="font-medium text-foreground">{conversionSettings.quality}%</span>
                        </div>
                        {conversionSettings.resize && (
                          <div className="flex justify-between items-center py-2 border-b border-border/50">
                            <span className="text-muted-foreground">Resize:</span>
                            <span className="font-medium text-foreground">
                              {conversionSettings.width}×{conversionSettings.height}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* কনভার্ট বাটন */}
                      <Button onClick={handleConvert} disabled={isConverting} className="w-full" size="lg">
                        {isConverting ? (
                          <>
                            <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2"></div>
                            Converting...
                          </>
                        ) : (
                          <>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="mr-2"
                            >
                              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                            </svg>
                            Convert Images
                          </>
                        )}
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {/* Results */}
            {conversionResults.length > 0 && (
              <div className="bg-muted/30 p-8 border border-border">
                <DownloadResults
                  results={conversionResults}
                  format={conversionSettings.format}
                  onDownloadAll={handleDownloadAll}
                  onDownloadSingle={handleDownloadSingle}
                  onClear={handleClearResults}
                />
              </div>
            )}
          </div>
        </section>
        
        {/* Contact Section: OSPranto Tech এর জন্য */}
        <section id="contact" className="py-12 border-t border-gray-800 bg-gray-900 text-white">
            <div className="container mx-auto max-w-6xl text-center">
                <h3 className="text-xl font-semibold text-white mb-4">
                    Connect with OSPranto Tech: Technology with a Sense of Ease
                </h3>
                <div className="space-y-2 sm:space-y-0 sm:space-x-8 text-gray-400 flex flex-wrap justify-center">
                    <p>
                        <span className="font-medium text-blue-400">FB:</span> Adnan Hasan Pranto
                    </p>
                    <p>
                        <span className="font-medium text-blue-400">Email:</span> OSPranto.Official@gmail.com
                    </p>
                    <p>
                        <span className="font-medium text-blue-400">Github:</span> OSPranto Tech
                    </p>
                    <p>
                        <span className="font-medium text-blue-400">Telegram:</span> @MrMysteryMoon
                    </p>
                </div>
            </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
