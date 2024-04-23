import React from 'react';
import { Select } from 'antd'
import { IProjectSelectProps } from 'types/forms';

const ProjectsSelect : React.FC<IProjectSelectProps>= (props) => {
  const { projectOptions, handleFormChangeSelect} = props;
  return (
    <Select 
      className='mockify-select'
      placeholder="Select a Project"
      onChange={handleFormChangeSelect}
      >
        {projectOptions?.map((project : any, index : number) => {
          return (
            <Select.Option key={index} value={project._id}>{project.name}</Select.Option>
          )
        })}
    </Select>
  )
}

export default ProjectsSelect;