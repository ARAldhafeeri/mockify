import React from "react";
import { IFetchedEndpointData } from "types/Endpoint";
import { fetchEndpoints } from "redux/features/endpoint/endpointThunk";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { ToastifyMockify } from "utils";
import { Form } from "antd";
const EndpointController = () => {
  const { endpoint, loading } = useAppSelector((state) => state.endpoint);

  const  [ showDrawer, setShowDrawer ] = React.useState<boolean>(false);

  const dispatch = useAppDispatch();

  const hanldeShowDrawer = () => {
    setShowDrawer(true);
  };

  const handleHideDrawer = () => {
    setShowDrawer(false);
  }

  React.useEffect(() =>{
    const dispatched = dispatch(fetchEndpoints());
    ToastifyMockify(dispatched);
  }, [dispatch])

  return {
    // globals
    endpoint, 
    loading,
    // drawer
    handleHideDrawer,
    hanldeShowDrawer,
  }
}

export default EndpointController;