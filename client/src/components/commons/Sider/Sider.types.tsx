export interface ISiderItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  to: string;
  children?: ISiderItem[];
}

export interface SiderProps {
  items: ISiderItem[];
  collapsed: boolean;
  handleclick: (e: any) => void;
  setCollapsed: (e: any) => void;
}