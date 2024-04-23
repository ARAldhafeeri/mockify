import React from "react";
import { fetchEndpoints } from "redux/features/endpoint/endpointThunk";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { ToastifyMockify } from "utils";
import ResourceService from "./Resource";
const EndpointService = () => {
  const {
    resource, 
    handleResourceTabChange,
  } = ResourceService();
  const { endpoint, loading } = useAppSelector((state) => state.endpoint);
  const dispatch = useAppDispatch();
  const [ key, setKey ] = React.useState<number>(0);

  React.useEffect(() =>{
    
  const dispatched = dispatch(fetchEndpoints(resource[key]));
    ToastifyMockify(dispatched);
  }, [dispatch, key])

  const handleTabChange = (key : string, resource : any) => {
    setKey(parseInt(key));
  }

  return {
    // globals
    endpoint, 
    loading,
    handleTabChange,
    key,
    resource,
    handleResourceTabChange,
  }
}

export default EndpointService;