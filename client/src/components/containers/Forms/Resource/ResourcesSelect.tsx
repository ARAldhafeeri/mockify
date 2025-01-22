import React from 'react';
import { IResourceSelectProps } from 'types/forms';
import MockifySelect from 'components/commons/Select/Select';

export const normlizeOptions = (items : any) => {
  return items.map((item : any) => {
    return {
      value: item._id,
      label: item.name
    }
  })
}

const ResourcesSelect : React.FC<IResourceSelectProps>= (props) => {
  const { resourceOptions, handleFormChange} = props;
    
  return (
    <MockifySelect
      label='resources'
      options={normlizeOptions(resourceOptions)}
      onChange={handleFormChange}
      />
  )
}


export default ResourcesSelect;