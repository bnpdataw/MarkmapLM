import React, { useRef } from 'react';
import { SparklesIcon, LoaderIcon, ImageIcon } from './icons';
import { useStore } from '../store/useStore';

const EditorPanel: React.FC = () => {
  const { markdown, setMarkdown, fixMarkdown, isFixing } = useStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleInsertImageClick = () => {
    imageInputRef.current?.click();
  };

  const handleImageFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const imageMarkdown = `![${file.name}](${dataUrl})\n`;

      const textarea = textareaRef.current;
      if (textarea) {
        const { selectionStart, selectionEnd } = textarea;
        const newMarkdown =
          markdown.substring(0, selectionStart) +
          imageMarkdown +
          markdown.substring(selectionEnd);
        
        setMarkdown(newMarkdown);

        // Focus and set cursor position after the inserted markdown
        setTimeout(() => {
          if (textareaRef.current) {
            textareaRef.current.focus();
            const newCursorPosition = selectionStart + imageMarkdown.length;
            textareaRef.current.selectionStart = textareaRef.current.selectionEnd = newCursorPosition;
          }
        }, 0);
      }
    };
    reader.readAsDataURL(file);
    // Reset file input to allow uploading the same file again
    event.target.value = '';
  };
  
  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden h-full">
      <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Markdown Editor</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handleInsertImageClick}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
            title="Insert local image"
          >
            <ImageIcon className="-ml-1 mr-2 h-5 w-5" />
            Insert Image
          </button>
          <input
            type="file"
            ref={imageInputRef}
            onChange={handleImageFileChange}
            className="hidden"
            accept="image/*"
          />
          <button
            onClick={fixMarkdown}
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
      </div>
      <div className="flex-1 p-1">
        <textarea
          ref={textareaRef}
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          className="w-full h-full p-3 resize-none border-none focus:ring-0 bg-transparent text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 leading-relaxed font-mono text-sm"
          placeholder="Enter your Markdown here..."
        />
      </div>
    </div>
  );
};

export default EditorPanel;