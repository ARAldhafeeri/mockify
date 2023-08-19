// DropDown.tsx
import React from 'react';
import MockifyDropDownProps from './DropDown.types';
import { Dropdown, Space, Button  } from 'antd';
import { addtionalClasses } from '../../../utils';

const MockifyDropDown: React.FC<MockifyDropDownProps> = ({ items, classes, menuBtnText, menuBtnClasses }) => {
  return (
    <Space direction="vertical">
      <Space wrap>
        <Dropdown 
          menu={{items}} 
          className={addtionalClasses({classes: classes})}
          arrow={{ pointAtCenter: true }}  
        >
          <Button className={addtionalClasses({classes: menuBtnClasses})}>{menuBtnText}</Button>
        </Dropdown>
      </Space>
    </Space>
  );
};

export default MockifyDropDown;


/**
 * // sample usage 
 * import React from 'react';
import './App.scss';
import MockifyDropDown from './components/commons/DropDown/DropDown';
import type { MenuProps } from 'antd';

const items: MenuProps["items"] =  [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item
      </a>
    ),
  },
];

const  App : React.FC = () => {
  return (
    <MockifyDropDown 
      classes={["mockify-drop-down"]}
      items={items}
      menuBtnClasses={["mockify-drop-down__btn"]}
      menuBtnText="Click me"
      />
  );
}

export default App;

 */