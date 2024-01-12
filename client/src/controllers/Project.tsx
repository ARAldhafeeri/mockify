import React from "react";
import { IFetchedProjectData } from "types/Project";
import { fetchProjects, deleteProject, updateProject, createProject } from "redux/features/project/projectThunk";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { ToastifyMockify } from "utils";
import { Form } from "antd";
const ProjectController = () => {
  const { project, loading } = useAppSelector((state) => state.project);

  const  [ showDeleteModal, setShowDeleteModal ] = React.useState<boolean>(false);
  const [ showEditModal, setShowEditModal ] = React.useState<boolean>(false);
  const [ showCreateModal, setShowCreateModal ] = React.useState<boolean>(false);
  const [selectedProject, setSelectedProject ] = React.useState<IFetchedProjectData>({
    name: "",
    _id: "",
    apiKey: "", 
    user: "",
  });
  const dispatch = useAppDispatch();

  // antd form 
  const [form] = Form.useForm();

  // delete project event
  const handleDeleteProject = (id : string) => {
    ToastifyMockify(
      dispatch(
        deleteProject(id)
        )
    );
    setShowDeleteModal(false);
  }

  const handleShowDeleteModal = (record : IFetchedProjectData) => {
    setSelectedProject(record);
    setShowDeleteModal(true);
  }

  const handleHideDeleteModal = () => {
    setShowDeleteModal(false);
  }

  // update project event
  const handleShowEditModal = (record: IFetchedProjectData) => {
    setSelectedProject(record);
    setShowEditModal(true);
  }

  const handleHideEditModal = () => {
    setShowEditModal(false);
  }

  const handleSubmitProjectForm = (e : any) => {
    e.preventDefault();
    let dispatched;
    if (showEditModal) {
      delete selectedProject.apiKey;
      dispatched = dispatch(updateProject(selectedProject))
    } else {
      delete selectedProject._id;
      dispatched = dispatch(createProject(selectedProject))
    }

    ToastifyMockify(dispatched);
  }

  const handleFormChange = (e : any) => {
    setSelectedProject({
      ...selectedProject,
      [e.target.name]: e.target.value
    })
  };

  const handleFormChangeSelect = (value : string) => {
    setSelectedProject({
      ...selectedProject,
      user: value
    })
  }

  // create events
  const handleShowCreateProjectModal = () => {
    setShowCreateModal(true);
  }

  const handleHideCreateProjectModal = () => {
    setShowCreateModal(false);
  }
  
  React.useEffect(() =>{
    const dispatched = dispatch(fetchProjects());
    ToastifyMockify(dispatched);
    setShowEditModal(false);
  }, [dispatch])

  return {
    // globals
    project, 
    loading,
    selectedProject, 
    setSelectedProject,
    // delete event
    handleDeleteProject,
    showDeleteModal,
    handleShowDeleteModal,
    handleHideDeleteModal,
    // update event
    showEditModal,
    handleShowEditModal,
    handleHideEditModal,
    handleSubmitProjectForm,
    handleFormChange,
    // create event
    showCreateModal, 
    handleShowCreateProjectModal,
    handleHideCreateProjectModal,
    form,
    handleFormChangeSelect

  }
}

export default ProjectController;