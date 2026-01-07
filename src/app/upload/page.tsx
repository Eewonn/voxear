import { NavigationMenuHeader } from "@/components/header/header"
import { GridBackground } from "@/components/ui/grid-bg"
import { Upload, BarChart3, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function UploadPage() {
    return (
        <div>
            <NavigationMenuHeader />
            <div className="relative flex min-h-screen flex-col bg-white text-foreground overflow-x-hidden">
                {/* Perspective Grid Background */}
                <GridBackground />

                {/* Content */}
                <main className="relative z-10 flex flex-1 flex-col items-center pt-16 md:pt-24 text-center gap-8 px-4 pb-20">

                    {/* Progress Stepper */}
                    <div className="w-full max-w-md mx-auto mb-8">
                        <div className="flex items-center justify-center relative">

                            {/* Connector Line */}
                            <div className="absolute top-1/2 left-0 w-full h-[1px] -z-10 bg-transparent flex justify-center">
                                <div className="w-2/3 h-[2px] bg-zinc-200"></div>
                            </div>

                            {/* Steps */}
                            <div className="flex justify-between w-full px-8">
                                {/* Step 1: Upload (Active) */}
                                <div className="flex flex-col items-center gap-2 bg-white px-2">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg ring-4 ring-white">
                                        <Upload className="h-5 w-5" />
                                    </div>
                                    <span className="text-sm font-medium text-zinc-900">Upload</span>
                                </div>

                                {/* Step 2: Analyze */}
                                <div className="flex flex-col items-center gap-2 bg-white px-2">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white border-2 border-zinc-200 text-zinc-400">
                                        <Loader2 className="h-5 w-5" />
                                    </div>
                                    <span className="text-sm font-medium text-zinc-500">Analyze</span>
                                </div>

                                {/* Step 3: Results */}
                                <div className="flex flex-col items-center gap-2 bg-white px-2">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white border-2 border-zinc-200 text-zinc-400">
                                        <BarChart3 className="h-5 w-5" />
                                    </div>
                                    <span className="text-sm font-medium text-zinc-500">Results</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-4 max-w-3xl mx-auto">
                        <h1 className="text-xl md:text-2xl font-bold text-zinc-900 leading-snug">
                            Upload a video and let our advanced AI analyze it using physics-based verification and neural network detection algorithms.
                        </h1>
                    </div>

                    {/* Upload Drop Zone */}
                    <div className="w-full max-w-4xl mt-8 animate-in fade-in zoom-in-95 duration-500">
                        <div className="group relative flex flex-col items-center justify-center w-full aspect-video md:aspect-[2/1] rounded-[2rem] border-2 border-dashed border-zinc-400 bg-white hover:bg-zinc-50 transition-all cursor-pointer">

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
                            />
                        </div>
                    </div>

                </main>
            </div>
        </div>
    )
}
