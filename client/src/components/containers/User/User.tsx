import React from "react"; 
import UserController from "controllers/User";
import MockifyButton from "components/commons/Button/Button";
import MockifyLoader from "components/commons/Loader/MockifyLoader";
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import MockifyModal from "components/commons/Modal/Modal";
import { IFetchedUserData } from "types/User";
import UserForm from "../Forms/User/UserForm";
import UserCards from "components/presentational/User/UserCards";

const User : React.FC = () => {
  const { 
    user, 
    loading, 
    handleDeleteUser,
    // delete
    showDeleteModal, 
    handleShowDeleteModal,
    selectedUser, 
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
      classes: ['table-action-primary', 'textAndIcon'],
      text: 'Edit',
      onclick: (record : IFetchedUserData) => handleShowEditModal(record) 
    }, 
    {
      icon:<DeleteOutlined />,
      text: 'Delete',
      classes: ['table-action-secondary','textAndIcon'],
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
            onClick={handleShowCreateUserModal}
            classes={['table-action-third', 'textAndIcon']}
            text="Create user"
            icon={<PlusCircleOutlined size={30} />}
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
            <UserCards data={user} actions={actions}/>
        </>
      )
    }
    </>
  )

}

export default User;