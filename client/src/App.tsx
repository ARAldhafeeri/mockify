import React from 'react';
import './App.scss';
import UserList from './components/UserList';
import MockifyButton from './components/commons/Button/Button';
const  App : React.FC = () => {
  return (
      <>
        <MockifyButton classes={['mockify-btn']} text="Mockify" />
      </>
  );
}

export default App;
