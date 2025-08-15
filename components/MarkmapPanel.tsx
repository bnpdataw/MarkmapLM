import React, { useEffect, useRef } from 'react';
import { Markmap, deriveOptions } from 'markmap-view';
import { Toolbar } from 'markmap-toolbar';
import { Transformer } from 'markmap-lib';
import { useStore } from '../store/useStore';
import type { IMarkmapJSONOptions } from '../types';

interface MarkmapPanelProps {
  markdown: string;
  markmapRef: React.MutableRefObject<Markmap | null>;
}

const MarkmapPanel: React.FC<MarkmapPanelProps> = ({ markdown, markmapRef }) => {
  const { markmapOptions: options, customCss, theme } = useStore();
  const svgRef = useRef<SVGSVGElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    if (!styleRef.current) {
        styleRef.current = document.createElement('style');
        document.head.appendChild(styleRef.current);
    }
    styleRef.current.textContent = customCss;
  }, [customCss]);
  
  useEffect(() => {
    if (!svgRef.current) return;
    
    const transformer = new Transformer();
    if (!markmapRef.current) {
      markmapRef.current = Markmap.create(svgRef.current);
      if (toolbarRef.current) {
        const toolbar = Toolbar.create(markmapRef.current);
        toolbar.setBrand(false);
        toolbarRef.current.append(toolbar.el);
      }
    }

    const { root, frontmatter } = transformer.transform(markdown);
    const derivedOptions = deriveOptions({
      ...options,
      ...(frontmatter as any)?.markmap,
    });
    
    markmapRef.current.setData(root, derivedOptions);
    
    // Only fit once on initial load unless autoFit is true
    if (derivedOptions.autoFit) {
      markmapRef.current.fit();
    }
    
  }, [markdown, options, markmapRef]);

  return (
    <div className={`relative w-full h-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden ${theme === 'dark' ? 'markmap-dark' : ''}`}>
      <svg ref={svgRef} className="w-full h-full" />
      <div ref={toolbarRef} className="absolute bottom-4 right-4 z-10"></div>
    </div>
  );
};

export default MarkmapPanel;