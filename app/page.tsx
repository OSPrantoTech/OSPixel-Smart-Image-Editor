// =======================================================
// File: page.tsx - Final Minimalistic UI
// Branding: OSPranto Tech - Technology with a Sense of Ease
// Description: Compact, premium design with removed contact section.
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

// ইন্টারফেসগুলো
interface UploadedFile {
  file: File
  preview: string
  id: string
}

export default function HomePage() {
  // সমস্ত স্টেট ম্যানেজমেন্ট (পূর্বের মতো রাখা হলো)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [conversionSettings, setConversionSettings] = useState<ConversionSettings>({
    format: "jpg",
    quality: 85,
    resize: false,
  })
  const [isConverting, setIsConverting] = useState(false)
  const [conversionResults, setConversionResults] = useState<ConversionResult[]>([])
  const [converter, setConverter] = useState<ImageConverter | null>(null)

  // হ্যান্ডলার্স (পূর্বের মতো রাখা হলো)
  const getConverter = () => {
    if (!converter) {
      setConverter(new ImageConverter())
    }
    return converter
  }
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
  const handleDownloadAll = () => {
    const converterInstance = getConverter()
    if (converterInstance) {
      converterInstance.downloadMultiple(conversionResults, conversionSettings.format)
    }
  }
  const handleDownloadSingle = (result: ConversionResult) => {
    const converterInstance = getConverter()
    if (converterInstance) {
      const originalName = result.originalFile.name
      const nameWithoutExt = originalName.substring(0, originalName.lastIndexOf("."))
      const newFilename = `${nameWithoutExt}_converted.${conversionSettings.format}`
      converterInstance.downloadFile(result.convertedBlob, newFilename)
    }
  }
  const handleClearResults = () => {
    setConversionResults([])
    setUploadedFiles([])
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />

      <main className="flex-1">
        
        {/* Converter Section: প্যাডিং কমানো হয়েছে এবং আরও কম্প্যাক্ট করা হয়েছে */}
        <section 
            id="converter" 
            className="
                py-10 px-4 
                min-h-[calc(100vh-120px)] 
                flex items-center justify-center
            "
        >
          <div className="container mx-auto max-w-6xl space-y-8"> {/* space-y-12 থেকে 8 করা হলো */}
            
                {/* হেডলাইন: ব্র্যান্ডিং সহ */}
            <div className="text-center space-y-1"> {/* space-y-2 থেকে 1 করা হলো */}
              <h2 className="text-3xl font-extrabold text-blue-400">OSPixel Converter</h2> {/* ফন্ট সাইজ সামান্য কমানো হয়েছে */}
              <p className="text-md text-gray-400 font-manrope max-w-2xl mx-auto">
                    OSPranto Tech: Technology with a Sense of Ease
              </p>
            </div>

            {/* Upload Section: ছোট এবং প্রিমিয়াম ডিজাইন */}
            {uploadedFiles.length === 0 ? (
                // --- আপলোড বক্সের নতুন, ছোট এবং প্রিমিয়াম স্টাইল ---
                <div className="flex justify-center pt-4"> {/* অতিরিক্ত স্পেস কমানো হয়েছে */}
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
                // --- যদি ফাইল আপলোড হয়ে যায়, তবে সেটিংস এবং প্রিভিউ সেকশন দেখাবে ---
                <div className="grid gap-6 lg:grid-cols-3 pt-4"> {/* gap এবং pt কমানো হয়েছে */}
                    <div className="lg:col-span-2 space-y-6">
                        <FormatSelector onSettingsChange={setConversionSettings} />
                        
                        {/* Selected Files Card */}
                        <Card className="p-6 bg-gray-800 border border-gray-700">
                            <h3 className="text-lg font-semibold text-white mb-4">
                                Selected Files ({uploadedFiles.length})
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {uploadedFiles.slice(0, 8).map((file) => (
                                    <div key={file.id} className="relative group">
                                        <div className="aspect-square bg-gray-700 border border-gray-600 overflow-hidden rounded-md">
                                            <img
                                                src={file.preview || "/placeholder.svg"}
                                                alt={file.file.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        {/*... বাকি প্রিভিউ Overlay ...*/}
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

                    {/* Convert Button & Settings Summary */}
                    <div className="space-y-6">
                        <Card className="p-6 bg-blue-950/40 border-blue-700/50">
                            <div className="space-y-6">
                                <div className="text-center">
                                    <div className="w-14 h-14 bg-blue-600/10 text-blue-400 mx-auto mb-3 flex items-center justify-center rounded-full">
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-2">Ready to Convert</h3>
                                </div>

                                <div className="space-y-3 text-sm text-gray-300">
                                    <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                        <span>Files selected:</span>
                                        <span className="font-medium text-white">{uploadedFiles.length}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                        <span>Output format:</span>
                                        <span className="font-medium text-white uppercase">{conversionSettings.format}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                        <span>Quality:</span>
                                        <span className="font-medium text-white">{conversionSettings.quality}%</span>
                                    </div>
                                    {conversionSettings.resize && (
                                        <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                            <span>Resize:</span>
                                            <span className="font-medium text-white">
                                                {conversionSettings.width}×{conversionSettings.height}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <Button onClick={handleConvert} disabled={isConverting} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold" size="lg">
                                    {isConverting ? (
                                        <>
                                            <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2"></div>
                                            Converting...
                                        </>
                                    ) : (
                                        <>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
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
              <div className="bg-gray-800 p-6 border border-gray-700 rounded-lg mt-6"> {/* p-8 থেকে p-6 এবং mt-6 করা হলো */}
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
        
        {/* "Connect with OSPranto Tech" section সম্পূর্ণরূপে রিমুভ করা হলো */}

      </main>

      <Footer />
    </div>
  )
}
