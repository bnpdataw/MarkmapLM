# Project Refactoring: Markmap Web App

This document tracks the progress of refactoring the Markmap VSCode extension into a standalone web application.

## Phase 1: Core Functionality

- [x] Set up a basic web application structure (React, import-maps).
- [x] Implement a Markdown editor panel.
- [x] Implement a Markmap viewer panel.
- [x] Establish real-time updates from the editor to the viewer.
- [x] Use debouncing to optimize rendering performance.

## Phase 2: Advanced Features

- [x] Add a toolbar with essential controls (zoom, fit).
- [x] Implement theme switching (light/dark mode).
- [ ] Implement cursor synchronization between the editor and the corresponding node in the markmap.
- [ ] Add node folding/unfolding tracking and state persistence.

## Phase 3: Configuration & Export

- [x] Implement export to SVG functionality.
- [x] Implement export to a self-contained HTML file.
- [x] Create a settings modal for Markmap options (JSON configuration).
- [x] Allow users to apply custom CSS.
- [x] Add the ability to upload a Markdown file.

## Phase 4: LLM Integration (Gemini API)

- [x] Integrate the Gemini API to provide Markdown correction.
- [x] Add a "Fix with AI" button to trigger syntax correction.
- [ ] Provide a preview of AI-suggested changes before applying them.
- [ ] Explore context-aware formatting suggestions.
- [ ] Research and implement batch error fixing for multiple issues at once.
- [ ] Consider adding custom rule support for organization-specific Markdown standards.

## Key Technical Considerations & Future Enhancements

- [x] **Layout Optimization**: Implemented a resizable splitter and collapsible editor panel.
- [x] **Custom Icon**: Replaced the default Markmap favicon with a custom application icon.
- [ ] **Local Image Support**: Replace the VSCode-specific local image plugin with a web-compatible solution (e.g., file upload and Base64 encoding).
- [ ] **Offline Support**: Investigate and implement Progressive Web App (PWA) capabilities for offline access.
- [ ] **Accessibility (A11y)**: Conduct a full accessibility audit and add necessary ARIA attributes and keyboard navigation improvements.
- [ ] **State Management**: For more complex features, evaluate and potentially integrate a dedicated state management library (e.g., Zustand, Redux).
- [ ] **Testing**: Add unit and integration tests for components and services.