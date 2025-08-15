import React, { useRef, useEffect } from 'react';
import { useStore } from './store/useStore';
import { useDebounce } from './hooks/useDebounce';
import { downloadSvg, downloadHtml } from './utils/exportUtils';
import EditorPanel from './components/EditorPanel';
import MarkmapPanel from './components/MarkmapPanel';
import Header from './components/Header';
import SettingsModal from './components/SettingsModal';
import { Markmap } from 'markmap-view';
import { Transformer } from 'markmap-lib';
import { Allotment } from 'allotment';

const App: React.FC = () => {
  const {
    markdown,
    theme,
    isSettingsOpen,
    markmapOptions,
    customCss,
    isEditorVisible,
    closeSettings,
    handleFileUpload,
  } = useStore();
  
  const debouncedMarkdown = useDebounce(markdown, 300);
  const markmapRef = useRef<Markmap | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const handleExportSvg = () => {
    if (markmapRef.current) {
      downloadSvg(markmapRef.current.svg.node() as SVGSVGElement);
    }
  };

  const handleExportHtml = async () => {
    const transformer = new Transformer();
    const { root, frontmatter } = transformer.transform(markdown);
    const combinedOptions = { ...markmapOptions, ...(frontmatter as any)?.markmap };
    await downloadHtml(root, combinedOptions, customCss);
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
    // Reset file input to allow uploading the same file again
    event.target.value = '';
  };

  return (
    <div className="flex flex-col h-screen font-sans text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header
        onFileUpload={handleUpload}
        onExportSvg={handleExportSvg}
        onExportHtml={handleExportHtml}
      />
      <main className="flex-1 overflow-hidden">
        <Allotment>
          <Allotment.Pane visible={isEditorVisible} minSize={350} preferredSize="35%">
            <div className="h-full p-4 pl-4 pr-2">
              <EditorPanel />
            </div>
          </Allotment.Pane>
          <Allotment.Pane>
             <div className="h-full p-4 pr-4 pl-2">
              <MarkmapPanel
                markdown={debouncedMarkdown}
                markmapRef={markmapRef}
              />
            </div>
          </Allotment.Pane>
        </Allotment>
      </main>
      {isSettingsOpen && (
        <SettingsModal onClose={closeSettings} />
      )}
    </div>
  );
};

export default App;