import { NavigationMenuHeader } from "@/components/header/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Zap, Gauge, BarChart3, Code, Database, Cpu, Wrench } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="bg-white">
      <NavigationMenuHeader />
      <div className="relative flex min-h-screen flex-col text-foreground overflow-x-hidden">
        {/* Content */}
        <main className="relative z-10 flex flex-1 flex-col items-center text-center px-4">
          {/* Hero Section */}
          <div className="relative h-[75vh] flex flex-col items-center justify-center space-y-12 w-full border-b-2 border-zinc-300">
            {/* Hero Background - Glass Effect */}
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>
            
            {/* Hero Content */}
            <div className="relative z-10 space-y-6 max-w-5xl">
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-600 bg-clip-text text-transparent select-none">
                Voxear
              </h1>
              <p className="text-base md:text-lg font-medium text-zinc-600 max-w-2xl mx-auto">
                AI-Powered Deepfake Detection
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full max-w-md px-4">
              <Link href="/upload" className="flex-1">
                <Button className="w-full" size="default">
                  Get Started
                </Button>
              </Link>
              <Button variant="outline" className="flex-1">
                Sign In
              </Button>
            </div>
          </div>

          {/* Project Overview Section */}
          <section className="pt-20 max-w-5xl w-full px-6">
            <div className="text-center mb-16">
              <span className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">About</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6 text-zinc-900">
                Project Overview
              </h2>
            </div>
            <div className="bg-white/60 backdrop-blur-sm border border-zinc-200/60 rounded-2xl p-8 md:p-12">
              <p className="text-lg md:text-xl text-zinc-600 leading-relaxed text-center max-w-3xl mx-auto">
                Voxear is an advanced deepfake detection platform that combines cutting-edge AI technology 
                with physics-based analysis to identify manipulated videos. In an era where deepfakes pose 
                significant threats to media authenticity, Voxear provides reliable, accurate detection to 
                help protect truth and trust in digital content.
              </p>
            </div>
          </section>

          {/* Key Features Section */}
          <section className="mt-32 max-w-6xl w-full px-6">
            <div className="text-center mb-16">
              <span className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">Features</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-3 text-zinc-900">
                Key Capabilities
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="group hover:shadow-2xl hover:shadow-zinc-900/5 transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-14 h-14 bg-zinc-900 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <Brain className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle>AI-Powered Detection</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Advanced EfficientNet + BiLSTM neural network architecture for temporal analysis 
                    and accurate deepfake detection across video sequences.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="group hover:shadow-2xl hover:shadow-zinc-900/5 transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-14 h-14 bg-zinc-900 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle>Physics-Based Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Multi-layered detection using facial landmark tracking, motion pattern analysis, 
                    and physics-based inconsistency detection.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="group hover:shadow-2xl hover:shadow-zinc-900/5 transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-14 h-14 bg-zinc-900 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <Gauge className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle>Real-Time Processing</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Fast video analysis with optimized preprocessing pipeline using MediaPipe 
                    for efficient facial detection and frame extraction.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="group hover:shadow-2xl hover:shadow-zinc-900/5 transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-14 h-14 bg-zinc-900 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <BarChart3 className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle>Confidence Scoring</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Comprehensive probability scores with confidence levels (high, medium, low) 
                    to help you understand the reliability of detection results.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="mt-32 max-w-5xl w-full px-6">
            <div className="text-center mb-16">
              <span className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">Process</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-3 text-zinc-900">
                How It Works
              </h2>
            </div>
            <div className="space-y-6">
              <div className="group flex items-start gap-6 bg-white/80 backdrop-blur-sm border border-zinc-200/60 rounded-2xl p-8 hover:shadow-2xl hover:shadow-zinc-900/5 transition-all duration-300">
                <div className="flex-shrink-0 w-16 h-16 bg-zinc-900 text-white rounded-2xl flex items-center justify-center font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  1
                </div>
                <div className="flex-1 text-left pt-2">
                  <h3 className="text-2xl font-bold mb-3 text-zinc-900">
                    Upload Your Video
                  </h3>
                  <p className="text-zinc-600 leading-relaxed text-lg">
                    Submit any video file through our secure upload interface. Supported formats 
                    include MP4, AVI, MOV, and more.
                  </p>
                </div>
              </div>
              <div className="group flex items-start gap-6 bg-white/80 backdrop-blur-sm border border-zinc-200/60 rounded-2xl p-8 hover:shadow-2xl hover:shadow-zinc-900/5 transition-all duration-300">
                <div className="flex-shrink-0 w-16 h-16 bg-zinc-900 text-white rounded-2xl flex items-center justify-center font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  2
                </div>
                <div className="flex-1 text-left pt-2">
                  <h3 className="text-2xl font-bold mb-3 text-zinc-900">
                    Frame Extraction & Preprocessing
                  </h3>
                  <p className="text-zinc-600 leading-relaxed text-lg">
                    The system extracts key frames from your video and uses MediaPipe to detect 
                    and align facial landmarks for consistent analysis.
                  </p>
                </div>
              </div>
              <div className="group flex items-start gap-6 bg-white/80 backdrop-blur-sm border border-zinc-200/60 rounded-2xl p-8 hover:shadow-2xl hover:shadow-zinc-900/5 transition-all duration-300">
                <div className="flex-shrink-0 w-16 h-16 bg-zinc-900 text-white rounded-2xl flex items-center justify-center font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  3
                </div>
                <div className="flex-1 text-left pt-2">
                  <h3 className="text-2xl font-bold mb-3 text-zinc-900">
                    AI & Physics Analysis
                  </h3>
                  <p className="text-zinc-600 leading-relaxed text-lg">
                    Our hybrid model combines deep learning (EfficientNet + BiLSTM) with 
                    physics-based checks to analyze temporal patterns and detect anomalies.
                  </p>
                </div>
              </div>
              <div className="group flex items-start gap-6 bg-white/80 backdrop-blur-sm border border-zinc-200/60 rounded-2xl p-8 hover:shadow-2xl hover:shadow-zinc-900/5 transition-all duration-300">
                <div className="flex-shrink-0 w-16 h-16 bg-zinc-900 text-white rounded-2xl flex items-center justify-center font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  4
                </div>
                <div className="flex-1 text-left pt-2">
                  <h3 className="text-2xl font-bold mb-3 text-zinc-900">
                    Get Results
                  </h3>
                  <p className="text-zinc-600 leading-relaxed text-lg">
                    Receive a detailed analysis with probability scores, confidence levels, 
                    and insights into which detection methods flagged potential manipulation.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Tech Stack Section */}
          <section className="mt-32 mb-40 max-w-6xl w-full px-6">
            <div className="text-center mb-16">
              <span className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">Technology</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-3 text-zinc-900">
                Tech Stack
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Frontend */}
              <Card className="hover:shadow-2xl hover:shadow-zinc-900/5 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center">
                      <Code className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle>Frontend</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-zinc-600">
                    <li className="flex items-center gap-3 hover:translate-x-1 transition-transform">
                      <span className="w-1.5 h-1.5 bg-zinc-900 rounded-full"></span>
                      <span><strong className="text-zinc-900">Next.js 16</strong> — React framework with App Router</span>
                    </li>
                    <li className="flex items-center gap-3 hover:translate-x-1 transition-transform">
                      <span className="w-1.5 h-1.5 bg-zinc-900 rounded-full"></span>
                      <span><strong className="text-zinc-900">TypeScript</strong> — Type-safe development</span>
                    </li>
                    <li className="flex items-center gap-3 hover:translate-x-1 transition-transform">
                      <span className="w-1.5 h-1.5 bg-zinc-900 rounded-full"></span>
                      <span><strong className="text-zinc-900">Tailwind CSS</strong> — Utility-first styling</span>
                    </li>
                    <li className="flex items-center gap-3 hover:translate-x-1 transition-transform">
                      <span className="w-1.5 h-1.5 bg-zinc-900 rounded-full"></span>
                      <span><strong className="text-zinc-900">Radix UI</strong> — Accessible component primitives</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Backend */}
              <Card className="hover:shadow-2xl hover:shadow-zinc-900/5 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center">
                      <Database className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle>Backend</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-zinc-600">
                    <li className="flex items-center gap-3 hover:translate-x-1 transition-transform">
                      <span className="w-1.5 h-1.5 bg-zinc-900 rounded-full"></span>
                      <span><strong className="text-zinc-900">FastAPI</strong> — High-performance Python API</span>
                    </li>
                    <li className="flex items-center gap-3 hover:translate-x-1 transition-transform">
                      <span className="w-1.5 h-1.5 bg-zinc-900 rounded-full"></span>
                      <span><strong className="text-zinc-900">PyTorch</strong> — Deep learning framework</span>
                    </li>
                    <li className="flex items-center gap-3 hover:translate-x-1 transition-transform">
                      <span className="w-1.5 h-1.5 bg-zinc-900 rounded-full"></span>
                      <span><strong className="text-zinc-900">MediaPipe</strong> — Facial landmark detection</span>
                    </li>
                    <li className="flex items-center gap-3 hover:translate-x-1 transition-transform">
                      <span className="w-1.5 h-1.5 bg-zinc-900 rounded-full"></span>
                      <span><strong className="text-zinc-900">OpenCV</strong> — Computer vision processing</span>
                    </li>
                    <li className="flex items-center gap-3 hover:translate-x-1 transition-transform">
                      <span className="w-1.5 h-1.5 bg-zinc-900 rounded-full"></span>
                      <span><strong className="text-zinc-900">FFmpeg</strong> — Video frame extraction</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* AI/ML */}
              <Card className="hover:shadow-2xl hover:shadow-zinc-900/5 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center">
                      <Cpu className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle>AI/ML</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-zinc-600">
                    <li className="flex items-center gap-3 hover:translate-x-1 transition-transform">
                      <span className="w-1.5 h-1.5 bg-zinc-900 rounded-full"></span>
                      <span><strong className="text-zinc-900">EfficientNet</strong> — Feature extraction</span>
                    </li>
                    <li className="flex items-center gap-3 hover:translate-x-1 transition-transform">
                      <span className="w-1.5 h-1.5 bg-zinc-900 rounded-full"></span>
                      <span><strong className="text-zinc-900">BiLSTM</strong> — Temporal sequence analysis</span>
                    </li>
                    <li className="flex items-center gap-3 hover:translate-x-1 transition-transform">
                      <span className="w-1.5 h-1.5 bg-zinc-900 rounded-full"></span>
                      <span><strong className="text-zinc-900">scikit-learn</strong> — Model evaluation</span>
                    </li>
                    <li className="flex items-center gap-3 hover:translate-x-1 transition-transform">
                      <span className="w-1.5 h-1.5 bg-zinc-900 rounded-full"></span>
                      <span><strong className="text-zinc-900">NumPy & SciPy</strong> — Numerical computing</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Tools */}
              <Card className="hover:shadow-2xl hover:shadow-zinc-900/5 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center">
                      <Wrench className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle>Tools</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-zinc-600">
                    <li className="flex items-center gap-3 hover:translate-x-1 transition-transform">
                      <span className="w-1.5 h-1.5 bg-zinc-900 rounded-full"></span>
                      <span><strong className="text-zinc-900">Uvicorn</strong> — ASGI server</span>
                    </li>
                    <li className="flex items-center gap-3 hover:translate-x-1 transition-transform">
                      <span className="w-1.5 h-1.5 bg-zinc-900 rounded-full"></span>
                      <span><strong className="text-zinc-900">ESLint</strong> — Code linting</span>
                    </li>
                    <li className="flex items-center gap-3 hover:translate-x-1 transition-transform">
                      <span className="w-1.5 h-1.5 bg-zinc-900 rounded-full"></span>
                      <span><strong className="text-zinc-900">PostCSS</strong> — CSS processing</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>

      </div>
    </div>
  );
}
