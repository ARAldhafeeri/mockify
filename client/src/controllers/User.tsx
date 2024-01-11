import React from "react";
import { IFetchedUserData } from "types/User";
import { fetchUsers, deleteUser, updateUser, createUser } from "redux/features/user/userThunk";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { ToastifyMockify } from "utils";
import { Form } from "antd";
const UserController = () => {
  const { user, loading } = useAppSelector((state) => state.user);

  const  [ showDeleteModal, setShowDeleteModal ] = React.useState<boolean>(false);
  const [ showEditModal, setShowEditModal ] = React.useState<boolean>(false);
  const [ showCreateModal, setShowCreateModal ] = React.useState<boolean>(false);
  const [selectedUser, setSelectedUser ] = React.useState<IFetchedUserData>({
    username: "",
    _id: "",
    role: "", 
    email: "",
  });
  const dispatch = useAppDispatch();

  // antd form 
  const [form] = Form.useForm();

  // delete user event
  const handleDeleteUser = (id : string) => {
    ToastifyMockify(
      dispatch(
        deleteUser(id)
        )
    );
    setShowDeleteModal(false);
  }

  const handleShowDeleteModal = (record : IFetchedUserData) => {
    setSelectedUser(record);
    setShowDeleteModal(true);
  }

  const handleHideDeleteModal = () => {
    setShowDeleteModal(false);
  }

  // update user event
  const handleShowEditModal = (record: IFetchedUserData) => {
    setSelectedUser(record);
    setShowEditModal(true);
  }

  const handleHideEditModal = () => {
    setShowEditModal(false);
  }

  const handleSubmitUserForm = (e : any) => {
    e.preventDefault();
    let dispatched;
    if (showEditModal) {
      dispatched = dispatch(updateUser(selectedUser))
    } else {
      delete selectedUser._id;
      dispatched = dispatch(createUser(selectedUser))
    }

    ToastifyMockify(dispatched);
  }

  const handleFormChange = (e : any) => {
    setSelectedUser({
      ...selectedUser,
      [e.target.name]: e.target.value
    })
  };

  const handleFormChangeSelect = (value : string) => {
    console.log(value);
    setSelectedUser({
      ...selectedUser,
      role: value,
    })
  }

  // create events
  const handleShowCreateUserModal = () => {
    setShowCreateModal(true);
  }

  const handleHideCreateUserModal = () => {
    setShowCreateModal(false);
  }
  

  React.useEffect(() =>{
    const dispatched = dispatch(fetchUsers());
    ToastifyMockify(dispatched);
    setShowEditModal(false);
  }, [dispatch])

  return {
    // globals
    user, 
    loading,
    selectedUser, 
    setSelectedUser,
    // delete event
    handleDeleteUser,
    showDeleteModal,
    handleShowDeleteModal,
    handleHideDeleteModal,
    // update event
    showEditModal,
    handleShowEditModal,
    handleHideEditModal,
    handleSubmitUserForm,
    handleFormChange,
    // create event
    showCreateModal, 
    handleShowCreateUserModal,
    handleHideCreateUserModal,
    form,
    handleFormChangeSelect

  }
}

export default UserController;