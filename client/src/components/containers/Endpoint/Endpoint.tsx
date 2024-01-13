import React from "react"; 
import MockifyTable from "../../commons/Table/Table";
import EndpointService from "services/Endpoint";
import MockifyButton from "components/commons/Button/Button";
import ColumnsWithActions from "../../presentational/Endpoint/EndpointData";
import MockifyLoader from "components/commons/Loader/MockifyLoader";
import { EyeOutlined } from "@ant-design/icons";
import ResourceService from "services/Resource";
import { Tabs } from "antd";
const Endpoint : React.FC = () => {
  const { 
    endpoint, 
    loading,
    handleTabChange,
    key, 
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
        </>
      )
    }
    </>
  )

}

export default Endpoint;