"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { NavigationMenuHeader } from "@/components/header/header";
import { NavigationCircle } from "@/components/ui/navigation-circle";
import { Loader2, Check, XCircle } from "lucide-react";
import { GridBackground } from "@/components/ui/grid-bg";
import { useVideo } from "@/context/video-context";
import { analyzeVideo } from "@/lib/api";

const STEPS = [
  { id: 1, title: "Extracting Video Frames" },
  { id: 2, title: "Physics-based verification" },
  { id: 3, title: "Running AI analysis" },
  { id: 4, title: "Detecting motion patterns" },
];

export default function AnalyzePage() {
  const router = useRouter();
  const { videoFile } = useVideo();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [finalStepStatuses, setFinalStepStatuses] = useState<{id: number, status: string}[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Redirect if no file (e.g. refresh)
    if (!videoFile) {
      router.push("/upload");
      return;
    }

    const runAnalysis = async () => {
      try {
        // Start api call
        const apiPromise = analyzeVideo(videoFile);

        // Simulate progress steps while waiting (at least 2s per step to look nice)
        for (let i = 1; i <= STEPS.length; i++) {
            setCurrentStep(i);
            // Wait a bit to simulate processing time for each step
            await new Promise((resolve) => setTimeout(resolve, 800)); 
            setCompletedSteps((prev) => [...prev, i]);
        }

        const result = await apiPromise;

        if (result.status === "completed") {
            // Update UI with final statuses (to show skips) before redirecting
            if (result.result?.steps) {
                 setFinalStepStatuses(result.result.steps);
                 // Allow user to see the final state briefly
                 await new Promise((resolve) => setTimeout(resolve, 1500));
            }
            
            sessionStorage.setItem("analysisResult", JSON.stringify(result.result));
            router.push("/results");
        } else {
            setError(result.error || "Unknown error occurred");
        }

      } catch (err) {
        setError("An unexpected error occurred.");
        console.error(err);
      }
    };

    runAnalysis();
  }, [videoFile, router]);

  const progress = Math.round((completedSteps.length / STEPS.length) * 100);
  const currentStepTitle = STEPS.find(s => s.id === currentStep)?.title || "Processing";

  if (error) {
      return (
          <div className="flex h-screen w-full items-center justify-center flex-col gap-4">
              <h1 className="text-xl font-bold text-red-500">Analysis Failed</h1>
              <p>{error}</p>
              <button 
                onClick={() => router.push('/upload')}
                className="px-4 py-2 bg-black text-white rounded"
              >
                  Try Again
              </button>
          </div>
      )
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <GridBackground />
      <NavigationMenuHeader />

      <div className="relative z-20 mt-6 md:mt-10">
        <NavigationCircle currentStep={2} />
      </div>

      <main className="relative z-10 flex flex-col items-center px-4 pt-16 pb-12">
        <h1 className="text-xl md:text-2xl font-bold text-center max-w-2xl mb-12 leading-snug">
          Upload a video and let our advanced AI analyze it using physics-based 
          verification and neural network detection algorithms.
        </h1>

        <div className="w-full max-w-2xl bg-white border border-zinc-200 rounded-[2.5rem] p-10 shadow-2xl shadow-zinc-200/50">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-[#5D89BA] rounded-full flex items-center justify-center text-white mb-4 shadow-lg shadow-blue-500/20">
              <Loader2 size={32} className="animate-spin" />
            </div>
            <h2 className="text-2xl font-extrabold text-zinc-900">Analyzing Video</h2>
            <p className="text-sm text-zinc-500 font-medium">
              Current step: {currentStepTitle}
            </p>
          </div>

          <div className="mb-10 px-4">
            <div className="flex justify-between items-center mb-2 font-bold text-xs uppercase tracking-wider text-zinc-500">
              <span>Step {currentStep} of {STEPS.length}</span>
              <span className="text-[#5D89BA]">{progress}%</span>
            </div>
            <div className="h-2.5 w-full bg-zinc-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#5D89BA] rounded-full transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="space-y-6 px-4">
            {STEPS.map((step) => {
              const isCompleted = completedSteps.includes(step.id);
              const isCurrent = step.id === currentStep;
              // Check if we have final status from API for this step
              const finalStatus = finalStepStatuses.find(s => s.id === step.id)?.status;
              const isSkipped = finalStatus === 'skipped';
              
              return (
                <div key={step.id} className="flex gap-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1
                    ${isSkipped ? "bg-zinc-100 text-zinc-400" : 
                      isCompleted ? "bg-[#5D89BA] text-white" : "bg-blue-50 text-[#5D89BA]"}`}
                  >
                    {isSkipped ? (
                         <XCircle size={16} strokeWidth={3} />
                    ) : isCompleted ? (
                      <Check size={16} strokeWidth={3} />
                    ) : (
                      <div className={`w-2.5 h-2.5 bg-[#5D89BA] rounded-full ${isCurrent ? 'opacity-100 animate-pulse' : 'opacity-60'}`} />
                    )}
                  </div>
                  <div>
                    <h3
                      className={`font-bold text-sm ${
                        isSkipped ? "text-zinc-400 line-through" :
                        isCompleted || isCurrent ? "text-zinc-900" : "text-zinc-400"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-[11px] text-zinc-400 leading-relaxed mt-1">
                      {isSkipped ? "Module not used" : "Processing video data..."}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}