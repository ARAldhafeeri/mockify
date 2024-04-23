import React from "react";
import { IFetchedProjectData } from "types/Project";
import { fetchProjects, deleteProject, updateProject, createProject } from "redux/features/project/projectThunk";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { ToastifyMockify } from "utils";
import { Form } from "antd";
const ProjectService = () => {
  let { project, loading } = useAppSelector((state) => state.project);
  const [ keyword, setKeyword ] = React.useState<string>("");
  let [projects, setProjects] = React.useState<IFetchedProjectData[]>(project);
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

  const handleFilterProjectTabsBasedOnKeyWord = (e : any) => {
    e.preventDefault();
    console.log( typeof e.target.value);
    setKeyword(e.target.value);
    if (!e.target.value ) {
      setProjects(project);
      setKeyword("");
    } else {
      const filteredProjects = projects.filter((project) => project.name.includes(keyword));
      setProjects(filteredProjects);
    
    }
  }
  
  React.useEffect(() =>{
    const dispatched = dispatch(fetchProjects());
    ToastifyMockify(dispatched);
    setShowEditModal(false);
  }, [dispatch, keyword])

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
    handleFormChangeSelect,
    // filter tabs
    handleFilterProjectTabsBasedOnKeyWord,
    keyword,
    projects

  }
}

export default ProjectService;