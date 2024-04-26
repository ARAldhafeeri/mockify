import { Select } from 'antd'
import MockifySelect from 'components/commons/Select/Select'
import { IUserRoleSelect } from 'types/User'

export default function UserRoleSelect(props : IUserRoleSelect) {
  const { handleFormChangeSelect, role } = props
  return (
    <MockifySelect 
      label='roles'
      options={[
        { value: 'admin', label: 'admin' },
        { value: 'user', label: 'user' },
      ]}
      onChange={handleFormChangeSelect}
    />
  )
}
