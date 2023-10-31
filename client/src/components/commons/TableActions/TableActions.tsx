import React from "react";
import { Space } from 'antd';
import MockifyButton from "components/commons/Button/Button";



const TableActions= (props: any) => {
  const { record , actions } = props;
  return (
  <Space size="middle">
    {
      actions.map((action : any, key : any) => {
        return (
          <MockifyButton 
          icon={action.icon}
          classes={action.classes}
          onClick={() => action.onclick(record)} />
        )
      })
    }
  </Space>
  )
}

export default TableActions;