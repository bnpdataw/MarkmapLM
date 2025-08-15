import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IMarkmapJSONOptions } from '../types';
import { INITIAL_MARKDOWN, DEFAULT_OPTIONS } from '../constants';
import { fixMarkdownWithGemini } from '../services/geminiService';

interface AppState {
  markdown: string;
  theme: 'light' | 'dark';
  isSettingsOpen: boolean;
  markmapOptions: IMarkmapJSONOptions;
  customCss: string;
  isEditorVisible: boolean;
  apiKey: string;
  isFixing: boolean;
  
  setMarkdown: (markdown: string) => void;
  toggleTheme: () => void;
  openSettings: () => void;
  closeSettings: () => void;
  saveSettings: (options: IMarkmapJSONOptions, css: string, apiKey: string) => void;
  toggleEditor: () => void;
  fixMarkdown: () => Promise<void>;
  handleFileUpload: (file: File) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // State
      markdown: INITIAL_MARKDOWN,
      theme: 'light',
      isSettingsOpen: false,
      markmapOptions: DEFAULT_OPTIONS,
      customCss: '',
      isEditorVisible: true,
      apiKey: '',
      isFixing: false,
      
      // Actions
      setMarkdown: (markdown) => set({ markdown }),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      openSettings: () => set({ isSettingsOpen: true }),
      closeSettings: () => set({ isSettingsOpen: false }),
      saveSettings: (options, css, apiKey) => set({
        markmapOptions: options,
        customCss: css,
        apiKey: apiKey,
        isSettingsOpen: false,
      }),
      toggleEditor: () => set((state) => ({ isEditorVisible: !state.isEditorVisible })),
      
      fixMarkdown: async () => {
        const { markdown, apiKey } = get();
        if (!apiKey) {
          alert('Please set your Gemini API Key in the settings first.');
          set({ isSettingsOpen: true });
          return;
        }
        set({ isFixing: true });
        try {
          const fixedMarkdown = await fixMarkdownWithGemini(markdown, apiKey);
          set({ markdown: fixedMarkdown });
        } catch (error) {
          console.error('Failed to fix markdown:', error);
          alert(`Error fixing Markdown: ${(error as Error).message}`);
        } finally {
          set({ isFixing: false });
        }
      },

      handleFileUpload: (file) => {
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const text = e.target?.result as string;
            set({ markdown: text });
          };
          reader.readAsText(file);
        }
      },
    }),
    {
      name: 'markmap-web-storage', // name of the item in the storage (must be unique)
      partialize: (state) => ({
        markdown: state.markdown,
        theme: state.theme,
        markmapOptions: state.markmapOptions,
        customCss: state.customCss,
        isEditorVisible: state.isEditorVisible,
        apiKey: state.apiKey,
      }),
    }
  )
);
