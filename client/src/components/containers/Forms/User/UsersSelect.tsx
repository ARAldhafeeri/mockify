import React from 'react';
import { IUsersSelectProps } from 'types/forms';
import MockifySelect from 'components/commons/Select/Select';
import { normlizeSelectOptions } from 'utils';

const UsersSelect : React.FC<IUsersSelectProps>= (props) => {
  const { userOptions, handleFormChange} = props;  return (
    <MockifySelect
      label='users'
      options={normlizeSelectOptions(userOptions, "_id", "username")}
      onChange={handleFormChange}
      />
  )
}

export default UsersSelect;