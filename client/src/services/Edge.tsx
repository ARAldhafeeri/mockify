import React from "react";
import { IFetchedEdgeData } from "types/Edge";
import { fetchEdge, deleteEdge, updateEdge, createEdge } from "redux/features/edge/edgeThunk";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { ToastifyMockify } from "utils";
import { Form } from "antd";
import { toast } from "react-toastify";
import { IFetchedResourceData } from "types/Resource";
import ResourceService from "./Resource";
const EdgeService = () => {
  const { edge, loading } = useAppSelector((state) => state.edge);
  const { resource } = useAppSelector((state) => state.resource);
  const [ key, setKey ] = React.useState<number>(0);
  const [ currentStep, setCurrentStep ] = React.useState<number>(0);
  const  [ name, setname ] = React.useState<string>(resource[0]?.name ?? "");
  const [resourceId, setResourceId] = React.useState<string>("");
  const  [ showDeleteModal, setShowDeleteModal ] = React.useState<boolean>(false);
  const [ showEditModal, setShowEditModal ] = React.useState<boolean>(false);
  const [ showCreateModal, setShowCreateModal ] = React.useState<boolean>(false);
  const [selectedEdge, setSelectedEdge ] = React.useState<IFetchedEdgeData>({
    code: "",
    resource: "",
    name: "",
    method: "",
  });

  const dispatch = useAppDispatch();

  const handleTabChange = (key : string, resources : IFetchedResourceData[]) => {
    setKey(parseInt(key))
    setname(resources[parseInt(key)]?.name as string);
    setResourceId(resources[parseInt(key)]?._id as string);
  }

  // antd form 
  const [form] = Form.useForm();

  // delete edge event
  const handleDeleteEdge = (id : string) => {
    ToastifyMockify(
      dispatch(
        deleteEdge({id: id, resId: resourceId})
        )
    );
    setShowDeleteModal(false);
  }

  const handleShowDeleteModal = (record : IFetchedEdgeData) => {
    setSelectedEdge(record);
    setShowDeleteModal(true);
  }

  const handleHideDeleteModal = () => {
    setShowDeleteModal(false);
  }

  const resetCreate = () => {
    setSelectedEdge({
      code: "",
      resource: "",
      name: "",
      method: "",
    });
    form.resetFields();
    setCurrentStep(0);
  }

  // update edge event
  const handleShowEditModal = (record: IFetchedEdgeData) => {
    setCurrentStep(0);
    setSelectedEdge(record);
    setShowEditModal(true);
  }

  const handleHideEditModal = () => {
    setShowEditModal(false);
  }

  const handleSubmitEdgeForm = (e : any) => {
    e.preventDefault();
    let dispatched;
    if (showEditModal) {
      dispatched = dispatch(updateEdge({edge: selectedEdge, _id: resourceId}))
    } else {
      delete selectedEdge._id;
      dispatched = dispatch(createEdge({edge : selectedEdge,  _id: resourceId}))
    }

    // invalidate endpoint swagger docs cache
    localStorage.removeItem(name);

    ToastifyMockify(dispatched);
  }


  const handleFormChange = (e : any, type: string, index: number) => {
    switch(type){
      case "code":
        setSelectedEdge({
          ...selectedEdge,
          code: e
        });
        break;
      case "resource":
        setSelectedEdge({
          ...selectedEdge,
          resource: e
        });
        break;
      case "name":
        setSelectedEdge({
          ...selectedEdge,
          name: e.target.value
        });
        break;
      case "method":
        setSelectedEdge({
          ...selectedEdge,
          method: e
        });
        break;
    }
    
  };

  // create events
  const handleShowCreateEdgeModal = () => {
    // after create done 
      resetCreate();
      setCurrentStep(0);
      setShowCreateModal(true);
  }

  const handleHideCreateEdgeModal = () => {
    setShowCreateModal(false);
  }


  React.useEffect(() =>{
    const dispatched = dispatch(fetchEdge(resourceId));
    ToastifyMockify(dispatched);
    setShowEditModal(false);
  }, [dispatch, key])

  // steps
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  }

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  }

  const getEdgeByname = (name : string) => {
   dispatch(fetchEdge(name));
  }



  return {
    // globals
    edge, 
    loading,
    selectedEdge, 
    setSelectedEdge,

    // delete event
    handleDeleteEdge,
    showDeleteModal,
    handleShowDeleteModal,
    handleHideDeleteModal,

    // update event
    showEditModal,
    handleShowEditModal,
    handleHideEditModal,
    handleSubmitEdgeForm,
    
    // form change 
    handleFormChange,

    // create event
    showCreateModal, 
    handleShowCreateEdgeModal,
    handleHideCreateEdgeModal,
    form,
    // tabs 
    handleTabChange,
    key,

    // steps
    currentStep,
    nextStep,
    prevStep,
    getEdgeByname,

  }
}

export default EdgeService;
