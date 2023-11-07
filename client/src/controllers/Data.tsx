import React from "react";
import { IFetchDataResponse } from "types/Data";
import { fetchData } from "redux/features/data/dataThunk";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { ToastifyMockify } from "utils";
import { IFetchedResourceData } from "types/Resource";

const DataController = () => {
  const { data, loading } = useAppSelector((state) => state.data);

  const dispatch = useAppDispatch();
  const [ key, setKey ] = React.useState<number>(0);
  const [ resource, setResource ] = React.useState<string>("test");

  React.useEffect(() =>{
    const dispatched = dispatch(fetchData(resource));
    ToastifyMockify(dispatched);
  }, [dispatch, key])

  const handleTabChange = (key : string, resource : string ) => {
    setKey(parseInt(key));
    setResource(resource);
  }
  return {
    // globals
    data, 
    loading,
    handleTabChange,
    key
  }
}

export default DataController;