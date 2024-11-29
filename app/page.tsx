import Image from "next/image";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { DotPattern } from "@/components/magicui/dot-pattern";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative flex flex-col items-center justify-center min-h-[80vh] text-center overflow-hidden">
          <div className="relative z-10 space-y-4 max-w-3xl">
            <div className="inline-block">
              <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 mb-4">
                ✨ AI-Powered Learning Platform
              </span>
            </div>
            <h1 className="text-5xl sm:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 mb-6 leading-tight">
              Learn Smarter,{" "}
              <span className="block">Not Harder</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              Transform your learning experience with personalized AI quizzes, 
              dynamic podcasts, and an intelligent voice assistant that adapts to you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <RainbowButton>
                View Dashboard
              </RainbowButton>
              <button className="inline-flex items-center px-6 py-3 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Watch Demo
              </button>
            </div>
          </div>
          <DotPattern className="[mask-image:radial-gradient(900px_circle_at_center,white,transparent)]" />
        </div>

        {/* Product Demo Section */}
        <div className="relative py-16 -mt-20">
          <div className="relative mx-auto max-w-5xl">
            <div className="rounded-2xl border border-gray-100 bg-white/80 shadow-2xl shadow-gray-200/50 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/80 dark:shadow-gray-900/50">
              {/* Interface Header */}
              <div className="flex items-center justify-between border-b border-gray-100 p-4 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
              </div>

              {/* Interface Content */}
              <div className="grid grid-cols-12 divide-x divide-gray-100 dark:divide-gray-800">
                {/* Sidebar */}
                <div className="col-span-3 p-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      <span className="text-sm font-medium">Home</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-md px-2 py-1.5">
                      <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                      <span className="text-sm font-medium">Podcast</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <span className="text-sm font-medium">Quiz</span>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-4">Materials</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <span>Resume_1.pdf</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <span>O.S TEXTBOOK.pdf</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="col-span-9 p-6">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 mb-8">
                      <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-md">
                        Upload New
                      </button>
                      <button className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 rounded-md">
                        Select Material
                      </button>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-8">
                      <div className="text-center space-y-4">
                        <h2 className="text-2xl font-semibold">Convert PDF to Podcast</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                          Upload your PDF and we'll convert it into an engaging podcast conversation.
                        </p>
                        <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-8 mt-4">
                          <div className="flex flex-col items-center justify-center">
                            <svg className="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Drop your PDF here or click to upload</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Supported formats: PDF (up to 50MB)</p>
                          </div>
                        </div>
                        <button className="mt-4 w-full bg-gray-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors">
                          Upload & Convert
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -left-4 -top-4 -z-10 h-72 w-72 rounded-full bg-purple-100 blur-3xl dark:bg-purple-900/30"></div>
            <div className="absolute -bottom-4 -right-4 -z-10 h-72 w-72 rounded-full bg-blue-100 blur-3xl dark:bg-blue-900/30"></div>
          </div>
        </div>

        {/* Bento Grid Features */}
        <div className="py-24">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {/* Main Feature - spans 4 columns */}
            <div className="relative md:col-span-4 group bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="relative z-10">
                <div className="h-14 w-14 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="h-7 w-7 text-purple-600 dark:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-4">AI-Powered Smart Quizzes</h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  Our adaptive learning system creates personalized quizzes that evolve with your progress. 
                  Identify knowledge gaps and master concepts faster than ever.
                </p>
              </div>
              <DotPattern className="[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]" />
            </div>

            {/* Voice Assistant - spans 2 columns */}
            <div className="relative md:col-span-2 group bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="relative z-10">
                <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="h-6 w-6 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">24/7 AI Tutor</h3>
                <p className="text-gray-600 dark:text-gray-300">Get instant answers and guidance whenever you need it.</p>
              </div>
              <DotPattern className="[mask-image:radial-gradient(250px_circle_at_center,white,transparent)]" />
            </div>

            {/* Podcast Feature - spans 3 columns */}
            <div className="relative md:col-span-3 group bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="relative z-10">
                <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="h-6 w-6 text-purple-600 dark:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">AI Podcasts</h3>
                <p className="text-gray-600 dark:text-gray-300">Convert any learning material into engaging audio content.</p>
              </div>
              <DotPattern className="[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]" />
            </div>

            {/* Progress Tracking - spans 3 columns */}
            <div className="relative md:col-span-3 group bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="relative z-10">
                <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="h-6 w-6 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Smart Progress Tracking</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Watch your knowledge grow with detailed analytics and personalized learning paths that adapt to your pace.
                </p>
              </div>
              <DotPattern className="[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
