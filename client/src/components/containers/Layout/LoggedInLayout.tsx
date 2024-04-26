import React from 'react';
import { Link  } from 'react-router-dom';
import LoggedInLayoutService from 'services/LoggedIn';
import { items } from 'routes';
import 'react-toastify/dist/ReactToastify.css';
import AuthCheckService from 'services/AuthCheck';
import { ROUTES_NAMES } from 'constants/routes';
import { Navigate } from 'react-router';
import { ISiderItem } from 'components/commons/Sider/Sider.types';
import Button from 'components/commons/Button/Button';

interface LoggedInLayoutProps {
  children: React.ReactNode;
}

const LoggedInLayout: React.FC<LoggedInLayoutProps> = (props) => {
 const {
    collapsed, 
    setCollapsed, 
    current, 
    handleClick 
  } = LoggedInLayoutService();

  const { auth } = AuthCheckService()

  if (!auth){
    // currently is normal cookie where token is stored
    // but for security in the near future it's going to be
    // http only cookie
    return <Navigate to={ROUTES_NAMES.ROOT} />
  }

  console.log(current)
 const sideBarCollapsed = collapsed ? 'grid-cols-[50px_auto]' : 'grid-cols-[200px_auto]';
 return (
  <>
    <div className={`h-screen grid ${sideBarCollapsed}`} >
          <ul className="flex flex-col space-y-2 pt-5  px-2 h-full font-medium border dark:bg-dark-bg text-white dark:text-white">
            {items.map((item : ISiderItem, index: number) => (
              <>
                <li key={index} className={current.toString() === index.toString() && !collapsed ? 'bg-light-primary w-[150px] rounded-xl' : (current.toString() === index.toString() && collapsed ? "bg-light-primary w-[30px] rounded-xl" : "")} onClick={() => handleClick(index)}>
                  <Link to={item.to} key={index} className='flex flex-row'>
                    {!collapsed ? (
                    <>
                      {item.icon}
                    <span className='ml-2'>{item.label}</span>
                    </>
                    ) : (
                    <div className='tooltip '>
                    <span>{item.icon}</span>
                    <span className='ml-2 tooltiptext bg-light-primary'>{item.label}</span>
                    </div>
                    )}
                  </Link>
                </li>
                
              </>
          
            ))}
            <div className=' absolute bottom-0'>
              <Button text={collapsed ? '>' : '<'} classes={[""]} onClick={() => setCollapsed(!collapsed)} />
            </div>
        </ul>
      <div className='m-5'>
        {props.children}
      </div>
    </div>
    <footer className='bg-green1 items- text-center text-xl text-white p-5 font-bold'>MOCKIFY.IO ©2023</footer>
  </>
  );
};

export default LoggedInLayout;