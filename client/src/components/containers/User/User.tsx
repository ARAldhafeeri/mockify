import React from "react"; 
import MockifyTable from "../../commons/Table/Table";
import UserController from "controllers/User";
import MockifyButton from "components/commons/Button/Button";
import ColumnsWithActions from "./presentational/UserData";
import MockifyLoader from "components/commons/Loader/MockifyLoader";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import MockifyModal from "components/commons/Modal/Modal";

const User : React.FC = () => {
  const { 
    user, loading, handleDeleteUser,
    showDeleteModal, handleShowDeleteModal,
    selectedUser, setSelectedUser,
    handleHideDeleteModal
  } = UserController();

  const actions = [
    {
      icon: <EditOutlined />,
      classes: ['table-action-primary'],
      onclick: (record : any) => handleShowDeleteModal(record) 
    }, 
    {
      icon:<DeleteOutlined />,
      classes: ['table-action-secondary'],
      onclick: handleShowDeleteModal
    }
  ]
  return (
    <>
    {
      loading ? <MockifyLoader size="large" /> 
      : (
        <>
          <MockifyButton 
            text="Create new user" 
            classes={['mockify-btn']}
            onClick={() => console.log('create ew user')}
            />
          <MockifyModal 
            show={showDeleteModal}
            title="Delete user"
            onOk={() => handleDeleteUser(selectedUser._id)}
            onCancel={() => handleHideDeleteModal()}
            children={<p>Are you sure delete {selectedUser.username} ?</p>}
            />
          <MockifyTable 
            columns={ColumnsWithActions(actions)} 
            data={user} 
            classes={["mockify-table"]} />
        </>
      )
    }
    </>
  )

}

export default User;