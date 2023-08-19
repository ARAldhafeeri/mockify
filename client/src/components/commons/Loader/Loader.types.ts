import { ReactNode } from "react";


interface MockifyLoaderTypes{
  delay?: number;
  indicator?: ReactNode;
  size?: any;
  spinning?: boolean;
  tip?: ReactNode;
  wrapperClassName?: string;
}

export default MockifyLoaderTypes;