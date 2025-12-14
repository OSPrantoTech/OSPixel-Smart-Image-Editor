// =======================================================
// File: page.tsx - ULTRA-MINIMALIST UI (Final Attempt to Minimize Space)
// Focus: Compact central card, tight layout.
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
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white">
      <Header />

      <main className="flex-1">
        
        {/* Converter Section: py-16 থেকে py-8 করা হলো এবং min-h কমানো হলো */}
        <section 
            id="converter" 
            className="
                py-8 px-4 
                min-h-[calc(100vh-120px)] 
                flex items-start justify-center /* items-center থেকে items-start করা হলো যেন কন্টেন্ট উপরের দিকে থাকে */
            "
        >
          <div className="container mx-auto max-w-xl space-y-4 pt-8"> {/* max-w-4xl থেকে xl করা হলো, space-y-8 থেকে 4, এবং pt-8 যেন হেডার থেকে সামান্য গ্যাপ থাকে */}
            
                {/* হেডলাইন: ফন্ট সাইজ এবং স্পেস কমানো হলো */}
            <div className="text-center space-y-0">
              <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 leading-none"> {/* text-5xl থেকে 3xl, leading-tight থেকে none */}
                    OSPixel Converter
                </h2>
              <p className="text-sm text-gray-500 font-manrope"> {/* text-lg থেকে sm করা হলো */}
                    Advanced Image Conversion
              </p>
            </div>

            {/* Main Converter Card - সবচেয়ে ছোট, ফোকাসড কার্ড */}
            <Card className="bg-[#1C1C1C] border border-gray-800 p-6 shadow-xl rounded-lg space-y-4"> {/* p-8 থেকে 6, space-y-8 থেকে 4 */}
                {uploadedFiles.length === 0 ? (
                    // --- স্টেপ 1: ফাইল আপলোড (শুধুমাত্র আপলোড বক্স) ---
                    <div className="space-y-4">
                        <h3 className="text-base font-semibold text-white border-b border-gray-700 pb-2"> {/* text-xl থেকে base, pb-3 থেকে 2 */}
                            Upload Images
                        </h3>
                        <FileUpload onFilesUploaded={setUploadedFiles} maxFiles={20} />
                    </div>
                ) : (
                    // --- স্টেপ 2: সেটিংস, প্রিভিউ ও কনভার্ট ---
                    <div className="grid lg:grid-cols-3 gap-4"> {/* gap-8 থেকে 4 */}
                        
                        {/* বাম দিকের কলাম: সেটিংস ও কনভার্ট বাটন */}
                        <div className="lg:col-span-1 space-y-4"> {/* space-y-6 থেকে 4 */}
                            <h3 className="text-base font-semibold text-white border-b border-gray-700 pb-2">
                                Settings
                            </h3>
                            <FormatSelector onSettingsChange={setConversionSettings} />

                            {/* Convert Button Block */}
                            <div className="p-2 bg-blue-950/30 border border-blue-700/50 rounded-md"> {/* p-4 থেকে 2 */}
                                <h4 className="text-sm font-bold text-white mb-2">Ready?</h4> {/* text-lg থেকে sm, mb-3 থেকে 2 */}
                                <Button onClick={handleConvert} disabled={isConverting} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold" size="sm"> {/* size-lg থেকে sm */}
                                    {isConverting ? (
                                        <>
                                            <div className="animate-spin h-3 w-3 border-2 border-current border-t-transparent rounded-full mr-1"></div> {/* সাইজ কমানো হলো */}
                                            Converting...
                                        </>
                                    ) : (
                                        <>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mr-1"> {/* সাইজ কমানো হলো */}
                                                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                                            </svg>
                                            Convert ({uploadedFiles.length})
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>

                        {/* ডান দিকের কলাম: ফাইল প্রিভিউ */}
                        <div className="lg:col-span-2 space-y-4">
                            <h3 className="text-base font-semibold text-white border-b border-gray-700 pb-2">
                                Preview
                            </h3>
                            <div className="grid grid-cols-4 gap-2 p-2 bg-[#0A0A0A] rounded-md border border-gray-800 h-[150px] overflow-y-auto"> {/* height কমানো হলো, padding 2, gap 2 */}
                                {uploadedFiles.map((file) => (
                                    <div key={file.id} className="relative aspect-square group">
                                        <img
                                            src={file.preview || "/placeholder.svg"}
                                            alt={file.file.name}
                                            className="w-full h-full object-cover rounded-sm border border-gray-700"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </Card>

            {/* Results Section */}
            {conversionResults.length > 0 && (
              <div className="bg-[#1C1C1C] p-4 border border-blue-700/50 rounded-lg mt-4"> {/* p-6 থেকে 4 */}
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
