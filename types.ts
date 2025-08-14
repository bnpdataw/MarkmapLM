
export interface INode {
  content: string;
  children?: INode[];
  payload?: any;
}

export interface IMarkmapJSONOptions {
  color?: string[];
  colorFreezeLevel?: number;
  duration?: number;
  initialExpandLevel?: number;
  maxWidth?: number;
  nodeMinHeight?: number;
  paddingX?: number;
  spacingHorizontal?: number;
  spacingVertical?: number;
  autoFit?: boolean;
  embedAssets?: boolean;
  [key: string]: any;
}
