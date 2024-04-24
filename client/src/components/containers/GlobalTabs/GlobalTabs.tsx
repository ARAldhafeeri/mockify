import React from "react"; 
import ResourceService from "services/Resource";
import MockifyButton from "components/commons/Button/Button";
import MockifyLoader from "components/commons/Loader/MockifyLoader";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import ProjectService from "services/Project";
import { GlobalTabsProps } from "types/GlobalTabs";
import { ConditionalProp } from "utils";
import MockifyInput from "components/commons/Input/Input";

const  GlobalTabs : React.FC<GlobalTabsProps> = ({content, createBtn, withCreateBtn, key, handleTabChange})  => {
  const {
    projects,
    keyword,
    handleFilterProjectTabsBasedOnKeyWord
  }   = ProjectService();

  return <Tabs
          defaultActiveKey={`${key}`}
          tabPosition="top"
          onTabClick={(e) => handleTabChange(e, projects)}
          {...ConditionalProp(
            withCreateBtn,
            {
              tabBarExtraContent : 
              {
                right : createBtn, 
                left: <MockifyInput placeholder='Search Projects' value={keyword} type='text' classes={['input']} name="Search" label="Search Projects" onChange={handleFilterProjectTabsBasedOnKeyWord} />
              } 
            } 
            ) 
          }
          {...ConditionalProp(
            !withCreateBtn,
            {
              tabBarExtraContent : 
              {
                left: <MockifyInput placeholder='Search Projects' value={keyword} type='text' classes={['input']} name="Search" label="Search Projects" onChange={handleFilterProjectTabsBasedOnKeyWord} />
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
}

export default React.memo(GlobalTabs);
