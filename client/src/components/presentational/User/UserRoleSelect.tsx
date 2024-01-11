import { Select } from 'antd'
import { IUserRoleSelect } from 'types/User'

export default function UserRoleSelect(props : IUserRoleSelect) {
  const { handleFormChangeSelect, role } = props
  return (
    <Select 
      defaultValue={role}
      placeholder="Select a role"
      onChange={(e) => handleFormChangeSelect(e)}
      >
      <Select.Option key={0} value="user">user</Select.Option>
      <Select.Option key={1} value="admin">admin</Select.Option>
    </Select>
  )
}
