import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import CodeEditorTypes from './CodeEditor.types';
import LightTheme from './Theme';
const MockifyCodeEditor: React.FC<CodeEditorTypes> = (props: CodeEditorTypes) => {
  
  const {onChange, height, width, value} = props;

  return (

    <CodeMirror
      value={value}
      height={height}
      width= {width}
      theme={LightTheme}
      extensions={[javascript({ jsx: true })]}
      onChange={onChange}
    />

  );

}

export default MockifyCodeEditor;