// =======================================================
// File: page.tsx - Premium & Minimalist UI Redesign
// Theme: Dark, Centralized, High-Contrast
// =======================================================

"use client"

import { useState } from "react"
// কম্পোনেন্টগুলি
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FileUpload } from "@/components/file-upload" 
import { FormatSelector, type ConversionSettings } from "@/components/format-selector"
import { DownloadResults } from "@/components/download-results"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ImageConverter, type ConversionResult } from "@/lib/image-converter"

// ইন্টারফেসগুলো (পরিবর্তন নেই)
interface UploadedFile {
  file: File
  preview: string
  id: string
}

export default function HomePage() {
  // সমস্ত স্টেট ম্যানেজমেন্ট (পরিবর্তন নেই)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [conversionSettings, setConversionSettings] = useState<ConversionSettings>({
    format: "jpg",
    quality: 85,
    resize: false,
  })
  const [isConverting, setIsConverting] = useState(false)
  const [conversionResults, setConversionResults] = useState<ConversionResult[]>([])
  const [converter, setConverter] = useState<ImageConverter | null>(null)

  // হ্যান্ডলার্স (পরিবর্তন নেই)
  const getConverter = () => {
    if (!converter) {
      setConverter(new ImageConverter())
    }
    return converter
  }
  const handleConvert = async () => { /* ... conversion logic ... */ }
  const handleDownloadAll = () => { /* ... download logic ... */ }
  const handleDownloadSingle = (result: ConversionResult) => { /* ... download single logic ... */ }
  const handleClearResults = () => { /* ... clear logic ... */ }

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white"> {/* ডার্ক ব্ল্যাক ব্যাকগ্রাউন্ড */}
      <Header />

      <main className="flex-1">
        
        {/* Converter Section: ফোকাসড সেন্ট্রাল ডিজাইন */}
        <section 
            id="converter" 
            className="
                py-16 px-4 
                min-h-[calc(100vh-160px)] 
                flex items-center justify-center
            "
        >
          <div className="container mx-auto max-w-4xl space-y-8"> 
            
                {/* হেডলাইন: প্রিমিয়াম টাইপোগ্রাফি */}
            <div className="text-center space-y-1">
              <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 leading-tight">
                    OSPixel Converter
                </h2>
              <p className="text-lg text-gray-500 font-manrope">
                    Advanced Image Conversion with Professional Quality
              </p>
            </div>

            {/* Main Converter Card - সব কিছু এই কার্ডের ভেতরে থাকবে */}
            <Card className="bg-[#1C1C1C] border border-gray-800 p-8 shadow-2xl rounded-xl">
                {uploadedFiles.length === 0 ? (
                    // --- স্টেপ 1: ফাইল আপলোড ---
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-white border-b border-gray-700 pb-3">
                            Step 1: Upload Your Images
                        </h3>
                        <FileUpload onFilesUploaded={setUploadedFiles} maxFiles={20} />
                    </div>
                ) : (
                    // --- স্টেপ 2: সেটিংস, প্রিভিউ ও কনভার্ট ---
                    <div className="grid lg:grid-cols-3 gap-8">
                        
                        {/* বাম দিকের কলাম: সেটিংস */}
                        <div className="lg:col-span-1 space-y-6">
                            <h3 className="text-xl font-semibold text-white border-b border-gray-700 pb-3">
                                Step 2: Conversion Settings
                            </h3>
                            <FormatSelector onSettingsChange={setConversionSettings} />

                            {/* Convert Button Block */}
                            <div className="p-4 bg-blue-950/30 border border-blue-700/50 rounded-lg">
                                <h4 className="text-lg font-bold text-white mb-3">Ready to Convert?</h4>
                                <Button onClick={handleConvert} disabled={isConverting} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold" size="lg">
                                    {isConverting ? (
                                        <>
                                            <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2"></div>
                                            Converting...
                                        </>
                                    ) : (
                                        <>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                                                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                                            </svg>
                                            Start Conversion ({uploadedFiles.length} files)
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>

                        {/* ডান দিকের কলাম: ফাইল প্রিভিউ */}
                        <div className="lg:col-span-2 space-y-6">
                            <h3 className="text-xl font-semibold text-white border-b border-gray-700 pb-3">
                                Selected Files Preview
                            </h3>
                            <div className="grid grid-cols-3 md:grid-cols-4 gap-4 p-4 bg-[#0A0A0A] rounded-lg border border-gray-800 h-[300px] overflow-y-auto">
                                {uploadedFiles.map((file) => (
                                    <div key={file.id} className="relative aspect-square group">
                                        <img
                                            src={file.preview || "/placeholder.svg"}
                                            alt={file.file.name}
                                            className="w-full h-full object-cover rounded-md border border-gray-700 transition-transform group-hover:scale-[1.05]"
                                        />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-md">
                                            <p className="text-xs text-white font-medium truncate w-11/12 text-center">{file.file.name}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </Card>

            {/* Results Section (কার্ডের বাইরে, যখন কনভার্ট শেষ হবে) */}
            {conversionResults.length > 0 && (
              <div className="bg-[#1C1C1C] p-6 border border-blue-700/50 rounded-xl mt-6">
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
        
      </main>

      <Footer />
    </div>
  )
}
