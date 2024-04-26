import React from "react";

const LoggedInLayoutService = () => {

  
  const [collapsed, setCollapsed] = React.useState(false as boolean);
  const [current, setCurrent] = React.useState('dashbaord' as string);

  const handleClick = (e: any) => {
    console.log(e);
    setCurrent(e);
  };

  return {
    collapsed,
    setCollapsed,
    current,
    setCurrent,
    handleClick
  };
}

export default LoggedInLayoutService;
