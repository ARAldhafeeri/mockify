import React from "react"; 
import MockifyLoader from "components/commons/Loader/MockifyLoader";
import { Tabs } from "antd";
import { GlobalTabsProjectsProps } from "types/GlobalTabs";
import { ConditionalProp } from "utils";
import { useAppSelector } from "redux/hooks";

const  GlobalTabsResource : React.FC<GlobalTabsProjectsProps> = ({content, createBtn, withCreateBtn, tabKey, handleTabChange})  => {
  const { resource, loading } = useAppSelector(state => state.resource);

  return (
    <>
      {loading ? <MockifyLoader /> : (
      <Tabs
        defaultActiveKey={`${0}`}
        tabPosition="left"
        onTabClick={(e) => handleTabChange(e, resource)}
        {...ConditionalProp(
          withCreateBtn,
          {
            tabBarExtraContent : 
            {
              right : createBtn, 
            } 
          } 
          ) 
        }
        
        items={resource.map((res : any, index : number) => {
          return {
            label: `${res?.name}`,
            key: `${index}`,
            disabled: false,
            children: content
          }
      })}/>  
      )}
    </>
  )
}

export default React.memo(GlobalTabsResource);
