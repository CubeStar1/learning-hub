"use client";
import { useEffect } from "react";
import { open as openEmbed } from "@play-ai/web-embed";
import { useRouter } from "next/navigation";
import { Rocket, BookOpen, Headphones, Bot, Sparkles } from "lucide-react";
import { RainbowButton } from "@/components/ui/rainbow-button";

const webEmbedId = process.env.NEXT_PUBLIC_PLAY_AI_WEB_EMBED_ID || "";

export default function AIAssistant() {
  const router = useRouter();

  const events = [
    {
      name: "generate-quiz",
      when: "The user wants to generate a quiz on a specific topic",
      data: {
        topic: { 
          type: "string", 
          description: "The topic to generate a quiz about" 
        },
      },
    },
    {
      name: "create-podcast",
      when: "The user wants to create a podcast from study materials",
      data: {
        topic: { 
          type: "string", 
          description: "The topic or subject of the podcast" 
        },
      },
    },
    {
      name: "show-section",
      when: "The user wants to see a specific section",
      data: {
        section: { 
          type: "string", 
          description: "The section to show (quiz/podcast)" 
        },
      },
    },
  ] as const;

  const onEvent = (event: any) => {
    console.log("onEvent: ", event);
    switch (event.name) {
      case "generate-quiz":
        router.push('/quiz/new');
        break;
      case "create-podcast":
        router.push('/podcast');
        break;
      case "show-section":
        router.push(`/${event.data.section}`);
        break;
    }
  };

  useEffect(() => {
    if (!webEmbedId) {
      console.error("Play AI Web Embed ID is not configured");
      return;
    }
    openEmbed(webEmbedId, { 
      events, 
      onEvent,
      prompt: `
        You are a helpful assistant for the Learning Hub application. 
        You can help users:
        1. Generate quizzes on specific topics
        2. Create podcasts from study materials
        3. Navigate to different sections (quiz or podcast)
        
        When users want to:
        - Create a quiz: Use the &apos;generate-quiz&apos; event
        - Create a podcast: Use the &apos;create-podcast&apos; event
        - See a section: Use the &apos;show-section&apos; event
        
        Always ask users what topic they&apos;re interested in learning about.
      `
    });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
          <Bot className="h-6 w-6 text-purple-600 dark:text-purple-300" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Learning Hub Dashboard</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Your AI-powered learning companion
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quiz Section */}
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-6 text-white shadow-lg hover:scale-105 transition-transform">
          <div className="flex items-center gap-4 mb-4">
            <BookOpen className="h-8 w-8" />
            <h2 className="text-2xl font-bold">Interactive Quizzes</h2>
          </div>
          <p className="mb-4">Create and take quizzes to test your knowledge. Upload documents and automatically generate questions.</p>
          <div className="flex justify-center w-full">
            <RainbowButton 
              onClick={() => router.push('/quiz')}
              className="w-full"
            >
              Explore Quizzes
            </RainbowButton>
          </div>
        </div>

        {/* Podcast Section */}
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-6 text-white shadow-lg hover:scale-105 transition-transform">
          <div className="flex items-center gap-4 mb-4">
            <Headphones className="h-8 w-8" />
            <h2 className="text-2xl font-bold">Learning Podcasts</h2>
          </div>
          <p className="mb-4">Convert your study materials into engaging audio conversations. Perfect for auditory learners.</p>
          <div className="flex justify-center w-full">
            <RainbowButton 
              onClick={() => router.push('/podcast')}
              className="w-full"
            >
              Create Podcast
            </RainbowButton>
          </div>
        </div>

        {/* AI Assistant Section */}
        <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl p-6 text-white shadow-lg hover:scale-105 transition-transform">
          <div className="flex items-center gap-4 mb-4">
            <Rocket className="h-8 w-8" />
            <h2 className="text-2xl font-bold">AI Assistant</h2>
          </div>
          <p className="mb-4">Get help navigating the platform and making the most of our learning tools. Just ask me anything!</p>
          <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
            <p className="text-sm">
              Try saying: &apos;I want to learn about machine learning&apos; or &apos;Create a podcast about history&apos;
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <div className="inline-flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-300 mb-2">
          <Sparkles className="h-5 w-5 text-purple-500" />
            <span>Need help? Just ask the AI Assistant using the chat widget!</span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Example: &apos;Generate a quiz about large language models&apos;
        </p>
      </div>
    </div>
  );
} 