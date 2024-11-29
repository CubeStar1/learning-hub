# AI Learning Hub

Transform your study materials into engaging audio content with our AI-powered learning platform. Convert PDFs into interactive podcasts, generate smart quizzes, and learn with an AI tutor.

## 🎯 Core Features

### 📝 PDF to Podcast Conversion
- Transform any PDF document into natural-sounding conversations
- Multiple AI voices for engaging dialogue
- Support for academic papers, textbooks, and study materials
- Custom voice speed and tone adjustments

### 🤖 AI-Powered Learning Tools
- **Smart Quiz Generation**: Automatically create quizzes from your study materials
- **Intelligent Summaries**: Get concise summaries of complex documents
- **24/7 AI Tutor**: Ask questions and get instant explanations
- **Progress Analytics**: Track your learning journey with detailed insights

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- OpenAI API key
- Google AI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-learning-hub.git
cd ai-learning-hub
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file with the following:
```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8001

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# AI Services
OPENAI_API_KEY=your_openai_api_key
GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_api_key

# Playnote (for PDF to Audio)
PLAYNOTE_USER_ID=your_playnote_user_id
PLAYNOTE_API_KEY=your_playnote_api_key
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 💡 Usage

### Converting PDFs to Podcasts
1. Upload your PDF through the dashboard
2. Select voice preferences and conversation style
3. Wait for AI processing (typically 1-2 minutes)
4. Download or stream your personalized audio content

### Generating Quizzes
1. Upload study material
2. Choose quiz type (multiple choice, flash cards, etc.)
3. Get AI-generated questions based on the content
4. Track your performance and identify areas for improvement

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TailwindCSS
- **Backend**: Supabase
- **AI Services**: 
  - OpenAI GPT-4 for content understanding
  - Google AI for natural language processing
  - Playnote API for audio generation
