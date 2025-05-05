# CampusMind CUNY-SUNY AI Agent

A modern, responsive web application featuring an AI-powered agent that helps students navigate the complex landscape of CUNY and SUNY institutions. Finding reliable information about professors, courses, and programs can be challenging and time-consuming - this solution makes this process seamless and intuitive.

👉 **[Try the live application](https://edumind-cuny-suny-ai-agent.vercel.app/)**

## 🎯 The Problem We're Solving

Students in New York face several challenges when navigating the CUNY and SUNY systems:

- **Scattered Information**: Details about professors and courses are spread across multiple platforms
- **Outdated Data**: Official websites often contain outdated or incomplete professor information
- **Time-Consuming Research**: Students waste hours trying to find reliable professor reviews and course details
- **Decision Paralysis**: With so many options across 60+ campuses, students struggle to make informed decisions

This AI-powered solution brings all this information together in one place, providing students with reliable, up-to-date information they can trust.

## 🚀 Features

- **Professor Search**: Find comprehensive information about professors using their first name, last name, and college/university
- **AI-Powered Responses**: Get detailed, contextual information about teaching styles, course difficulty, and more
- **Modern UI**: Clean, responsive interface built with React and Tailwind CSS
- **User Consent Management**: Privacy-first approach with clear consent management
- **Source Attribution**: All information comes with clearly marked sources so students know what to trust

## 🔧 Tech Stack

- **Frontend**: 
  - React 18 with TypeScript
  - Vite as build tool
  - Tailwind CSS for styling
  - Framer Motion for animations
  - React Router for navigation
  - Lucide icons
  - React Markdown for rendering formatted responses

- **Backend**: 
  - FastAPI for high-performance API endpoints
  - Uvicorn as ASGI server
  - LangChain for AI orchestration
  - MongoDB for data storage
  - Sentence Transformers and FAISS for semantic search
  - Groq and Together AI for LLM integration
  - Custom RAG system with DuckDuckGo Search integration
  - PDF processing capabilities for academic resources

## 📦 Installation

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Setup Instructions

1. Clone the repository
   ```bash
   https://github.com/slfagrouche/CampusMind-Frontend.git
   cd CampusMind-Frontend
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env.local
   ```
   Edit the `.env.local` file to add your API endpoint

4. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open `http://localhost:5173` in your browser to see the application

## 🏗️ Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── ChatInterface.tsx
│   ├── ConsentDialog.tsx
│   ├── ErrorMessage.tsx
│   ├── LoadingIndicator.tsx
│   ├── ProfessorSearch.tsx
│   ├── ResponseDisplay/
│   └── ui/             # Base UI components
├── layouts/            # Page layout components
├── lib/                # Shared library code
├── pages/              # Page components
├── services/           # API services
├── utils/              # Utility functions
├── App.tsx             # Main application component
├── index.css           # Global CSS
└── main.tsx            # Application entry point
```

## 🔄 How It Works

The system uses a multi-agent AI architecture to provide the most accurate and helpful information:

1. **User Query Processing**: Analyzes what you're asking to route to the right specialized agent
2. **Data Retrieval**: Pulls information from multiple sources:
   - Curated database of professor information
   - Official school websites and resources
   - Trusted third-party review platforms
   - Real-time web search when needed
3. **AI-Enhanced Responses**: Synthesizes this information into clear, helpful answers
4. **Source Attribution**: Every piece of information includes its source so you can verify and trust what you're seeing

## 🧠 Backend Architecture

The backend is built with a focus on performance, scalability, and AI-first design, implementing:

- **Multi-Agent System**: Specialized AI agents for different types of queries (professor info, transfer details, etc.)
- **Retrieval Augmented Generation (RAG)**: For accurate, up-to-date information with reduced hallucinations
- **Vector Database**: For semantic search across the knowledge base
- **Memory Systems**: To maintain context in conversations
- **Real-time Web Integration**: To supplement internal knowledge with the latest information

The backend API is deployed on Hugging Face Spaces and the source code is available at [CampusMind-Backend Repository](https://github.com/slfagrouche/CampusMind-Backend).

## 🚀 Deployment

This application can be deployed to various platforms:

### Vercel/Netlify (Recommended)

1. Connect your repository to Vercel or Netlify
2. Configure the build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
3. Set the required environment variables
4. Deploy!

### Traditional Hosting

1. Build the application
   ```bash
   npm run build
   ```
2. Deploy the contents of the `dist` directory to your web server

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📬 Contact

Have questions or feedback? Reach out via:
- GitHub Issues 
- Email: SaidLfagrouche@gmail.com

---
