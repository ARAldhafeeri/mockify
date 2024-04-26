import React from 'react';
import { IProjectSelectProps } from 'types/forms';
import MockifySelect from 'components/commons/Select/Select';
import { normlizeSelectOptions } from 'utils';

const ProjectsSelect : React.FC<IProjectSelectProps>= (props) => {
  const { projectOptions, handleFormChangeSelect} = props;
  return (
    <MockifySelect
      label='projects'
      options={normlizeSelectOptions(projectOptions, "_id", "name")}
      onChange={handleFormChangeSelect}
      />
  )
}

export default ProjectsSelect;