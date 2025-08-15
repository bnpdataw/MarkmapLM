import React from 'react';
import { UploadIcon, DownloadIcon, SettingsIcon, SunIcon, MoonIcon, CodeIcon, SidebarOpenIcon, SidebarCloseIcon } from './icons';
import { useStore } from '../store/useStore';

interface HeaderProps {
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onExportSvg: () => void;
  onExportHtml: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onFileUpload,
  onExportSvg,
  onExportHtml,
}) => {
  const { theme, toggleTheme, isEditorVisible, toggleEditor, openSettings } = useStore();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleEditor}
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          title={isEditorVisible ? 'Collapse Editor' : 'Expand Editor'}
        >
          {isEditorVisible ? <SidebarCloseIcon className="h-5 w-5" /> : <SidebarOpenIcon className="h-5 w-5" />}
        </button>
        <div className="flex items-center gap-2">
           <img src="/icon.svg" alt="MarkmapLM Logo" className="h-8 w-8" />
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">MarkmapLM</h1>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={onFileUpload}
          className="hidden"
          accept=".md,.markdown"
        />
        <button
          onClick={handleUploadClick}
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          title="Upload Markdown File"
        >
          <UploadIcon className="h-5 w-5" />
        </button>
        <button
          onClick={onExportSvg}
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          title="Export as SVG"
        >
          <DownloadIcon className="h-5 w-5" />
        </button>
        <button
          onClick={onExportHtml}
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          title="Export as HTML"
        >
          <CodeIcon className="h-5 w-5" />
        </button>
        <button
          onClick={openSettings}
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          title="Settings"
        >
          <SettingsIcon className="h-5 w-5" />
        </button>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          title="Toggle Theme"
        >
          {theme === 'light' ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
        </button>
      </div>
    </header>
  );
};

export default Header;
