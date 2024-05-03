import React from "react"; 
import MockifyTable from "../../commons/Table/Table";
import EndpointService from "services/Endpoint";
import ColumnsWithActions from "../../presentational/Endpoint/EndpointData";
import MockifyLoader from "components/commons/Loader/MockifyLoader";
import GlobalTabsProjects from "../GlobalTabs/GlobalTabsProjects";
import GlobalTabsResource from "../GlobalTabs/GlobalTabsResource";
const Endpoint : React.FC = () => {

  const { 
    endpoint, 
    loading,
    handleTabChange,
    handleResourceTabChange,
    key,
  
  } = EndpointService();

  return (
    <GlobalTabsProjects
        handleTabChange={handleResourceTabChange}
        tabKey={0}
        content={
          <GlobalTabsResource
            handleTabChange={handleTabChange}
            tabKey={key}
            withCreateBtn={false}
            content={
               <>
                {loading ? <MockifyLoader /> : (
                  <MockifyTable 
                    columns={ColumnsWithActions([])} 
                    data={endpoint} 
                    classes={["mockify-table"]} />
                )}
               </>
            }
        />
        } 
        withCreateBtn={false} 
    />
  )

}

export default Endpoint;