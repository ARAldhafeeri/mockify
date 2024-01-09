import React from "react";
import { IFetchedResourceData } from "types/Resource";
import { fetchResources, deleteResource, updateResource, createResource } from "redux/features/resource/resourceThunk";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { ToastifyMockify } from "utils";
import { Form } from "antd";
import { IFetchedProjectData } from "types/Project";
import ProjectController from "./Project";
const ResourceController = () => {
  const { project } = ProjectController();
  const { resource, loading } = useAppSelector((state) => state.resource);
  const [ key, setKey ] = React.useState<number>(0);
  const [ projectT, setProject ] = React.useState<IFetchedProjectData>(project[0]);
  const  [ showDeleteModal, setShowDeleteModal ] = React.useState<boolean>(false);
  const [ showEditModal, setShowEditModal ] = React.useState<boolean>(false);
  const [ showCreateModal, setShowCreateModal ] = React.useState<boolean>(false);
  const [currentStep, setCurrentStep] = React.useState<number>(0);
  const [selectedResource, setSelectedResource ] = React.useState<any>(resource[0]);
  const dispatch = useAppDispatch();

  const prevStep = () => {
    setCurrentStep( currentStep -1);
  }

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  }

  const handleTabChange = (key : string, projects : IFetchedProjectData[]) => {
    setKey(parseInt(key))
    setProject(projects[parseInt(key)]);
  }

  // antd form 
  const [form] = Form.useForm();

  // delete resource event
  const handleDeleteResource = (id : string) => {
    ToastifyMockify(
      dispatch(
        deleteResource(id)
        )
    );
    setShowDeleteModal(false);
  }

  const handleShowDeleteModal = (record : IFetchedResourceData) => {
    setSelectedResource(record);
    setShowDeleteModal(true);
  }

  const handleHideDeleteModal = () => {
    setShowDeleteModal(false);
  }

  // update resource event
  const handleShowEditModal = (record: IFetchedResourceData) => {
    // reset current step
    setCurrentStep(0);
    setSelectedResource(record);
    setShowEditModal(true);
  }

  const handleHideEditModal = () => {
    setShowEditModal(false);
  }

  const handleSubmitResourceForm = (e : any) => {
    e.preventDefault();
    let dispatched;
    if (showEditModal) {
      dispatched = dispatch(updateResource(selectedResource))
    } else {
      delete selectedResource._id;
      dispatched = dispatch(createResource(selectedResource))
    }

    ToastifyMockify(dispatched);
  }

  // handle add or remove field
  const handleAddField = (name: string, type: string, required: boolean) => {
    setSelectedResource({
      ...selectedResource,
      fields: [...selectedResource.fields, {name: name, type: type, required: required}]
    });
  }

  const handleRemoveField = (index: number) => {
    setSelectedResource({
      ...selectedResource,
      fields: selectedResource.fields.filter((_ : any, i : number) => i !== index)
    });
  }

  const handleFormChangeFeatures = (e : any, name : any=null) => {
    setSelectedResource({
      ...selectedResource,
      features: {
        ...selectedResource.features,
        [name]: e
      }
    })
  }

  const handleFormChangeFields = (index : number, name : string, value: string | boolean | number) => {
    setSelectedResource({
      ...selectedResource,
      fields: selectedResource.fields.map((field : object, i : number) => i === index ? {...field, [name]: value} : field)
    })
  }

  const handleFormChange = (e : any, name : any=null) => {
      if(typeof e === "string") {
        setSelectedResource({
          ...selectedResource,
          [name]: e
        })
      } else {
        setSelectedResource({
          ...selectedResource,
          [e.target.name]: e.target.value
        })
      }
  };

  // create events
  const handleShowCreateResourceModal = () => {
    // reset current step
    setCurrentStep(0);
    setShowCreateModal(true);
  }

  const handleHideCreateResourceModal = () => {
    setShowCreateModal(false);
  }

  const filterResourceBasedOnProjectId = (resource : IFetchedResourceData[]) => {
    return resource.filter((res : IFetchedResourceData) => res.project === projectT._id);
  }

  

  React.useEffect(() =>{
    const dispatched = dispatch(fetchResources());
    ToastifyMockify(dispatched);
    setShowEditModal(false);
  }, [dispatch])

  return {
    // globals
    resource, 
    loading,
    selectedResource, 
    setSelectedResource,

    // delete event
    handleDeleteResource,
    showDeleteModal,
    handleShowDeleteModal,
    handleHideDeleteModal,

    // update event
    showEditModal,
    handleShowEditModal,
    handleHideEditModal,
    handleSubmitResourceForm,
    
    // form change 
    handleFormChange,
    handleFormChangeFeatures,
    handleFormChangeFields,

    // create event
    showCreateModal, 
    handleShowCreateResourceModal,
    handleHideCreateResourceModal,
    form,
    
    // fields
    handleAddField,
    handleRemoveField,

    // tabs 
    handleTabChange,
    key,

    // filter 
    filterResourceBasedOnProjectId,

    // steps
    currentStep,
    nextStep,
    prevStep


  }
}

export default ResourceController;