import { Drawer, Pagination, Tabs } from 'antd';
import MockifyButton from 'components/commons/Button/Button';
import React from 'react'
import SwaggerService from 'services/Swagger';
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css";
import { EyeOutlined } from "@ant-design/icons";
import MockifyCodeEditor from 'components/commons/CodeEditor/CodeEditor';
import ResourceService from 'services/Resource';
import MockifyLoader from 'components/commons/Loader/MockifyLoader';
import GlobalTabsProjects from '../GlobalTabs/GlobalTabsProjects';

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
    handleTabChange,
    page,
    setPage,
    pageSize,
    setPageSize, 
    swaggerDocsPaginated
  } = SwaggerService();

  
  const {
    loading,
    handleResourceTabChange,
    resourceKey,
  } = ResourceService() 

  return (
    <>
    {
  loading ? <MockifyLoader size="large" /> : (
    <GlobalTabsProjects
      handleTabChange={handleResourceTabChange}
      tabKey={resourceKey}
      content={
        <React.Fragment>
        
        <Tabs
            defaultActiveKey={`${key}`}
            tabPosition="left"
            style={{ height: "100%" }}
            onTabClick={(e) => handleTabChange(e, resource)}
            tabBarExtraContent={{
              left:      <MockifyButton 
              classes={['table-action-third', 'textAndIcon', ]} 
              onClick={() => {handleShowSwaggerDrawer(); swaggerDocsCache();}} 
              icon={<EyeOutlined />}
              text={``}
              />
            }}
              items={resource.map((resource : any, index : number) => {
                return {
                  label: `${resource?.name}`,
                  key: `${index}`,
                  disabled: false,
                  children: (
                    <React.Fragment>
                      <SwaggerUI spec={swaggerDocsPaginated} />
                      <Pagination  current={page} pageSize={pageSize} total={Object.entries(selectedResourceSwaggerDocs?.paths)?.length} onChange={(page, pageSize) => {setPage(page); setPageSize(pageSize)}} />

                    </React.Fragment>
                  ),
                };
              })}
    />
    <Drawer
    title={`${selectedResource?.name} Swagger Docs`}
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
              </React.Fragment>
              } 
              withCreateBtn={false} 
          />
      )
    }
    </>
  )

}
export default Swagger;