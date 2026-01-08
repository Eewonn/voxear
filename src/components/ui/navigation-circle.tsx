import React from "react"
import { Upload, BarChart3, Loader2, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavigationCircleProps {
    currentStep: 1 | 2 | 3
}

export function NavigationCircle({ currentStep }: NavigationCircleProps) {
    const steps = [
        {
            id: 1,
            label: "Upload",
            icon: Upload,
        },
        {
            id: 2,
            label: "Analyze",
            icon: Loader2,
        },
        {
            id: 3,
            label: "Results",
            icon: BarChart3,
        },
    ]

    return (
        <div className="w-full max-w-md mx-auto mb-8">
            <div className="flex items-center justify-center relative">
                {/* Connector Line */}
                <div className="absolute top-1/2 left-0 w-full h-[1px] -z-10 bg-transparent flex justify-center">
                    <div className="w-2/3 h-[2px] bg-zinc-200"></div>
                </div>

                {/* Steps */}
                <div className="flex justify-between w-full px-8">
                    {steps.map((step) => {
                        const isActive = currentStep === step.id
                        const isCompleted = currentStep > step.id
                        const Icon = step.icon

                        return (
                            <div key={step.id} className="flex flex-col items-center gap-2 bg-white px-2">
                                <div
                                    className={cn(
                                        "flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300",
                                        isActive
                                            ? "bg-blue-500 border-blue-500 text-white shadow-lg ring-4 ring-white"
                                            : isCompleted
                                            ? "bg-blue-500 border-blue-500 text-white"
                                            : "bg-white border-zinc-200 text-zinc-400"
                                    )}
                                >
                                    {isCompleted ? (
                                        <Check className="h-5 w-5" />
                                    ) : (
                                        <Icon className="h-5 w-5" />
                                    )}
                                </div>
                                <span
                                    className={cn(
                                        "text-sm font-medium transition-colors duration-300",
                                        isActive || isCompleted ? "text-zinc-900" : "text-zinc-500"
                                    )}
                                >
                                    {step.label}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}