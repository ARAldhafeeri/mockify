import React from 'react';
import { IEdgeSelectProps } from 'types/forms';

import MockifySelect from 'components/commons/Select/Select';
import { normlizeSelectOptions } from 'utils';


const EdgesSelect : React.FC<IEdgeSelectProps>= (props) => {
  const { edgeOptions, handleFormChange} = props;
    
  return (
    <MockifySelect
      label='edges'
      options={normlizeSelectOptions(edgeOptions, "_id", "name")}
      onChange={handleFormChange}
      />
  )
}


export default EdgesSelect;