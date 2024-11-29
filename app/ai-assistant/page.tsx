"use client";
import { useEffect } from "react";
import { open as openEmbed } from "@play-ai/web-embed";
import { useRouter } from "next/navigation";
import { Rocket, BookOpen, Headphones } from "lucide-react";

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
        - Create a quiz: Use the 'generate-quiz' event
        - Create a podcast: Use the 'create-podcast' event
        - See a section: Use the 'show-section' event
        
        Always ask users what topic they're interested in learning about.
      `
    });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Learning Hub Dashboard</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quiz Section */}
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-6 text-white shadow-lg hover:scale-105 transition-transform">
          <div className="flex items-center gap-4 mb-4">
            <BookOpen className="h-8 w-8" />
            <h2 className="text-2xl font-bold">Interactive Quizzes</h2>
          </div>
          <p className="mb-4">Create and take quizzes to test your knowledge. Upload documents and automatically generate questions.</p>
          <button 
            onClick={() => router.push('/quiz')}
            className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-purple-50 transition-colors"
          >
            Explore Quizzes
          </button>
        </div>

        {/* Podcast Section */}
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-6 text-white shadow-lg hover:scale-105 transition-transform">
          <div className="flex items-center gap-4 mb-4">
            <Headphones className="h-8 w-8" />
            <h2 className="text-2xl font-bold">Learning Podcasts</h2>
          </div>
          <p className="mb-4">Convert your study materials into engaging audio conversations. Perfect for auditory learners.</p>
          <button 
            onClick={() => router.push('/podcast')}
            className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            Create Podcast
          </button>
        </div>

        {/* AI Assistant Section */}
        <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl p-6 text-white shadow-lg hover:scale-105 transition-transform">
          <div className="flex items-center gap-4 mb-4">
            <Rocket className="h-8 w-8" />
            <h2 className="text-2xl font-bold">AI Assistant</h2>
          </div>
          <p className="mb-4">Get help navigating the platform and making the most of our learning tools. Just ask me anything!</p>
          <p className="text-sm bg-white/20 p-3 rounded-lg">
            Try saying: "I want to learn about machine learning" or "Create a podcast about history"
          </p>
        </div>
      </div>

      <div className="mt-12 text-center text-muted-foreground">
        <p>Need help? Just ask the AI Assistant using the chat widget!</p>
        <p className="text-sm mt-2">Example: "Generate a quiz about large language models"</p>
      </div>
    </div>
  );
} 