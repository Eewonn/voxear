import { FileVideo, Loader2 } from "lucide-react"


interface VideoReadyProps {
    file: File
    onAnalyze: () => void
    onReset: () => void
    isAnalyzing: boolean
}

export function VideoReady({ file, onAnalyze, onReset, isAnalyzing }: VideoReadyProps) {
    // Helper to format file size
    const formatSize = (bytes: number) => {
        if (bytes === 0) return "0 B"
        const k = 1024
        const sizes = ["B", "KB", "MB", "GB", "TB"]
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
    }

    return (
        <div className="w-full max-w-4xl mt-8 animate-in fade-in zoom-in-95 duration-500 flex flex-col items-center gap-8">

            {/* File Card */}
            <div className="w-full bg-white rounded-xl border border-zinc-200 p-4 flex items-center gap-4 shadow-sm">
                <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-zinc-100 ring-1 ring-zinc-200">
                    <FileVideo className="h-6 w-6 text-zinc-700" />
                </div>

                <div className="flex flex-col items-start min-w-0 flex-1">
                    <p className="text-base font-semibold text-zinc-900 truncate w-full text-left">
                        {file.name}
                    </p>
                    <p className="text-sm text-zinc-500">
                        {formatSize(file.size)}
                    </p>
                </div>
            </div>

            {/* Analyze Button */}
            <button
                onClick={onAnalyze}
                disabled={isAnalyzing}
                className="px-8 py-3 bg-[#769BC1] hover:bg-[#6082a6] disabled:bg-[#769BC1]/70 disabled:cursor-not-allowed text-white text-lg font-medium rounded-lg shadow-lg shadow-blue-900/5 transition-all w-full md:w-auto min-w-[200px] flex items-center justify-center gap-2"
            >
                {isAnalyzing ? (
                    <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Analyzing...
                    </>
                ) : (
                    "Analyze Video"
                )}
            </button>

            <button
                onClick={onReset}
                disabled={isAnalyzing}
                className="text-sm text-zinc-400 hover:text-zinc-600 underline decoration-zinc-300 underline-offset-4 transition-colors disabled:opacity-50"
            >
                Choose a different file
            </button>
        </div>
    )
}
