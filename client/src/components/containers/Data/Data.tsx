import React from "react"; 
import MockifyTable from "../../commons/Table/Table";
import DataController from "controllers/Data";
import ColumnsWithActions from "../../presentational/Data/DataData";
import MockifyLoader from "components/commons/Loader/MockifyLoader";
import ResourceController from "controllers/Resource";
import { Tabs } from "antd";
import { IFetchedResourceData } from "types/Resource";

const Data : React.FC = () => {

  const {
    resource,
  } = ResourceController();

  const { 
    data, 
    loading,
    handleTabChange,
    key
  
  } = DataController();
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
            onTabClick={(e) => handleTabChange(e, resource[key]?.resourceName)}
            items={resource.map((resource : any, index : number) => {
              return {
                label: `${resource.resourceName}`,
                key: `${index}`,
                disabled: false,
                children: (
                  <MockifyTable 
                    columns={ColumnsWithActions(data)} 
                    data={data} 
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

export default Data;