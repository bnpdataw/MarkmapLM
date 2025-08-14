import type { INode, IMarkmapJSONOptions } from '../types';
import { Transformer } from 'markmap-lib';
import { fillTemplate } from 'markmap-render';

export function downloadSvg(svgEl: SVGSVGElement) {
  if (!svgEl) return;
  const serializer = new XMLSerializer();
  let source = serializer.serializeToString(svgEl);

  // Add namespaces
  if (!source.match(/^<svg[^>]+xmlns="http:\/\/www.w3.org\/2000\/svg"/)) {
    source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  if (!source.match(/^<svg[^>]+"http:\/\/www.w3.org\/1999\/xlink"/)) {
    source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
  }

  // Add styles
  const style = document.createElement('style');
  style.textContent = Array.from(document.styleSheets)
    .map(s => {
      try {
        return Array.from(s.cssRules)
          .map(r => r.cssText)
          .join('\\n');
      } catch (e) {
        // Ignore CORS issues on external stylesheets
        return '';
      }
    })
    .join('\\n');
  
  const styleStr = `<defs>${style.outerHTML}</defs>`;
  source = source.replace('</svg>', `${styleStr}</svg>`);

  const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'markmap.svg';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

async function fetchAssets(assets: any) {
    const { styles, scripts } = assets;
    const [css, js] = await Promise.all([
        Promise.all(styles.map(async (item: any) => {
            if (item.type === 'stylesheet' && item.data.href) {
                const res = await fetch(item.data.href);
                return { type: 'style', data: await res.text() };
            }
            return item;
        })),
        Promise.all(scripts.map(async (item: any) => {
            if (item.type === 'script' && item.data.src) {
                const res = await fetch(item.data.src);
                return { type: 'script', data: {textContent: await res.text() }};
            }
            return item;
        }))
    ]);
    return { styles: css, scripts: js };
}

export async function downloadHtml(root: INode, options: IMarkmapJSONOptions, customCss: string) {
    const transformer = new Transformer();
    // Get all features to include all necessary assets
    const { features } = transformer.transform('');
    let assets = transformer.getAssets(Object.keys(features));
    
    // Hardcode version to match the one in importmap, as ESM module doesn't expose a static version property.
    const toolbarVersion = "0.18.12";

    // Add toolbar assets
    assets.scripts.push({
        type: 'script',
        data: {
            src: `https://cdn.jsdelivr.net/npm/markmap-toolbar@${toolbarVersion}/dist/index.js`,
        },
    });
    assets.styles.push({
        type: 'stylesheet',
        data: {
            href: `https://cdn.jsdelivr.net/npm/markmap-toolbar@${toolbarVersion}/dist/style.css`,
        },
    });

    if (customCss) {
        assets.styles.push({
            type: 'style',
            data: customCss,
        });
    }

    // Add IIFE script to initialize the toolbar after the markmap is rendered
    assets.scripts.push({
        type: 'iife',
        data: {
            fn: () => {
                const F = () => {
                    const { Toolbar, mm } = (window as any).markmap;
                    if (mm && Toolbar) {
                        const toolbar = Toolbar.create(mm);
                        // Apply some basic styles to position the toolbar
                        toolbar.el.style.position = 'absolute';
                        toolbar.el.style.bottom = '1rem';
                        toolbar.el.style.right = '1rem';
                        document.body.append(toolbar.el);
                    }
                };
                // The markmap autoloader runs on DOMContentLoaded, so we should too.
                if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', F);
                } else {
                    F();
                }
            },
            getParams: () => [],
        },
    });

    const embeddedAssets = await fetchAssets(assets);

    const html = fillTemplate(root, embeddedAssets, {
        jsonOptions: options,
    });
    
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'markmap.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}