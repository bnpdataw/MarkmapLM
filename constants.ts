
import { IMarkmapJSONOptions } from './types';

export const INITIAL_MARKDOWN = `
# Markmap Web

## Basic Usage

- **Pan**: Drag the canvas.
- **Zoom**: Use the mouse wheel.
- **Toggle Fold**: Click on a node to fold/unfold it.

## Features

- Real-time rendering
- Toolbar controls
  - Zoom In / Out
  - Fit to screen
- Export
  - SVG
  - HTML (with interactive viewer)
- AI-powered Markdown Fixer (Gemini)

## Markdown Syntax

### Lists
- Unordered List
  - Nested Item
- Ordered List
  1. First
  2. Second

### Code
\`inline code\`
\`\`\`js
// code block
function hello() {
  console.log("Hello, Markmap!");
}
\`\`\`

### Links
[Official Website](https://markmap.js.org/)

## Pro Tip
Use the "Fix with AI" button if your markdown looks broken!
`;

export const DEFAULT_OPTIONS: IMarkmapJSONOptions = {
  autoFit: true,
  duration: 500,
  initialExpandLevel: -1,
  color: [
      '#818cf8', '#a78bfa', '#c084fc', '#e879f9', '#f472b6',
      '#fb7185', '#f87171', '#fb923c', '#facc15', '#a3e635',
      '#4ade80', '#34d399', '#2dd4bf', '#22d3ee', '#38bdf8'
  ],
};
