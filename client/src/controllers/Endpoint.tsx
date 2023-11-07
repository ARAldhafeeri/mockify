import React from "react";
import { IFetchedEndpointData } from "types/Endpoint";
import { fetchEndpoints } from "redux/features/endpoint/endpointThunk";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { ToastifyMockify } from "utils";
import { Form } from "antd";
import { IFetchResourceResponse, IFetchedResourceData } from "types/Resource";
const EndpointController = () => {
  const { endpoint, loading } = useAppSelector((state) => state.endpoint);
  const { resource } = useAppSelector((state) => state.resource);
  const dispatch = useAppDispatch();
  const [ key, setKey ] = React.useState<number>(0);

  React.useEffect(() =>{
    let res = resource[key];
    
    const dispatched = dispatch(fetchEndpoints(res));
    ToastifyMockify(dispatched);
  }, [dispatch, key])

  const handleTabChange = (key : string) => {
    setKey(parseInt(key));
    console.log(key, resource[parseInt(key)])
  }
  return {
    // globals
    endpoint, 
    loading,
    handleTabChange,
    key
  }
}

export default EndpointController;