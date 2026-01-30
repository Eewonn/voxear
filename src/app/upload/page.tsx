"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { NavigationMenuHeader } from "@/components/header/header"
import { Upload, BarChart3, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { VideoReady } from "./video-ready"
import { NavigationCircle } from "@/components/ui/navigation-circle"
import { useVideo } from "@/context/video-context"

export default function UploadPage() {
    const router = useRouter()
    const { setVideoFile } = useVideo()
    const [file, setFile] = useState<File | null>(null)

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }

    const handleAnalyze = async () => {
        if (!file) return
        setVideoFile(file)
        router.push("/analyze")
    }

    const handleReset = () => {
        setFile(null)
    }

    return (
        <div>
            <NavigationMenuHeader />
            <div className="relative flex min-h-screen flex-col bg-white text-foreground overflow-x-hidden">
                {/* Content */}
                <main className="relative z-10 flex flex-1 flex-col items-center pt-16 md:pt-24 text-center gap-8 px-4 pb-20">

                    {/* Progress Stepper */}
                    {/* Progress Stepper */}
                    <NavigationCircle currentStep={1} />


                    {/* Title & Description */}
                    <div className="space-y-4 max-w-3xl mx-auto">
                        <h1 className="text-xl md:text-2xl font-bold text-zinc-900 leading-snug">
                            Upload a video and let our advanced AI analyze it using physics-based verification and neural network detection algorithms.
                        </h1>
                    </div>

                    {/* Upload Drop Zone or Video Ready State */}
                    {!file ? (
                        <div className="w-full max-w-4xl mt-8 animate-in fade-in zoom-in-95 duration-500">
                            <div className="group relative z-30 flex flex-col items-center justify-center w-full aspect-video md:aspect-[2/1] rounded-[2rem] border-2 border-dashed border-zinc-400 bg-white hover:bg-zinc-50 transition-all cursor-pointer shadow-sm isolate" style={{ backgroundColor: '#ffffff', isolation: 'isolate' }}>

                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 mb-6 group-hover:scale-110 transition-transform">
                                    <Upload className="h-8 w-8" />
                                </div>

                                <div className="space-y-1">
                                    <p className="text-xl font-bold text-zinc-900">
                                        Drag & drop your video here
                                    </p>
                                    <p className="text-sm text-zinc-400">
                                        or click to browse from your device
                                    </p>
                                </div>

                                <input
                                    type="file"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    accept="video/*"
                                    onChange={handleFileSelect}
                                />
                            </div>
                        </div>
                    ) : (
                        <VideoReady
                            file={file}
                            onAnalyze={handleAnalyze}
                            onReset={handleReset}
                            isAnalyzing={false}
                        />
                    )}

                </main>
            </div>
        </div>
    )
}
