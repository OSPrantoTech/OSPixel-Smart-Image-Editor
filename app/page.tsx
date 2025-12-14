// =======================================================
// File: page.tsx - FINAL Hyper-Minimalistic UI (Aggressive Space Reduction)
// Description: Reduced py and space-y values to the absolute minimum.
// =======================================================

"use client"

import { useState } from "react"
// কম্পোনেন্টগুলি
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FileUpload } from "@/components/file-upload" // এই কম্পোনেন্টের ভেতরের স্পেসও কমাতে হবে
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
  // স্টেট ম্যানেজমেন্ট (পরিবর্তন নেই)
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
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />

      <main className="flex-1">
        
        {/* Converter Section: py-8 থেকে py-4 করা হলো - সর্বোচ্চ স্পেস কমানো হলো */}
        <section 
            id="converter" 
            className="
                py-4 px-4 
                min-h-[calc(100vh-100px)] 
                flex items-center justify-center
            "
        >
          <div className="container mx-auto max-w-6xl space-y-4"> {/* space-y-6 থেকে 4 করা হলো */}
            
                {/* হেডলাইন: গ্যাপ আরও কমানো হলো */}
            <div className="text-center space-y-0"> {/* space-y-0.5 থেকে 0 করা হলো */}
              <h2 className="text-3xl font-extrabold text-blue-400">OSPixel Converter</h2>
              <p className="text-md text-gray-400 font-manrope max-w-2xl mx-auto">
                    OSPranto Tech: Technology with a Sense of Ease
              </p>
            </div>

            {/* Upload Section: pt-2 থেকে pt-0 করা হলো - একদম উপরে নিয়ে আসা হলো */}
            {uploadedFiles.length === 0 ? (
                // --- আপলোড বক্সের নতুন, ছোট এবং প্রিমিয়াম স্টাইল ---
                <div className="flex justify-center pt-0"> 
                    <div 
                        className="
                            bg-gray-800 
                            p-8 
                            border-2 border-dashed border-blue-600/50 
                            rounded-xl 
                            shadow-xl 
                            hover:border-blue-500 
                            transition-all duration-300 
                            max-w-md w-full 
                        "
                    >
                        <FileUpload onFilesUploaded={setUploadedFiles} maxFiles={20} />
                    </div>
                </div>
            ) : (
                // --- সেটিংস এবং প্রিভিউ সেকশন ---
                <div className="grid gap-6 lg:grid-cols-3 pt-4"> 
                    {/* বাম দিকের কলাম */}
                    <div className="lg:col-span-2 space-y-4"> {/* space-y-6 থেকে 4 করা হলো */}
                        <FormatSelector onSettingsChange={setConversionSettings} />
                        
                        {/* Selected Files Card */}
                        <Card className="p-4 bg-gray-800 border border-gray-700"> {/* p-6 থেকে 4 করা হলো */}
                            <h3 className="text-lg font-semibold text-white mb-3"> {/* mb-4 থেকে 3 করা হলো */}
                                Selected Files ({uploadedFiles.length})
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {/* ... File Previews ... */}
                                {uploadedFiles.slice(0, 8).map((file) => (
                                    <div key={file.id} className="relative group">
                                        <div className="aspect-square bg-gray-700 border border-gray-600 overflow-hidden rounded-md">
                                            <img
                                                src={file.preview || "/placeholder.svg"}
                                                alt={file.file.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                ))}
                                {uploadedFiles.length > 8 && (
                                    <div className="aspect-square bg-gray-700 border border-gray-600 flex items-center justify-center rounded-md">
                                        <p className="text-gray-400 text-sm">+{uploadedFiles.length - 8} more</p>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div>

                    {/* ডান দিকের কলাম: Convert Button & Settings Summary */}
                    <div className="space-y-4"> {/* space-y-6 থেকে 4 করা হলো */}
                        <Card className="p-4 bg-blue-950/40 border-blue-700/50"> {/* p-6 থেকে 4 করা হলো */}
                            <div className="space-y-4"> {/* space-y-6 থেকে 4 করা হলো */}
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-blue-600/10 text-blue-400 mx-auto mb-2 flex items-center justify-center rounded-full"> {/* সাইজ ও mb কমানো হলো */}
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-base font-semibold text-white mb-1">Ready to Convert</h3> {/* ফন্ট সাইজ ও mb কমানো হলো */}
                                </div>

                                <div className="space-y-2 text-sm text-gray-300"> {/* space-y-3 থেকে 2 করা হলো */}
                                    {/* ... Settings rows ... */}
                                    <div className="flex justify-between items-center py-1 border-b border-gray-700"> {/* py-2 থেকে 1 করা হলো */}
                                        <span>Files selected:</span>
                                        <span className="font-medium text-white">{uploadedFiles.length}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1 border-b border-gray-700"> {/* py-2 থেকে 1 করা হলো */}
                                        <span>Output format:</span>
                                        <span className="font-medium text-white uppercase">{conversionSettings.format}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1 border-b border-gray-700"> {/* py-2 থেকে 1 করা হলো */}
                                        <span>Quality:</span>
                                        <span className="font-medium text-white">{conversionSettings.quality}%</span>
                                    </div>
                                    {conversionSettings.resize && (
                                        <div className="flex justify-between items-center py-1 border-b border-gray-700"> {/* py-2 থেকে 1 করা হলো */}
                                            <span>Resize:</span>
                                            <span className="font-medium text-white">
                                                {conversionSettings.width}×{conversionSettings.height}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <Button onClick={handleConvert} disabled={isConverting} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold" size="sm"> {/* size="lg" থেকে "sm" করা হলো */}
                                    {isConverting ? (
                                        <>
                                            <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2"></div>
                                            Converting...
                                        </>
                                    ) : (
                                        <>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
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

            {/* Results Section */}
            {conversionResults.length > 0 && (
              <div className="bg-gray-800 p-4 border border-gray-700 rounded-lg mt-4"> {/* p-6 থেকে 4 করা হলো */}
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
