import React from "react"; 
import MockifyTable from "../../commons/Table/Table";
import ProjectController from "controllers/Project";
import MockifyButton from "components/commons/Button/Button";
import ColumnsWithActions from "../../presentational/Project/ProjectData";
import MockifyLoader from "components/commons/Loader/MockifyLoader";
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import MockifyModal from "components/commons/Modal/Modal";
import { IFetchedProjectData } from "types/Project";
import ProjectForm from "../Forms/Project/ProjectForm";

const Project : React.FC = () => {
  const { 
    project, 
    loading, 
    handleDeleteProject,
    // delete
    showDeleteModal, 
    handleShowDeleteModal,
    selectedProject, 
    setSelectedProject,
    handleHideDeleteModal, 
    // update
    handleShowEditModal,
    handleHideEditModal, 
    showEditModal,
    handleFormChange, 
    handleSubmitProjectForm,
    showCreateModal, 
    handleShowCreateProjectModal,
    handleHideCreateProjectModal,
    form
  } = ProjectController();

  const actions = [
    {
      icon: <EditOutlined />,
      classes: ['table-action-primary'],
      onclick: (record : IFetchedProjectData) => handleShowEditModal(record) 
    }, 
    {
      icon:<DeleteOutlined />,
      classes: ['table-action-secondary'],
      onclick: (record: IFetchedProjectData) => handleShowDeleteModal(record)
    }
  ]
  return (
    <>
    {
      loading ? <MockifyLoader size="large" /> 
      : (
        <>
          <MockifyButton 
            classes={['mockify-icon-btn']}
            icon={<PlusCircleOutlined style={{fontSize: '33px'}}/>}
            onClick={handleShowCreateProjectModal}
            />
          <MockifyModal 
            show={showDeleteModal}
            title="Delete project"
            onOk={() => handleDeleteProject(selectedProject._id || '')}
            onCancel={() => handleHideDeleteModal()}
            children={<p>Are you sure delete {selectedProject.name} ?</p>}
            />
          <MockifyModal
            show={showEditModal}
            title="Update project"
            onOk={ () => handleHideEditModal()}
            onCancel={() => handleHideEditModal()}
            okButtonProps={{ style: { display: 'none' } }}
            cancelButtonProps={{ style: { display: 'none' } }}
            children={
                <ProjectForm 
                  handleFormChange={handleFormChange} 
                  handleFormSubmit={handleSubmitProjectForm}
                  data={selectedProject} 
                  form={form}
                  onFinish={() => handleHideEditModal()}
                  />
              }
            />
          <MockifyModal
            show={showCreateModal}
            title="Create project"
            onOk={ () => handleShowCreateProjectModal()}
            onCancel={() => handleHideCreateProjectModal()}
            okButtonProps={{ style: { display: 'none' } }}
            cancelButtonProps={{ style: { display: 'none' } }}
            children={
                <ProjectForm 
                  handleFormChange={handleFormChange} 
                  handleFormSubmit={handleSubmitProjectForm}
                  data={selectedProject} 
                  form={form}
                  onFinish={() => handleHideEditModal()}
                  />
              }
            />
          <MockifyTable 
            columns={ColumnsWithActions(actions)} 
            data={project} 
            classes={["mockify-table"]} />
        </>
      )
    }
    </>
  )

}

export default Project;