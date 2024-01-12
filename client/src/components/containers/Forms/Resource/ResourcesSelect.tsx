import React from 'react';
import { Select } from 'antd'
import { IResourceSelectProps } from 'types/forms';

const ResourcesSelect : React.FC<IResourceSelectProps>= (props) => {
  const { resourceOptions, handleFormChange} = props;
  return (
    <Select 
      className='mockify-select'
      placeholder="Select a resource"
      onChange={handleFormChange}
      >
        {resourceOptions?.map((reso : any, index : number) => {
          return (
            <Select.Option key={index} value={reso._id}>{reso.resourceName}</Select.Option>
          )
        })}
    </Select>
  )
}

export default ResourcesSelect;