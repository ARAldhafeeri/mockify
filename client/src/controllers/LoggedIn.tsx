import React from "react";

const LoggedInLayoutController = () => {

  
  const [collapsed, setCollapsed] = React.useState(false as boolean);
  const [current, setCurrent] = React.useState('dashbaord' as string);

  const handleClick = (e: any) => {
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
