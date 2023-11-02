import React from "react";
import { IFetchedResourceData } from "types/Resource";
import { fetchResources, deleteResource, updateResource, createResource } from "redux/features/resource/resourceThunk";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { ToastifyMockify } from "utils";
import { Form } from "antd";
const ResourceController = () => {
  const { resource, loading } = useAppSelector((state) => state.resource);

  const  [ showDeleteModal, setShowDeleteModal ] = React.useState<boolean>(false);
  const [ showEditModal, setShowEditModal ] = React.useState<boolean>(false);
  const [ showCreateModal, setShowCreateModal ] = React.useState<boolean>(false);
  const [selectedResource, setSelectedResource ] = React.useState<IFetchedResourceData>({
    "project": "string",
    "resourceName": "SampleResource",
    "endpoint": "/api/sample",
    "features": {
      "filter": true,
      "pagination": true,
      "search": true,
      "validation": true,
      "webhook": true,
      "sse": false,
      "wss": true,
      "getx": true,
      "postx": true,
      "putx": true,
      "deletex": true,
      "consumer": true,
      "producer": true,
    },
    "funcs": [
    ]
  });
  const dispatch = useAppDispatch();

  // antd form 
  const [form] = Form.useForm();

  console.log(selectedResource)
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
      console.log(selectedResource)
      dispatched = dispatch(updateResource(selectedResource))
    } else {
      delete selectedResource._id;
      dispatched = dispatch(createResource(selectedResource))
    }

    ToastifyMockify(dispatched);
  }

  const handleAddFunction = ( value: string) => {
    setSelectedResource({
      ...selectedResource,
      funcs: [...selectedResource.funcs, value]
    });
  }

  const handleRemoveFunction = (index: number) => {
    setSelectedResource({
      ...selectedResource,
      funcs: selectedResource.funcs.filter((_, i) => i !== index)
    });
  }

  const handleFormChange = (e : any, name : any=null) => {
    // if name is passed it's for switch e -> is boolean value, name is the 
    // if e is string it's for code editor, e is value, name is the index
    if (name && typeof e === "boolean") {
      setSelectedResource({
        ...selectedResource,
        [name]: e
      })
    } else if (typeof e === "string") {
      setSelectedResource({
        ...selectedResource,
        funcs: selectedResource.funcs.map((func, i) => i === name ? e : func)
      
      })
    }
    else {
      setSelectedResource({
        ...selectedResource,
        [e.target.name]: e.target.value
      })
    }
  };

  // create events
  const handleShowCreateResourceModal = () => {
    setShowCreateModal(true);
  }

  const handleHideCreateResourceModal = () => {
    setShowCreateModal(false);
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
    handleFormChange,
    // create event
    showCreateModal, 
    handleShowCreateResourceModal,
    handleHideCreateResourceModal,
    form,
    // funcs
    handleAddFunction,
    handleRemoveFunction

  }
}

export default ResourceController;