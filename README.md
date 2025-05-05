# Edumind CUNY-SUNY AI Agent

A modern, responsive web application featuring an AI-powered agent that allows students to search for professors at CUNY and SUNY institutions and get intelligent, contextual information about them.

## 🚀 Features

- **Professor Search**: Find information about professors using their first name, last name, and college/university
- **AI-Powered Responses**: Get detailed, contextual information about professors
- **Modern UI**: Clean, responsive interface built with React and Tailwind CSS
- **User Consent Management**: Privacy-first approach with clear consent management

## 🔧 Tech Stack

- **Frontend**: 
  - React 18 with TypeScript
  - Vite as build tool
  - Tailwind CSS for styling
  - Framer Motion for animations
  - React Router for navigation
  - Lucide icons

- **Backend**: 
  - The backend API is available at [GitHub Repository Link] 
  - Built with [Technology Stack] 

## 📦 Installation

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Setup Instructions

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/edumind-cuny-suny-ai-agent.git
   cd edumind-cuny-suny-ai-agent
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

## 🔄 API Integration

The frontend connects to a backend API for retrieving professor information. The backend is responsible for:

1. Authenticating requests
2. Searching for professors in the database
3. Generating AI responses using collected data
4. Returning structured responses with sources

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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the [LICENSE TYPE] - see the LICENSE file for details.

## 📞 Contact

Project Link: [GitHub Repository Link]

---

Built with ❤️ for CUNY and SUNY students by Edumind 
