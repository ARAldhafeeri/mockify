import React from 'react';
import { Select } from 'antd'
import { IEdgeSelectProps } from 'types/forms';

const EdgesSelect : React.FC<IEdgeSelectProps>= (props) => {
  const { edgeOptions, handleFormChange} = props;
  return (
    <Select 
      className='mockify-select'
      placeholder="Select a edge"
      onChange={handleFormChange}
      >
        {edgeOptions?.map((edge : any, index : number) => {
          return (
            <Select.Option key={index} value={edge.name}>{edge.name}</Select.Option>
          )
        })}
    </Select>
  )
}

export default EdgesSelect;