import React from "react"; 
import MockifyTable from "../../commons/Table/Table";
import ResourceController from "controllers/Resource";
import MockifyButton from "components/commons/Button/Button";
import ColumnsWithActions from "../../presentational/Resource/ResourceData";
import MockifyLoader from "components/commons/Loader/MockifyLoader";
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import MockifyModal from "components/commons/Modal/Modal";
import { IFetchedResourceData } from "types/Resource";
import ResourceForm from "../Forms/Resource/ResourceForm";
import { Tabs } from "antd";
import ProjectController from "controllers/Project";

const Resource : React.FC = () => {
  const {
    project,
  }   = ProjectController();
  const { 
    resource, 
    loading, 
    handleDeleteResource,
    // delete
    showDeleteModal, 
    handleShowDeleteModal,
    selectedResource, 
    setSelectedResource,
    handleHideDeleteModal, 
    // update
    handleShowEditModal,
    handleHideEditModal, 
    showEditModal,
    // form change
    handleFormChange,
    handleFormChangeFeatures,
    handleFormChangeFields,

    handleSubmitResourceForm,
    showCreateModal, 
    handleShowCreateResourceModal,
    handleHideCreateResourceModal,
    form,
    handleAddField,
    handleRemoveField,
    // tabs 
    handleTabChange,
    key,
    // client side filter
    filterResourceBasedOnProjectId,

    //steps
    currentStep,
    prevStep,
    nextStep
  } = ResourceController();

  const actions = [
    {
      icon: <EditOutlined />,
      classes: ['table-action-primary', 'table-action'],
      onclick: (record : IFetchedResourceData) => handleShowEditModal(record) 
    }, 
    {
      icon:<DeleteOutlined />,
      classes: ['table-action-secondary', 'table-action'],
      onclick: (record: IFetchedResourceData) => handleShowDeleteModal(record)
    }
  ]
  return (
    <>
    {
      loading ? <MockifyLoader size="large" /> 
      : (
        <Tabs
        defaultActiveKey={`${key}`}
        tabPosition="top"
        tabBarExtraContent={
          <MockifyButton 
          classes={['table-action-third', 'table-action', 'left-tab-action']} 
          onClick={handleShowCreateResourceModal} 
          icon={<PlusCircleOutlined />} 
        />
        }
        style={{ height: "100%" }}
        onTabClick={(e) => handleTabChange(e, project)}
        items={project.map((proj : any, index : number) => {
          return {
            label: `${proj.name}`,
            key: `${index}`,
            disabled: false,
            children: (
              <>
                <MockifyModal 
                  show={showDeleteModal}
                  title="Delete resource"
                  onOk={() => handleDeleteResource(selectedResource._id || '')}
                  onCancel={() => handleHideDeleteModal()}
                  children={<p>Are you sure delete {selectedResource.resourceName} ?</p>}
                  />
                <MockifyModal
                  show={showEditModal}
                  title="Update resource"
                  onOk={ () => handleHideEditModal()}
                  onCancel={() => handleHideEditModal()}
                  okButtonProps={{ style: { display: 'none' } }}
                  cancelButtonProps={{ style: { display: 'none' } }}
                  children={
                      <ResourceForm 
                        handleFormChange={handleFormChange}
                        handleFormChangeFeatures={handleFormChangeFeatures}
                        handleFormChangeFields={handleFormChangeFields}
                        currentStep={currentStep}
                        prevStep={prevStep}
                        nextStep={nextStep}
                        handleFormSubmit={handleSubmitResourceForm}
                        handleAddField={handleAddField}
                        handleRemoveField={handleRemoveField}
                        data={selectedResource}
                        projectOptions={project}
                        form={form}
                        onFinish={() => handleHideEditModal()}
                        />
                    }
                  />
                <MockifyModal
                  show={showCreateModal}
                  title="Create resource"
                  onOk={ () => handleShowCreateResourceModal()}
                  onCancel={() => handleHideCreateResourceModal()}
                  okButtonProps={{ style: { display: 'none' } }}
                  cancelButtonProps={{ style: { display: 'none' } }}
                  children={
                      <ResourceForm 
                        handleFormChange={handleFormChange} 
                        handleFormChangeFeatures={handleFormChangeFeatures}
                        handleFormChangeFields={handleFormChangeFields}
                        handleFormSubmit={handleSubmitResourceForm}
                        handleAddField={handleAddField}
                        handleRemoveField={handleRemoveField}
                        data={selectedResource} 
                        projectOptions={project}
                        currentStep={currentStep}
                        prevStep={prevStep}
                        nextStep={nextStep}
                        form={form}
                        onFinish={() => handleHideEditModal()}
                        />
                    }
                  />
                <MockifyTable 
                  columns={ColumnsWithActions(actions)} 
                  data={filterResourceBasedOnProjectId(resource)} 
                  classes={["mockify-table"]} />
              </>
            )
          };
        })}/>
      )
    }
    </>
  )

}

export default Resource;