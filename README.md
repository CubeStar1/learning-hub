# AI Learning Hub

A platform for converting PDFs into interactive podcasts and generating quizzes

## Core Features

### PDF to Podcast Conversion
- Transform any PDF document into natural-sounding conversations
- Custom voice speed and tone adjustments

###  AI-Powered Learning Tools
- **Smart Quiz Generation**: Automatically create quizzes from your study materials
- **Intelligent Summaries**: Get concise summaries of complex documents

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- OpenAI API key
- Google AI API key
- Playnote API key

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


## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TailwindCSS
- **Backend**: Supabase
- **AI Services**: 
  - Playnote API for audio generation
  - Gemini API
