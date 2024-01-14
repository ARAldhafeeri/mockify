import { Drawer, Tabs } from 'antd';
import MockifyButton from 'components/commons/Button/Button';
import React from 'react'
import SwaggerService from 'services/Swagger';
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css";
import { EyeOutlined } from "@ant-design/icons";
import MockifyCodeEditor from 'components/commons/CodeEditor/CodeEditor';

const Swagger  : React.FC = () => {
  const {
    swaggerDocsCache,
    swaggerDrawerVisible,
    selectedResourceSwaggerDocs,
    handleShowSwaggerDrawer,
    handleCloseSwaggerDrawer,
    selectedResource,
    resource,
    key,
    handleTabChange
  } = SwaggerService();
  console.log(selectedResourceSwaggerDocs)
  return (
  <>
    <Tabs
    defaultActiveKey={`${key}`}
    tabPosition="top"
    style={{ height: "100%" }}
    onTabClick={(e) => handleTabChange(e, resource)}
    tabBarExtraContent={
      <MockifyButton 
      classes={['table-action-third', 'textAndIcon', ]} 
      onClick={() => {handleShowSwaggerDrawer(); swaggerDocsCache();}} 
      icon={<EyeOutlined />}
      text={`Swagger 2.0 Docs`}
      />
      }
      items={resource.map((resource : any, index : number) => {
        return {
          label: `${resource?.resourceName}`,
          key: `${index}`,
          disabled: false,
          children: (
              <SwaggerUI spec={selectedResourceSwaggerDocs} />
          ),
        };
      })}
    />
    <Drawer
    title={`${selectedResource?.resourceName} Swagger Docs`}
    placement="right"
    onClose={handleCloseSwaggerDrawer}
    open={swaggerDrawerVisible}
    width={600}
    >
    <MockifyCodeEditor 
      value={JSON.stringify(selectedResourceSwaggerDocs, null, 2)} 
      height={"auto"} width={"600px"} 
      onChange={() => console} 
    />
    </Drawer>
  </>

  )
}

export default Swagger;