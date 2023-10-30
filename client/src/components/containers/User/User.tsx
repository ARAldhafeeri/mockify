import React from "react"; 
import MockifyTable from "../../commons/Table/Table";
import UserController from "controllers/User";
import MockifyButton from "components/commons/Button/Button";
import ColumnsWithActions from "./presentational/UserData";
import MockifyLoader from "components/commons/Loader/MockifyLoader";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import MockifyModal from "components/commons/Modal/Modal";
import { IFetchedUserData } from "types/User";
import UserForm from "../Forms/User/UserForm";

const User : React.FC = () => {
  const { 
    user, 
    loading, 
    handleDeleteUser,
    // delete
    showDeleteModal, 
    handleShowDeleteModal,
    selectedUser, 
    setSelectedUser,
    handleHideDeleteModal, 
    // update
    handleShowEditModal,
    handleHideEditModal, 
    showEditModal,
    handleFormChange, 
    handleSubmitUserForm,
    showCreateModal, 
    handleShowCreateUserModal,
    handleHideCreateUserModal,
    form
  } = UserController();

  const actions = [
    {
      icon: <EditOutlined />,
      classes: ['table-action-primary'],
      onclick: (record : IFetchedUserData) => handleShowEditModal(record) 
    }, 
    {
      icon:<DeleteOutlined />,
      classes: ['table-action-secondary'],
      onclick: (record: IFetchedUserData) => handleShowDeleteModal(record)
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
            onClick={handleShowCreateUserModal}
            />
          <MockifyModal 
            show={showDeleteModal}
            title="Delete user"
            onOk={() => handleDeleteUser(selectedUser._id || '')}
            onCancel={() => handleHideDeleteModal()}
            children={<p>Are you sure delete {selectedUser.username} ?</p>}
            />
          <MockifyModal
            show={showEditModal}
            title="Update user"
            onOk={ () => handleHideEditModal()}
            onCancel={() => handleHideEditModal()}
            okButtonProps={{ style: { display: 'none' } }}
            cancelButtonProps={{ style: { display: 'none' } }}
            children={
                <UserForm 
                  handleFormChange={handleFormChange} 
                  handleFormSubmit={handleSubmitUserForm}
                  data={selectedUser} 
                  form={form}
                  onFinish={() => handleHideEditModal()}
                  />
              }
            />
          <MockifyModal
            show={showCreateModal}
            title="Create user"
            onOk={ () => handleShowCreateUserModal()}
            onCancel={() => handleHideCreateUserModal()}
            okButtonProps={{ style: { display: 'none' } }}
            cancelButtonProps={{ style: { display: 'none' } }}
            children={
                <UserForm 
                  handleFormChange={handleFormChange} 
                  handleFormSubmit={handleSubmitUserForm}
                  data={selectedUser} 
                  form={form}
                  onFinish={() => handleHideEditModal()}
                  />
              }
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