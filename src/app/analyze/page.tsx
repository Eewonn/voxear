"use client";

import { NavigationMenuHeader } from "@/components/header/header";
import { Upload, Loader2, BarChart3, Check } from "lucide-react";

export default function AnalyzePage() {
  const steps = [
    { title: "Physics-based verification", status: "completed" },
    { title: "Running AI analysis", status: "completed" },
    { title: "Detecting motion patterns", status: "completed" },
    { title: "Extracting Video Frames", status: "current" },
  ];

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Background Grid Layer */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />

      {/* Your Existing Header */}
      <NavigationMenuHeader />

      {/* Main Content Area */}
      <main className="relative z-10 flex flex-col items-center px-4 pt-16 pb-12">
        
        {/* Top Progress Tracker */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="flex flex-col items-center gap-2 text-zinc-400">
            <div className="w-14 h-14 rounded-full bg-white border border-zinc-200 flex items-center justify-center shadow-sm">
              <Upload size={20} />
            </div>
            <span className="text-sm font-semibold">Upload</span>
          </div>
          <div className="w-12 h-[2px] bg-zinc-200 -mt-6" />
          <div className="flex flex-col items-center gap-2 text-[#5D89BA]">
            <div className="w-14 h-14 rounded-full bg-[#5D89BA] flex items-center justify-center shadow-lg text-white">
              <Loader2 size={24} className="animate-spin" />
            </div>
            <span className="text-sm font-bold">Analyze</span>
          </div>
          <div className="w-12 h-[2px] bg-zinc-200 -mt-6" />
          <div className="flex flex-col items-center gap-2 text-zinc-400">
            <div className="w-14 h-14 rounded-full bg-white border border-zinc-200 flex items-center justify-center shadow-sm">
              <BarChart3 size={20} />
            </div>
            <span className="text-sm font-semibold">Results</span>
          </div>
        </div>

        <h1 className="text-xl md:text-2xl font-bold text-center max-w-2xl mb-12 leading-snug">
          Upload a video and let our advanced AI analyze it using physics-based 
          verification and neural network detection algorithms.
        </h1>

        {/* Progress Card */}
        <div className="w-full max-w-2xl bg-white border border-zinc-200 rounded-[2.5rem] p-10 shadow-2xl shadow-zinc-200/50">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-[#5D89BA] rounded-full flex items-center justify-center text-white mb-4 shadow-lg shadow-blue-500/20">
              <Loader2 size={32} className="animate-spin" />
            </div>
            <h2 className="text-2xl font-extrabold text-zinc-900">Analyzing Video</h2>
            <p className="text-sm text-zinc-500 font-medium">Using Physics-based verification and AI detection algorithms</p>
          </div>

          <div className="mb-10 px-4">
            <div className="flex justify-between items-center mb-2 font-bold text-xs uppercase tracking-wider text-zinc-500">
              <span>Progress</span>
              <span className="text-[#5D89BA]">75%</span>
            </div>
            <div className="h-2.5 w-full bg-zinc-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#5D89BA] w-3/4 rounded-full transition-all duration-1000" />
            </div>
          </div>

          <div className="space-y-6 px-4">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1
                  ${step.status === 'completed' ? 'bg-[#5D89BA] text-white' : 'bg-blue-50 text-[#5D89BA]'}`}>
                  {step.status === 'completed' ? <Check size={16} strokeWidth={3} /> : <div className="w-2.5 h-2.5 bg-[#5D89BA] rounded-full opacity-60" />}
                </div>
                <div>
                  <h3 className={`font-bold text-sm ${step.status === 'completed' ? 'text-zinc-900' : 'text-zinc-400'}`}>{step.title}</h3>
                  <p className="text-[11px] text-zinc-400 leading-relaxed mt-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu tellus fringilla, dapibus est ut, vul.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}