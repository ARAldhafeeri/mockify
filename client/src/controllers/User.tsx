import React from "react";
import { IFetchedUserData } from "types/User";
import { toast } from "react-toastify";
import { fetchUsers, deleteUser } from "redux/features/user/userThunk";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { ToastifyMockify } from "utils";

const UserController = () => {
  const { user, loading } = useAppSelector((state) => state.user);

  console.log(user)
  const  [ showDeleteModal, setShowDeleteModal ] = React.useState<boolean>(false);
  const [ showEditModal, setShowEditModal ] = React.useState<boolean>(false);
  const [selectedUser, setSelectedUser ] = React.useState<IFetchedUserData>({
    username: "",
    _id: "",
    role: "", 
    email: "",
  });
  const dispatch = useAppDispatch();

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
    setSelectedUser(selectedUser);
    setShowEditModal(true);
  }

  const handleHideEditModal = () => {
    setShowEditModal(false);
  }

  const handleSubmitUserForm = () => {
    console.log('submit user form')
    // dispatch(updateUser(data))
  }

  const handleFormChange = (e : any) => {
    setSelectedUser({
      ...selectedUser,
      [e.target.name]: e.target.value
    })
  };
  

  React.useEffect(() =>{
    const dispatched = dispatch(fetchUsers());
    ToastifyMockify(dispatched);
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
    handleFormChange

  }
}

export default UserController;