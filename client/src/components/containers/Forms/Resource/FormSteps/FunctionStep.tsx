import React from 'react'
import { Space, Typography, Tabs, Badge, Divider } from 'antd';
import MockifyButton from 'components/commons/Button/Button';
import MockifyCodeEditor from 'components/commons/CodeEditor/CodeEditor';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { IResourceFormFunctionStepProps } from 'types/forms';

export default function FunctionStep(props : IResourceFormFunctionStepProps) {
  const {handleAddFunction, handleRemoveFunction, handleFormChangeFuncs, data } = props; 
  return (
    <>
      {/* Functions */}
      <Space direction='horizontal' style={{width: "100%", justifyContent: "space-between"}}>
          <Typography style={{fontFamily: "fantasy", fontSize:"18px"}}>Functions</Typography>
          <MockifyButton
              classes={['table-action-primary', 'table-action']}
              icon={<PlusCircleOutlined />}
              onClick={() => handleAddFunction("")}
            />
        </Space>

        <Tabs
          defaultActiveKey="1"
          tabPosition="top"
          style={{ height: "100%" }}
          items={data.funcs.map((func : any, index : number) => {
            return {
              label: `Function-${index}`,
              key: `${index}`,
              disabled: false,
              children: (
                <>
                  <Space direction="horizontal" style={{width: "100%", justifyContent: "space-between"}}>
                    <Badge count={index + 1} key={index} />
                    <MockifyButton
                      classes={['table-action-secondary', 'table-action']}
                      icon={<MinusCircleOutlined />}
                      onClick={() => handleRemoveFunction(index)}
                    />
                  </Space>
                  <MockifyCodeEditor
                    key={index}
                    value={func}
                    width={"100%"}
                    height={"200px"}
                    onChange={(value : string) => handleFormChangeFuncs(value, index)}
                    />
                    <Divider />
                </>
              ),
            };
          })}
        />
      </>
  )
}
