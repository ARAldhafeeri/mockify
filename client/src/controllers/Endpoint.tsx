import React from "react";
import { fetchEndpoints } from "redux/features/endpoint/endpointThunk";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { ToastifyMockify } from "utils";
import ResourceController from "./Resource";
const EndpointController = () => {
  const {resource } = ResourceController();
  const { endpoint, loading } = useAppSelector((state) => state.endpoint);
  const [ selectedResource, setSelectedResource  ] = React.useState<any>(resource[0]);

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