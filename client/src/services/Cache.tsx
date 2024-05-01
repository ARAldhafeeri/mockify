import React from "react";
import { IFetchedCacheData } from "types/Cache";
import { fetchCaches, deleteCache, createCache } from "redux/features/cache/cacheThunk";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { ToastifyMockify } from "utils";
import { Form } from "antd";
import ProjectService from "./Project";
import { IFetchedProjectData } from "types/Project";
const CacheService = () => {
  const { project } = ProjectService();
  const { cache, loading } = useAppSelector((state) => state.cache);
  const  [ showDeleteModal, setShowDeleteModal ] = React.useState<boolean>(false);
  const [ showEditModal, setShowEditModal ] = React.useState<boolean>(false);
  const [ showCreateModal, setShowCreateModal ] = React.useState<boolean>(false);
  const [selectedCache, setSelectedCache ] = React.useState<IFetchedCacheData>({
    key: "",
    value: "",
  });
  const [ key, setKey ] = React.useState<number>(0);
  const [ selectedProject, setSelectedProject ] = React.useState<IFetchedProjectData>(project[0]);

  const dispatch = useAppDispatch();

  // antd form 
  const [form] = Form.useForm();

  // delete cache event
  const handleDeleteCache = (id : string) => {
    const data = { projectName : selectedProject?.name, key: selectedCache.key}
    ToastifyMockify(
      dispatch(
        deleteCache(data)
        )
    );
    setShowDeleteModal(false);
  }

  const handleShowDeleteModal = (record : IFetchedCacheData) => {
    setSelectedCache(record);
    setShowDeleteModal(true);
  }

  const handleHideDeleteModal = () => {
    setShowDeleteModal(false);
  }

  // update cache event
  const handleShowEditModal = (record: IFetchedCacheData) => {
    setSelectedCache(record);
    setShowEditModal(true);
  }

  const handleHideEditModal = () => {
    setShowEditModal(false);
  }

  const handleSubmitCacheForm = (e : any) => {
    e.preventDefault();
    let dispatched;
    const data = {record : selectedCache, key : selectedCache.key, projectName : selectedProject?._id ?? ""}
    if (showEditModal) {
      dispatched = dispatch(createCache(data))
    } else {
      dispatched = dispatch(createCache(data))
    }

    ToastifyMockify(dispatched);
  }

  const handleFormChange = (e : any) => {
    setSelectedCache({
      ...selectedCache,
      [e.target.name]: e.target.value
    })
  };

  // create events
  const handleShowCreateCacheModal = () => {
    setShowCreateModal(true);
  }

  const handleHideCreateCacheModal = () => {
    setShowCreateModal(false);
  }
  
  React.useEffect(() =>{
    const data = { projectName : selectedProject?._id ?? "" }
    const dispatched = dispatch(fetchCaches(data));
    ToastifyMockify(dispatched);
    setShowEditModal(false);
  }, [dispatch,  key])

  // tabs 
  const handleTabChange = (key : string, projects : IFetchedProjectData[]) => {
    setKey(parseInt(key))
    setSelectedProject(projects[parseInt(key)]);
    console.log(selectedProject)

  }
  

  return {
    // globals
    cache, 
    loading,
    selectedCache, 
    setSelectedCache,
    // delete event
    handleDeleteCache,
    showDeleteModal,
    handleShowDeleteModal,
    handleHideDeleteModal,
    // update event
    showEditModal,
    handleShowEditModal,
    handleHideEditModal,
    handleSubmitCacheForm,
    handleFormChange,
    // create event
    showCreateModal, 
    handleShowCreateCacheModal,
    handleHideCreateCacheModal,
    form,
    key,
    handleTabChange

  }
}

export default CacheService;