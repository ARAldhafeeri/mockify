import { CSSProperties, ReactNode } from "react";

interface MockifyCardTypes {
  actions?: Array<ReactNode>;
  activeTabKey?: string;
  bodyStyle?: CSSProperties;
  bordered?: boolean;
  cover?: ReactNode;
  defaultActiveTabKey?: string;
  extra?: ReactNode;
  headStyle?: CSSProperties;
  hoverable?: boolean;
  loading?: boolean;
  size?: any | string;
  tabBarExtraContent?: ReactNode;
  tabProps?: any;
  title?: ReactNode;
  type?: string;
  children?: ReactNode;
  classes: Array<string>;
  onTabChange?: (key: string) => void;

}

export default MockifyCardTypes;