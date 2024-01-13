import React from "react"; 
import EdgeService from "services/Edge";
import MockifyButton from "components/commons/Button/Button";
import MockifyLoader from "components/commons/Loader/MockifyLoader";
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import MockifyModal from "components/commons/Modal/Modal";
import { IFetchedEdgeData } from "types/Edge";
import EdgeForm from "../Forms/Edge/EdgeForm";
import { Space, Tabs } from "antd";
import EdgeCards from "components/presentational/Edge/EdgeCards";
import { useAppSelector } from "redux/hooks";
import ResourceService from "services/Resource";

const Edge : React.FC = () => {
  const { resource } = ResourceService();
  const { 
    edge, 
    loading,
    // tabs
    handleTabChange,
    key,
    // delete
    handleDeleteEdge, showDeleteModal, handleShowDeleteModal,selectedEdge, 
    handleHideDeleteModal, 
    // update
    handleShowEditModal, handleHideEditModal, showEditModal,
    // create
    showCreateModal, 
    handleShowCreateEdgeModal,
    handleHideCreateEdgeModal,
    form, handleFormChange, handleSubmitEdgeForm,

  } = EdgeService();

  const actions = [
    {
      icon: <EditOutlined />,
      classes: ['table-action-primary', 'textAndIcon'],
      text: "Edit",
      onclick: (record : IFetchedEdgeData) => handleShowEditModal(record) 
    }, 
    {
      icon:<DeleteOutlined />,
      classes: ['table-action-secondary', 'textAndIcon'],
      text: "Delete",
      onclick: (record: IFetchedEdgeData) => handleShowDeleteModal(record)
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
          classes={['table-action-third', 'table-action']} 
          onClick={handleShowCreateEdgeModal} 
          icon={<PlusCircleOutlined />} 
        />
        }
        style={{ height: "100%" }}
        onTabClick={(e) => handleTabChange(e, resource)}
          items={resource.map((reso : any, index : number) => {
            return {
              label: `${reso.resourceName}`,
              key: `${index}`,
              disabled: false,
              children: (
                <>
                  <MockifyModal 
                    show={showDeleteModal}
                    title="Delete Edge Function"
                    onOk={() => handleDeleteEdge(selectedEdge._id || '')}
                    onCancel={() => handleHideDeleteModal()}
                    children={<p>Are you sure delete {selectedEdge.name} ?</p>}
                    />
                  <MockifyModal
                    show={showEditModal}
                    title="Update Edge Function"
                    onOk={ () => handleHideEditModal()}
                    onCancel={() => handleHideEditModal()}
                    okButtonProps={{ style: { display: 'none' } }}
                    cancelButtonProps={{ style: { display: 'none' } }}
                    children={
                        <EdgeForm 
                          handleFormChange={handleFormChange} 
                          handleFormSubmit={handleSubmitEdgeForm}
                          data={selectedEdge} 
                          resourceOptions={resource}
                          form={form}
                          onFinish={() => handleHideEditModal()}
                          />
                      }
                    />
                  <MockifyModal
                    show={showCreateModal}
                    title="Create Edge Function"
                    onOk={ () => handleShowCreateEdgeModal()}
                    onCancel={() => handleHideCreateEdgeModal()}
                    okButtonProps={{ style: { display: 'none' } }}
                    cancelButtonProps={{ style: { display: 'none' } }}
                    children={
                        <EdgeForm 
                          handleFormChange={handleFormChange} 
                          handleFormSubmit={handleSubmitEdgeForm}
                          data={selectedEdge} 
                          resourceOptions={resource}
                          form={form}
                          onFinish={() => handleHideEditModal()}
                          />
                      }
                    />
                  <EdgeCards data={edge} actions={actions} />
                </>
              )
              }

          })}
        />
      )
    }
    </>
        
  )

}

export default Edge;