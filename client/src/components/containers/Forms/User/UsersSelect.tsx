import React from 'react';
import { Select } from 'antd'
import { IUsersSelectProps } from 'types/forms';

const UsersSelect : React.FC<IUsersSelectProps>= (props) => {
  const { userOptions, handleFormChange} = props;
  return (
    <Select 
      className='mockify-select'
      placeholder="Select a user"
      onChange={handleFormChange}
      >
        {userOptions?.map((user : any, index : number) => {
          return (
            <Select.Option key={index} value={user._id}>{user.username}</Select.Option>
          )
        })}
    </Select>
  )
}

export default UsersSelect;