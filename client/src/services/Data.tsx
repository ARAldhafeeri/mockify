import React from "react";
import { createData, deleteData, fetchData, updateData } from "redux/features/data/dataThunk";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { ToastifyMockify } from "utils";
import { IFetchedDataData } from "types/Data";
import { Form } from "antd";
import { IFetchResourceResponse, IFetchedResourceData } from "types/Resource";
import ResourceService from "./Resource";

const DataService = () => {
  const { data, loading } = useAppSelector((state) => state.data);
  const { resource } = ResourceService();
  const dispatch = useAppDispatch();
  const [ key, setKey ] = React.useState<number>(0);
  const [ resourceT, setResource ] = React.useState<IFetchedResourceData>(resource[0]);

  
  const  [ showDeleteModal, setShowDeleteModal ] = React.useState<boolean>(false);
  const [ showEditModal, setShowEditModal ] = React.useState<boolean>(false);
  const [ showCreateModal, setShowCreateModal ] = React.useState<boolean>(false);
  const [selectedData, setSelectedData ] = React.useState<any>({
    resource: resourceT?._id,
    data: {}
  });

  // antd form 
  const [form] = Form.useForm();

  // delete resource event
  const handleDeleteData = (id : string) => {
    ToastifyMockify(
      dispatch(
        deleteData(id)
        )
    );
    setShowDeleteModal(false);
  }

  const handleShowDeleteModal = (record : IFetchedDataData) => {
    setSelectedData(record);
    setShowDeleteModal(true);
  }

  const handleHideDeleteModal = () => {
    setShowDeleteModal(false);
  }

  // update resource event
  const handleShowEditModal = (record: IFetchedDataData) => {
    setSelectedData(record);
    setShowEditModal(true);
  }

  const handleHideEditModal = () => {
    setShowEditModal(false);
  }

  const handleSubmitDataForm = (e : any) => {
    e.preventDefault();
    let dispatched;
    if (showEditModal) {
      dispatched = dispatch(updateData(selectedData))
    } else {
      delete selectedData._id;
      dispatched = dispatch(createData(selectedData))
    }

    ToastifyMockify(dispatched);
  }

  const handleFormChange  = (e : any) => {
    setSelectedData({
      ...selectedData,
      data: {
        ...selectedData?.data,
        [e.target.name]: e.target.value,
      }
     })
    
  };


  const hanldeFormChangeFields = (name : string, value : any, type : string) => {
    if(name )
    setSelectedData({
      ...selectedData,
      data: {
        ...selectedData?.data,
        [name]: value,
      }
     })
  } 

  const handleFormChangeSelect = (value : string) => {
    setSelectedData({
      ...selectedData,
      resource: value,
    })
  }

  // create events
  const handleShowCreateDataModal = () => {
    // reset selected data 
    setSelectedData(
      {
        resource: resourceT?._id,
        data: {}
      }
    )
    setShowCreateModal(true);
  }

  const handleHideCreateDataModal = () => {
    setShowCreateModal(false);
  }
  

  React.useEffect(() =>{
    const dispatched = dispatch(fetchData(resourceT?.resourceName));
    ToastifyMockify(dispatched);
  }, [dispatch, key])

  const handleTabChange = (key : string, resource : any ) => {
    setKey(parseInt(key));
    setResource(resource[parseInt(key)]);
  }
  return {
    // globals
    data, 
    loading,
    handleTabChange,
    key,
    selectedData, 
    setSelectedData,

    // delete event
    handleDeleteData,
    showDeleteModal,
    handleShowDeleteModal,
    handleHideDeleteModal,

    // update event
    showEditModal,
    handleShowEditModal,
    handleHideEditModal,
    handleSubmitDataForm,
    
    // form change 
    handleFormChange,

    // create event
    showCreateModal, 
    handleShowCreateDataModal,
    handleHideCreateDataModal,
    form,
    handleFormChangeSelect,
    hanldeFormChangeFields,
  }
}

export default DataService;