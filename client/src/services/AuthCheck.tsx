import React from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { checkForExpiredToken } from 'utils/auth';
import { setCurrentUser } from 'redux/features/auth/authThunk';

const AuthCheckService = () => {
    const { auth } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    
    // check for expired token on first render
    React.useEffect(() => {
      const token = checkForExpiredToken();
      if (token) {
        dispatch(setCurrentUser(token));
      } else {
        dispatch(setCurrentUser(null));
      }
    }, [dispatch]);
  
    return {
        auth
    }
}

export default AuthCheckService;