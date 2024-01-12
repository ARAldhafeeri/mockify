import React from "react"; 
import ProjectController from "controllers/Project";
import MockifyButton from "components/commons/Button/Button";
import MockifyLoader from "components/commons/Loader/MockifyLoader";
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import MockifyModal from "components/commons/Modal/Modal";
import { IFetchedProjectData } from "types/Project";
import ProjectForm from "../Forms/Project/ProjectForm";
import { Space } from "antd";
import ProjectCards from "components/presentational/Project/ProjectCards";

const Project : React.FC = () => {
  const { 
    project, loading,
    // delete
    handleDeleteProject, showDeleteModal, handleShowDeleteModal,selectedProject, 
    handleHideDeleteModal, 
    // update
    handleShowEditModal, handleHideEditModal, showEditModal,
    // create
    showCreateModal, 
    handleShowCreateProjectModal,
    handleHideCreateProjectModal,
    form, handleFormChange, handleSubmitProjectForm,
    handleFormChangeSelect

  } = ProjectController();

  const actions = [
    {
      icon: <EditOutlined />,
      classes: ['table-action-primary', 'textAndIcon'],
      text: "Edit",
      onclick: (record : IFetchedProjectData) => handleShowEditModal(record) 
    }, 
    {
      icon:<DeleteOutlined />,
      classes: ['table-action-secondary', 'textAndIcon'],
      text: "Delete",
      onclick: (record: IFetchedProjectData) => handleShowDeleteModal(record)
    }
  ]
  return (
    <>
    {
      loading ? <MockifyLoader size="large" /> 
      : (
        <>
          <Space style={{justifyContent: "space-between"}}>
          <MockifyButton 
            classes={['table-action-third', 'textAndIcon']}
            icon={<PlusCircleOutlined />}
            text={"Create project"}
            onClick={handleShowCreateProjectModal}
            />
          </Space>
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
                  handleFormChangeSelect={handleFormChangeSelect}
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
                  handleFormChangeSelect={handleFormChangeSelect}
                  data={selectedProject} 
                  form={form}
                  onFinish={() => handleHideEditModal()}
                  />
              }
            />
          <ProjectCards data={project} actions={actions} />
        </>
      )
    }
    </>
  )

}

export default Project;