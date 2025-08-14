
import React from 'react';
import { SparklesIcon, LoaderIcon } from './icons';

interface EditorPanelProps {
  markdown: string;
  onMarkdownChange: (markdown: string) => void;
  onFixMarkdown: () => void;
  isFixing: boolean;
}

const EditorPanel: React.FC<EditorPanelProps> = ({ markdown, onMarkdownChange, onFixMarkdown, isFixing }) => {
  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden h-full">
      <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Markdown Editor</h2>
        <button
          onClick={onFixMarkdown}
          disabled={isFixing}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-all"
        >
          {isFixing ? (
            <>
              <LoaderIcon className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
              Fixing...
            </>
          ) : (
            <>
              <SparklesIcon className="-ml-1 mr-2 h-5 w-5 text-yellow-300" />
              Fix with AI
            </>
          )}
        </button>
      </div>
      <div className="flex-1 p-1">
        <textarea
          value={markdown}
          onChange={(e) => onMarkdownChange(e.target.value)}
          className="w-full h-full p-3 resize-none border-none focus:ring-0 bg-transparent text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 leading-relaxed font-mono text-sm"
          placeholder="Enter your Markdown here..."
        />
      </div>
    </div>
  );
};

export default EditorPanel;
