import React from "react";

const LoggedInLayoutController = () => {

  
  const [collapsed, setCollapsed] = React.useState(false as boolean);
  const [current, setCurrent] = React.useState('user' as string);

  const handleClick = (e: any) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return {
    collapsed,
    setCollapsed,
    current,
    setCurrent,
    handleClick
  };
}

export default LoggedInLayoutController;