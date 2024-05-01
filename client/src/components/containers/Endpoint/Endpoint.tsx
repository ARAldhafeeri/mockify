import React from "react"; 
import MockifyTable from "../../commons/Table/Table";
import EndpointService from "services/Endpoint";
import MockifyButton from "components/commons/Button/Button";
import ColumnsWithActions from "../../presentational/Endpoint/EndpointData";
import MockifyLoader from "components/commons/Loader/MockifyLoader";
import { EyeOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import GlobalTabs from "../GlobalTabs/GlobalTabs";
import ResourceService from "services/Resource";
const Endpoint : React.FC = () => {
  const { 
    endpoint, 
    loading,
    handleTabChange,
    handleResourceTabChange,
    key,
  
  } = EndpointService();

  const {
    resource,
    resourceKey,
  } = ResourceService();


  return (
    <>
    {
      loading ? <MockifyLoader size="large" /> : (
          <GlobalTabs
              handleTabChange={handleResourceTabChange}
              key={resourceKey}
              content={
               <React.Fragment>
               <Tabs
                  defaultActiveKey={`${resourceKey}`}
                  tabPosition="left"
                  style={{ height: "100%" }}
                  onTabClick={(e) => handleTabChange(e, resource)}
                  items={resource.map((resource : any, index : number) => {
                    return {
                      label: `${resource?.resourceName}`,
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
               </React.Fragment>
              } 
              withCreateBtn={false} 
          />
      )
    }
    </>
  )

}

export default Endpoint;

