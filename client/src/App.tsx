import React from 'react';
import './App.scss';
import MockifyCodeEditor from './components/commons/CodeEditor/CodeEditor';

const  App : React.FC = () => {
  const onChange = React.useCallback((value: any, viewUpdate: any) => {
    console.log('value:', value);
  }, []);
  return (
      <>
       <MockifyCodeEditor value="console.log(1)" onChange={onChange} height='400px' width='400px' />
      </>
  );
}

export default App;
