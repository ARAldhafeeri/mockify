import React from "react";
import { IFetchDataResponse } from "types/Data";
import { createData, deleteData, fetchData, updateData } from "redux/features/data/dataThunk";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { ToastifyMockify } from "utils";
import { IFetchedDataData } from "types/Data";
import { Form } from "antd";

const DataController = () => {
  const { data, loading } = useAppSelector((state) => state.data);

  const dispatch = useAppDispatch();
  const [ key, setKey ] = React.useState<number>(0);
  const [ resource, setResource ] = React.useState<string>("test");

  
  const  [ showDeleteModal, setShowDeleteModal ] = React.useState<boolean>(false);
  const [ showEditModal, setShowEditModal ] = React.useState<boolean>(false);
  const [ showCreateModal, setShowCreateModal ] = React.useState<boolean>(false);
  const [selectedData, setSelectedData ] = React.useState<IFetchedDataData>({
    _id: '',
    resource: '',
    data: {},
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
        ...selectedData.data,
        [e.target.name]: e.target.value,
      }
     })
    
  };

  // create events
  const handleShowCreateDataModal = () => {
    setShowCreateModal(true);
  }

  const handleHideCreateDataModal = () => {
    setShowCreateModal(false);
  }

  

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
  }
}

export default DataController;