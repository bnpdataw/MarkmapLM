import React from 'react';
import { UploadIcon, DownloadIcon, SettingsIcon, SunIcon, MoonIcon, CodeIcon, SidebarOpenIcon, SidebarCloseIcon } from './icons';

interface HeaderProps {
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onExportSvg: () => void;
  onExportHtml: () => void;
  onToggleSettings: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  isEditorVisible: boolean;
  onToggleEditor: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onFileUpload,
  onExportSvg,
  onExportHtml,
  onToggleSettings,
  theme,
  onToggleTheme,
  isEditorVisible,
  onToggleEditor,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleEditor}
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          title={isEditorVisible ? 'Collapse Editor' : 'Expand Editor'}
        >
          {isEditorVisible ? <SidebarCloseIcon className="h-5 w-5" /> : <SidebarOpenIcon className="h-5 w-5" />}
        </button>
        <div className="flex items-center gap-2">
           <svg width="32" height="32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: 'rgb(129, 140, 248)', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: 'rgb(167, 139, 250)', stopOpacity: 1}} />
              </linearGradient>
            </defs>
            <rect x="10" y="10" width="80" height="80" rx="10" ry="10" fill="url(#grad1)"/>
            <g stroke="white" strokeWidth="6" strokeLinecap="round" fill="none">
              <path d="M 30 50 H 45" />
              <path d="M 45 50 C 50 50, 50 35, 55 35 H 70" />
              <path d="M 45 50 C 50 50, 50 65, 55 65 H 70" />
            </g>
          </svg>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Markmap With AI</h1>
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
          onClick={onToggleSettings}
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          title="Settings"
        >
          <SettingsIcon className="h-5 w-5" />
        </button>
        <button
          onClick={onToggleTheme}
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