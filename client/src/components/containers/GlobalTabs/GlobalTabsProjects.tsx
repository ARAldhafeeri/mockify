import React from "react"; 
import MockifyLoader from "components/commons/Loader/MockifyLoader";
import { Tabs } from "antd";
import ProjectService from "services/Project";
import { GlobalTabsProjectsProps } from "types/GlobalTabs";
import { ConditionalProp } from "utils";
import MockifyInput from "components/commons/Input/Input";

const  GlobalTabsProjects : React.FC<GlobalTabsProjectsProps> = ({content, createBtn, withCreateBtn, tabKey, handleTabChange})  => {
  const {
    projects,
    loading,
    keyword,
    handleFilterProjectTabsBasedOnKeyWord
  }   = ProjectService();

  return (
    <>
      {loading ? <MockifyLoader /> : (
      <Tabs
        defaultActiveKey={`${0}`}
        tabPosition="top"
        onTabClick={(e) => handleTabChange(e, projects)}
        {...ConditionalProp(
          withCreateBtn,
          {
            tabBarExtraContent : 
            {
              right : createBtn, 
              left: <MockifyInput placeholder='Search Projects' value={keyword} type='text' classes={['input']} name="Search" label="Projects" onChange={handleFilterProjectTabsBasedOnKeyWord} />
            } 
          } 
          ) 
        }
        {...ConditionalProp(
          !withCreateBtn,
          {
            tabBarExtraContent : 
            {
              left: <MockifyInput placeholder='Search Projects' value={keyword} type='text' classes={['input']} name="Search" label="Projects" onChange={handleFilterProjectTabsBasedOnKeyWord} />
            } 
          } 
          ) 
        }
        
        items={projects.map((proj : any, index : number) => {
          return {
            label: `${proj.name}`,
            key: `${index}`,
            disabled: false,
            children: content
          }
      })}/>  
      )}
    </>
  )
}

export default React.memo(GlobalTabsProjects);
