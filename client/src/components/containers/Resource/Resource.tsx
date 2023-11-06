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

const Resource : React.FC = () => {
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
    handleFormChangeFuncs,
    handleFormChangeFeatures,
    handleFormChangeFields,

    handleSubmitResourceForm,
    showCreateModal, 
    handleShowCreateResourceModal,
    handleHideCreateResourceModal,
    form,
    handleAddFunction,
    handleRemoveFunction,
    handleAddField,
    handleRemoveField,
  } = ResourceController();

  const actions = [
    {
      icon: <EditOutlined />,
      classes: ['table-action-primary'],
      onclick: (record : IFetchedResourceData) => handleShowEditModal(record) 
    }, 
    {
      icon:<DeleteOutlined />,
      classes: ['table-action-secondary'],
      onclick: (record: IFetchedResourceData) => handleShowDeleteModal(record)
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
            onClick={handleShowCreateResourceModal}
            />
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
                  handleFormChangeFuncs={handleFormChangeFuncs}
                  handleFormChangeFields={handleFormChangeFields}

                  handleFormSubmit={handleSubmitResourceForm}
                  handleAddFunction={handleAddFunction}
                  handleRemoveFunction={handleRemoveFunction}
                  handleAddField={handleAddField}
                  handleRemoveField={handleRemoveField}
                  data={selectedResource} 
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
                  handleFormChangeFuncs={handleFormChangeFuncs}
                  handleFormChangeFields={handleFormChangeFields}
                  handleFormSubmit={handleSubmitResourceForm}
                  handleAddFunction={handleAddFunction}
                  handleRemoveFunction={handleRemoveFunction}
                  handleAddField={handleAddField}
                  handleRemoveField={handleRemoveField}
                  data={selectedResource} 
                  form={form}
                  onFinish={() => handleHideEditModal()}
                  />
              }
            />
          <MockifyTable 
            columns={ColumnsWithActions(actions)} 
            data={resource} 
            classes={["mockify-table"]} />
        </>
      )
    }
    </>
  )

}

export default Resource;