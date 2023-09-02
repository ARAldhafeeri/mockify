import React from "react";
import { IFetchedUserData } from "types/User";
import { toast } from "react-toastify";
import { fetchUsers } from "redux/features/user/userThunk";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { ToastifyMockify } from "utils";

const UserController = () => {
  const { user, loading } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  React.useEffect(() =>{
    const dispatched = dispatch(fetchUsers());
    ToastifyMockify(dispatched);
  }, [])
  return {
    user, loading
  }
}

export default UserController;