import React from "react";
import "./Loader.module.scss";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import MockifyLoaderTypes from "./Loader.types";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const MockifyLoader: React.FC<MockifyLoaderTypes> = (props) => {
 const { delay, indicator, size, spinning, tip, wrapperClassName } = props;
  return (
      <Spin 
        delay={delay} 
        size={size}
        indicator={antIcon} 
        spinning={spinning} 
        tip={tip} 
        className="loader"
        wrapperClassName={wrapperClassName} />
  );
}

export default MockifyLoader
