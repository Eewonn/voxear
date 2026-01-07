import { NavigationMenuHeader} from "@/components/header/header"
import { GridBackground } from "@/components/ui/grid-bg"

export default function Home() {
  return (
    <div>
    <NavigationMenuHeader/>
    <div className="relative flex min-h-screen flex-col bg-white text-foreground overflow-x-hidden">
        {/* Perspective Grid Background */}
        <GridBackground />

        {/* Content */}
        <main className="relative z-10 flex flex-1 flex-col items-center pt-24 md:pt-32 text-center gap-6 px-4">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-black tracking-tight drop-shadow-sm select-none">
              Voxear
            </h1>
            <p className="text-lg md:text-xl font-medium text-zinc-800">
              A Physics-Based Deepfake detector
            </p>
          </div>

          <div className="flex flex-col gap-4 mt-8 w-full max-w-sm">
            <button className="h-12 w-full bg-white text-black font-bold uppercase tracking-wide border border-zinc-200 rounded-md shadow-sm hover:shadow-md transition-all active:scale-[0.98]">
              Get Started
            </button>
            <button className="h-12 w-full bg-white text-black font-bold uppercase tracking-wide border border-zinc-200 rounded-md shadow-sm hover:shadow-md transition-all active:scale-[0.98]">
              Sign In
            </button>
          </div>
        </main>

        {/* Scrollable Description Section (Placeholder) */}
        <div className="relative z-10 w-full min-h-[400px] bg-zinc-200 flex items-center justify-center mt-20">
            <h2 className="text-3xl font-bold opacity-80">Scrollable Desc abt the page</h2>
        </div>
    </div>
    </div>
  );
}
