import React, { useState } from "react";
import { IFetchedEndpointData } from "types/Endpoint";
import { fetchEndpoints } from "redux/features/endpoint/endpointThunk";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { ToastifyMockify } from "utils";
import { Form } from "antd";
import { IFetchResourceResponse, IFetchedResourceData } from "types/Resource";
const EndpointController = () => {
  const { endpoint, loading } = useAppSelector((state) => state.endpoint);
  const { resource } = useAppSelector((state) => state.resource);
  const [ selectedResource, setSelectedResource  ] = React.useState<any>({});

  const dispatch = useAppDispatch();
  const [ key, setKey ] = React.useState<number>(0);

  React.useEffect(() =>{
    
    const dispatched = dispatch(fetchEndpoints(selectedResource));
    ToastifyMockify(dispatched);
  }, [dispatch, key])

  const handleTabChange = (key : string, resource : any) => {
    setKey(parseInt(key));
    setSelectedResource(resource[key]);
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