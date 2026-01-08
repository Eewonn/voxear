import { NavigationMenuHeader } from "@/components/header/header"
import { GridBackground } from "@/components/ui/grid-bg"
import { Upload, BarChart3, Loader2 } from "lucide-react"
import React from "react"

export default function ResultsPage() {
	return (
		<div>
			<NavigationMenuHeader />
			<div className="relative flex min-h-screen flex-col bg-white text-foreground overflow-x-hidden">
				<GridBackground />

				<main className="relative z-10 flex flex-1 flex-col items-center pt-16 md:pt-24 text-center gap-6 px-4 w-full">
					<div className="w-full max-w-6xl">
						{/* Steps */}
						<div className="w-full max-w-md mx-auto mb-8">
							<div className="flex items-center justify-center relative">

								{/* Connector Line */}
								<div className="absolute top-1/2 left-0 w-full h-[1px] -z-10 bg-transparent flex justify-center">
									<div className="w-2/3 h-[2px] bg-zinc-200"></div>
								</div>

								{/* Steps */}
								<div className="flex justify-between w-full px-8">
									{/* Step 1: Upload */}
									<div className="flex flex-col items-center gap-2 bg-white px-2">
										<div className="flex h-12 w-12 items-center justify-center rounded-full bg-white border-2 border-zinc-200 text-zinc-400">
											<Upload className="h-5 w-5" />
										</div>
										<span className="text-sm font-medium text-zinc-500">Upload</span>
									</div>

									{/* Step 2: Analyze */}
									<div className="flex flex-col items-center gap-2 bg-white px-2">
										<div className="flex h-12 w-12 items-center justify-center rounded-full bg-white border-2 border-zinc-200 text-zinc-400">
											<Loader2 className="h-5 w-5" />
										</div>
										<span className="text-sm font-medium text-zinc-500">Analyze</span>
									</div>

									{/* Step 3: Results (Active) */}
									<div className="flex flex-col items-center gap-2 bg-white px-2">
										<div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg ring-4 ring-white">
											<BarChart3 className="h-5 w-5" />
										</div>
										<span className="text-sm font-medium text-zinc-900">Results</span>
									</div>
								</div>
							</div>
						</div>

						<h2 className="text-lg md:text-xl font-semibold text-zinc-800">Upload a video and let our advanced AI analyze it using physics-based verification and neural network detection algorithms.</h2>

						{/* Summary Cards */}
						<div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
							<div className="bg-white border border-zinc-200 rounded-lg p-4 shadow-sm">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div className="h-10 w-10 rounded-full bg-red-50 flex items-center justify-center text-red-600">⚠️</div>
										<div>
											<div className="text-sm font-semibold">Deepfake Probability</div>
											<div className="text-xs text-zinc-500">Neural-network ensemble</div>
										</div>
									</div>
									<div className="text-4xl font-extrabold text-red-600">100%</div>
								</div>
								<div className="mt-3 text-xs text-zinc-600">Deepfake Detected</div>
							</div>

							<div className="bg-white border border-zinc-200 rounded-lg p-4 shadow-sm">
								<div className="flex items-start gap-3">
									<div className="h-10 w-10 rounded-full bg-white border flex items-center justify-center">🛡️</div>
									<div className="text-left">
										<div className="text-sm font-semibold">Physics Verification</div>
										<div className="text-xs text-zinc-500">Physical consistency checks for lighting, shadows, and reflections.</div>
									</div>
								</div>
							</div>

							<div className="bg-white border border-zinc-200 rounded-lg p-4 shadow-sm">
								<div className="flex items-start justify-between">
									<div>
										<div className="text-sm font-semibold">Anomalies Detected</div>
										<div className="text-xs text-zinc-500 mt-1">Localized temporal and spatial inconsistencies</div>
									</div>
									<div className="flex items-center gap-1">
										<div className="h-2 w-6 rounded bg-zinc-300" />
										<div className="h-2 w-6 rounded bg-zinc-300" />
										<div className="h-2 w-6 rounded bg-zinc-300" />
									</div>
								</div>
							</div>
						</div>

						{/* Detected Anomalies List */}
						<div className="mt-6 bg-white border border-zinc-200 rounded-lg p-4 shadow-sm">
							<div className="text-sm font-semibold text-zinc-700 mb-3">Detected Anomalies</div>
							<div className="space-y-3">
								{Array.from({ length: 6 }).map((_, i) => (
									<div key={i} className="h-6 rounded-full bg-zinc-200 w-full max-w-4xl mx-auto" />
								))}
							</div>
						</div>

						{/* Explainable AI Analysis */}
						<div className="mt-6 bg-white border border-zinc-200 rounded-lg p-6 shadow-sm">
							<div className="text-sm font-semibold text-zinc-700 mb-2">Explainable AI Analysis</div>
							<div className="text-xs text-zinc-500">Feature importance, temporal attention maps and short textual explanations describing why the model flagged this video.</div>
							<div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="h-28 rounded bg-zinc-50 border border-zinc-100" />
								<div className="h-28 rounded bg-zinc-50 border border-zinc-100" />
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	)
}

