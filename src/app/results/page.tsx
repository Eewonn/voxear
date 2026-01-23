"use client"

import { useEffect, useState } from "react"
import { NavigationMenuHeader } from "@/components/header/header"
import { GridBackground } from "@/components/ui/grid-bg"
import { NavigationCircle } from "@/components/ui/navigation-circle"
import { useRouter } from "next/navigation"

interface AnalysisResultData {
    label: "real" | "fake";
    probability: number;
    confidence: "high" | "medium" | "low";
}

export default function ResultsPage() {
    const router = useRouter()
    const [data, setData] = useState<AnalysisResultData | null>(null)

    useEffect(() => {
        const stored = sessionStorage.getItem("analysisResult")
        if (stored) {
            setData(JSON.parse(stored))
        } else {
            // Redirect back if no data found
            router.push("/upload")
        }
    }, [router])

    if (!data) return null

    const isFake = data.label === "fake"
    const percentage = Math.round(data.probability * 100)
    
    // Determine color based on label
    const statusColor = isFake ? "text-red-600" : "text-green-600"
    const statusBg = isFake ? "bg-red-50" : "bg-green-50"
    const statusIcon = isFake ? "⚠️" : "✅"

	return (
		<div>
			<NavigationMenuHeader />
			<div className="relative flex min-h-screen flex-col bg-white text-foreground overflow-x-hidden">
				<GridBackground />

				<main className="relative z-10 flex flex-1 flex-col items-center pt-16 md:pt-24 text-center gap-6 px-4 w-full">
					<div className="w-full max-w-6xl">
						{/* Steps */}
						<NavigationCircle currentStep={3} />

						<h2 className="text-lg md:text-xl font-semibold text-zinc-800">
                            Analysis Complete: The video has been processed.
                        </h2>

						{/* Summary Cards */}
						<div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
							<div className="bg-white border border-zinc-200 rounded-lg p-4 shadow-sm">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div className={`h-10 w-10 rounded-full ${statusBg} flex items-center justify-center`}>{statusIcon}</div>
										<div>
											<div className="text-sm font-semibold text-left">Deepfake Probability</div>
											<div className="text-xs text-zinc-500 text-left">Neural-network ensemble</div>
										</div>
									</div>
									<div className={`text-4xl font-extrabold ${statusColor}`}>{percentage}%</div>
								</div>
								<div className="mt-3 text-xs text-zinc-600 font-bold uppercase tracking-wider">
                                    {isFake ? "Deepfake Detected" : "Likely Real Video"}
                                </div>
							</div>

							<div className="bg-white border border-zinc-200 rounded-lg p-4 shadow-sm">
								<div className="flex items-start gap-3">
									<div className="h-10 w-10 rounded-full bg-white border flex items-center justify-center">🛡️</div>
									<div className="text-left">
										<div className="text-sm font-semibold">Confidence Level</div>
										<div className="text-xs text-zinc-500">Model certainty based on artifacts.</div>
                                        <div className="mt-2 font-bold uppercase text-[#5D89BA]">
                                            {data.confidence}
                                        </div>
									</div>
								</div>
							</div>

							<div className="bg-white border border-zinc-200 rounded-lg p-4 shadow-sm">
								<div className="flex items-start justify-between">
									<div>
										<div className="text-sm font-semibold text-left">Analysis Status</div>
										<div className="text-xs text-zinc-500 mt-1 text-left">Processing pipeline</div>
                                        <div className="mt-2 text-xs font-mono text-zinc-400 text-left">
                                            Processed via EfficientNet+BiLSTM
                                        </div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	)
}
