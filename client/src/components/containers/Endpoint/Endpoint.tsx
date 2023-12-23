import React from "react"; 
import MockifyTable from "../../commons/Table/Table";
import EndpointController from "controllers/Endpoint";
import MockifyButton from "components/commons/Button/Button";
import ColumnsWithActions from "../../presentational/Endpoint/EndpointData";
import MockifyLoader from "components/commons/Loader/MockifyLoader";
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { IFetchedEndpointData } from "types/Endpoint";
import ResourceController from "controllers/Resource";
import { Divider, Space, Tabs } from "antd";

const Endpoint : React.FC = () => {
  const { 
    endpoint, 
    loading,
    handleTabChange,
    key
  
  } = EndpointController();

  const {
    resource,
  } = ResourceController();

  console.log("resource", resource)
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
          onTabClick={(e) => handleTabChange(e)}
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