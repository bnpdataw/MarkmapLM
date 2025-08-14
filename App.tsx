import React, { useState, useCallback, useRef, useEffect } from 'react';
import { INode, IMarkmapJSONOptions } from './types';
import { INITIAL_MARKDOWN, DEFAULT_OPTIONS } from './constants';
import { useDebounce } from './hooks/useDebounce';
import { fixMarkdownWithGemini } from './services/geminiService';
import { downloadSvg, downloadHtml } from './utils/exportUtils';
import EditorPanel from './components/EditorPanel';
import MarkmapPanel from './components/MarkmapPanel';
import Header from './components/Header';
import SettingsModal from './components/SettingsModal';
import { Markmap } from 'markmap-view';
import { Transformer } from 'markmap-lib';
import { Allotment } from 'allotment';
import 'allotment/dist/style.css';


const App: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>(INITIAL_MARKDOWN);
  const [isFixing, setIsFixing] = useState<boolean>(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [markmapOptions, setMarkmapOptions] = useState<IMarkmapJSONOptions>(DEFAULT_OPTIONS);
  const [customCss, setCustomCss] = useState<string>('');
  const [isEditorVisible, setEditorVisible] = useState(true);
  
  const debouncedMarkdown = useDebounce(markdown, 300);
  
  const markmapRef = useRef<Markmap | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('markmap-dark', theme === 'dark');
  }, [theme]);
  
  const handleFixMarkdown = useCallback(async () => {
    setIsFixing(true);
    try {
      const fixedMarkdown = await fixMarkdownWithGemini(markdown);
      setMarkdown(fixedMarkdown);
    } catch (error) {
      console.error('Failed to fix markdown:', error);
      alert('Error fixing Markdown. Please check the console for details.');
    } finally {
      setIsFixing(false);
    }
  }, [markdown]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setMarkdown(text);
      };
      reader.readAsText(file);
    }
    // Reset file input to allow uploading the same file again
    event.target.value = '';
  };
  
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
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const handleSettingsSave = (options: IMarkmapJSONOptions, css: string) => {
    setMarkmapOptions(options);
    setCustomCss(css);
    setIsSettingsOpen(false);
  };

  return (
    <div className={`flex flex-col h-screen font-sans text-gray-900 dark:text-gray-100 transition-colors duration-300 ${theme}`}>
      <Header
        onFileUpload={handleFileUpload}
        onExportSvg={handleExportSvg}
        onExportHtml={handleExportHtml}
        onToggleSettings={() => setIsSettingsOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
        isEditorVisible={isEditorVisible}
        onToggleEditor={() => setEditorVisible(!isEditorVisible)}
      />
      <main className="flex-1 overflow-hidden">
        <Allotment>
          <Allotment.Pane visible={isEditorVisible} minSize={350} preferredSize="35%">
            <div className="h-full p-4 pl-4 pr-2">
              <EditorPanel
                markdown={markdown}
                onMarkdownChange={setMarkdown}
                onFixMarkdown={handleFixMarkdown}
                isFixing={isFixing}
              />
            </div>
          </Allotment.Pane>
          <Allotment.Pane>
             <div className="h-full p-4 pr-4 pl-2">
              <MarkmapPanel
                markdown={debouncedMarkdown}
                markmapRef={markmapRef}
                options={markmapOptions}
                customCss={customCss}
              />
            </div>
          </Allotment.Pane>
        </Allotment>
      </main>
      {isSettingsOpen && (
        <SettingsModal
          initialOptions={markmapOptions}
          initialCss={customCss}
          onSave={handleSettingsSave}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}
    </div>
  );
};

export default App;