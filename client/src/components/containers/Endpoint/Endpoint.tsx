import React from "react"; 
import MockifyTable from "../../commons/Table/Table";
import EndpointService from "services/Endpoint";
import MockifyButton from "components/commons/Button/Button";
import ColumnsWithActions from "../../presentational/Endpoint/EndpointData";
import MockifyLoader from "components/commons/Loader/MockifyLoader";
import { EyeOutlined } from "@ant-design/icons";
import ResourceService from "services/Resource";
import {Drawer, Tabs } from "antd";
import MockifyCodeEditor from "components/commons/CodeEditor/CodeEditor";

const Endpoint : React.FC = () => {
  const { 
    endpoint, 
    loading,
    handleTabChange,
    key, 
    handleCloseSwaggerDrawer,
    handleShowSwaggerDrawer,
    swaggerDocsCache,
    selectedResourceSwaggerDocs,
    swaggerDrawerVisible,
    selectedResource
  
  } = EndpointService();

  const {
    resource,
  } = ResourceService();

  return (
    <>
    {
      loading ? <MockifyLoader size="large" /> 
      : (
        <>
          {/* resource selection */}
        <Tabs
          defaultActiveKey={`${key}`}
          tabPosition="top"
          tabBarExtraContent={
            <MockifyButton 
            classes={['table-action-third', 'textAndIcon', ]} 
            onClick={() => {handleShowSwaggerDrawer(); swaggerDocsCache();}} 
            icon={<EyeOutlined />}
            text={`Swagger 2.0 Docs`}
            />
          }
          style={{ height: "100%" }}
          onTabClick={(e) => handleTabChange(e, resource)}
          items={resource.map((resource : any, index : number) => {
            return {
              label: `${resource.resourceName}`,
              key: `${index}`,
              disabled: false,
              children: (
                <MockifyTable 
                  columns={ColumnsWithActions([])} 
                  data={endpoint} 
                  classes={["mockify-table"]} />
              ),
            };
          })}
        />
        <Drawer
            title={`${selectedResource.resourceName} Swagger Docs`}
            placement="right"
            onClose={handleCloseSwaggerDrawer}
            open={swaggerDrawerVisible}
            width={600}
          >
            <MockifyCodeEditor 
            value={selectedResourceSwaggerDocs} height={"auto"} width={"600px"} onChange={() => console} />
          </Drawer>
        </>
      )
    }
    </>
  )

}

export default Endpoint;