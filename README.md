# Markmap Web

An interactive web application to visualize Markdown as a mind map, featuring real-time editing, SVG/HTML export, and AI-powered syntax correction using the Google Gemini API.

This project is a web-based refactor of the original [markmap-vscode](https://github.com/gera2ld/markmap-vscode) extension, bringing its powerful visualization capabilities to the browser.

![Markmap Web Application Screenshot](https://storage.googleapis.com/agent-tools-public/screenshots/markmap-web/markmap-web-screenshot.png)

## ✨ Features

- **Real-time Visualization**: Instantly see your Markdown rendered as an interactive mind map as you type.
- **Resizable Layout**: A draggable splitter allows you to adjust the view between the editor and the mind map. The editor panel can also be collapsed.
- **AI-Powered Corrections**: Uses the Google Gemini API to automatically fix broken or invalid Markdown syntax with a single click.
- **File Handling**:
  - **Upload**: Open local `.md` or `.markdown` files.
  - **Export to SVG**: Download a static SVG of your current mind map.
  - **Export to HTML**: Download a self-contained, interactive HTML file that can be viewed offline.
- **Local Image Support**: Insert local images directly into your markdown. They are automatically converted to Base64 and embedded in the document.
- **Customization**:
  - **Themes**: Switch between light and dark modes.
  - **Markmap Options**: Fine-tune the appearance and behavior of the mind map via a JSON editor.
  - **Custom CSS**: Apply your own CSS for complete visual control.
- **Toolbar Controls**: Easily zoom in, zoom out, and fit the mind map to the view.

## 🚀 Technology Stack

- **Frontend**: [React](https://reactjs.org/) & [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Mind Mapping**: [Markmap.js](https://markmap.js.org/) (`markmap-lib`, `markmap-view`, `markmap-toolbar`)
- **AI Integration**: [Google Gemini API](https://ai.google.dev/) (`@google/genai`)
- **Layout**: [Allotment](https://github.com/johnsoncodehk/allotment) for the resizable split-pane view.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Setup**: No bundler! The app uses native browser ES Modules with an [Import Map](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap) for dependency management.

## 🔧 Getting Started

### Prerequisites

- A modern web browser that supports Import Maps (e.g., Chrome, Firefox, Edge, Safari 16.4+).
- A local web server to serve the project files.

### API Key Configuration

The AI-powered "Fix with AI" feature requires a Google Gemini API key.

The application expects the API key to be available in the `process.env.API_KEY` environment variable. You must ensure this is configured in the environment where you run or deploy the application.

### Running Locally

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Serve the project:**
    Since this project doesn't have a build step, you just need to serve the files. You can use any simple static file server. If you have Node.js installed, you can use `serve`:

    ```bash
    # If you don't have serve, install it globally
    npm install -g serve

    # Serve the current directory
    serve .
    ```

3.  Open your browser and navigate to the local URL provided by the server (e.g., `http://localhost:3000`).

## 📁 Project Structure

```
.
├── components/         # React components (Editor, MarkmapPanel, Header, etc.)
├── constants.ts        # Shared constants (initial markdown, default options)
├── hooks/              # Custom React hooks (useDebounce)
├── services/           # Services for external APIs (geminiService)
├── store/              # Zustand store for state management
├── utils/              # Utility functions (exportUtils)
├── App.tsx             # Main application component
├── index.html          # Entry point, defines layout and import map
├── index.tsx           # React root renderer
├── README.md           # This file
└── types.ts            # TypeScript type definitions
```

## 📄 License

This project is licensed under the MIT License.