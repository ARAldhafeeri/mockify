import React from "react"; 
import MockifyTable from "../../commons/Table/Table";
import DataService from "services/Data";
import ColumnsWithActions from "../../presentational/Data/DataData";
import MockifyLoader from "components/commons/Loader/MockifyLoader";
import ResourceService from "services/Resource";
import { Tabs } from "antd";
import { IFetchedDataData } from "types/Data";
import { DeleteColumnOutlined, DeleteOutlined, EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import MockifyButton from "components/commons/Button/Button";
import MockifyModal from "components/commons/Modal/Modal";
import DataForm from "../Forms/Data/DataForm";

const Data : React.FC = () => {

  const {
    resource,
  } = ResourceService();

  const { 
    data, 
    loading,
    handleTabChange,
    key,
    selectedData, 
    setSelectedData,

    // delete event
    handleDeleteData,
    showDeleteModal,
    handleShowDeleteModal,
    handleHideDeleteModal,

    // update event
    showEditModal,
    handleShowEditModal,
    handleHideEditModal,
    handleSubmitDataForm,
    
    // form change 
    handleFormChange,
    handleFormChangeSelect,
    hanldeFormChangeFields,

    // create event
    showCreateModal, 
    handleShowCreateDataModal,
    handleHideCreateDataModal,
    form,

  
  } = DataService();

  const actions = [
    {
      icon: <EditOutlined />,
      classes: ['table-action-primary', 'table-action'],
      onclick: (record : IFetchedDataData) => handleShowEditModal(record) 
    }, 
    {
      icon:<DeleteOutlined />,
      classes: ['table-action-secondary', 'table-action'],
      onclick: (record: IFetchedDataData) => handleShowDeleteModal(record)
    },
  ]
  return (
    <>
    {
      loading ? <MockifyLoader size="large" /> 
      : (
        <>
          {/* resource selection */}
          <Tabs
            defaultActiveKey={`${key}`}
            tabPosition="top"
            tabBarExtraContent={
              <MockifyButton 
              classes={['table-action-third', 'table-action']} 
              onClick={handleShowCreateDataModal} 
              icon={<PlusCircleOutlined />} 
            />
            }
            style={{ height: "100%" }}
            onTabClick={(e) => handleTabChange(e, resource)}
            items={resource.map((resource : any, index : number) => {
              return {
                label: `${resource.resourceName}`,
                key: `${index}`,
                disabled: false,
                children: (
                  <>
                    <MockifyModal 
                      show={showDeleteModal}
                      title="Delete resource"
                      onOk={() => handleDeleteData(selectedData._id || '')}
                      onCancel={() => handleHideDeleteModal()}
                      children={<p>Are you sure  you want to delete ?</p>}
                      />
                    <MockifyModal
                      show={showEditModal}
                      title="Update data"
                      onOk={ () => handleHideEditModal()}
                      onCancel={() => handleHideEditModal()}
                      okButtonProps={{ style: { display: 'none' } }}
                      cancelButtonProps={{ style: { display: 'none' } }}
                      children={
                          <DataForm 
                            handleFormChange={handleFormChange}
                            handleFormSubmit={handleSubmitDataForm}
                            data={selectedData} 
                            handleFormChangeSelect={handleFormChangeSelect}
                            hanldeFormChangeFields={hanldeFormChangeFields}
                            form={form}
                            fieldsSchema={resource?.fields}
                            onFinish={() => handleHideEditModal()}
                            />
                        }
                      />
                    <MockifyModal
                      show={showCreateModal}
                      title="Create data"
                      onOk={ () => handleShowCreateDataModal()}
                      onCancel={() => handleHideCreateDataModal()}
                      okButtonProps={{ style: { display: 'none' } }}
                      cancelButtonProps={{ style: { display: 'none' } }}
                      children={
                          <DataForm 
                            handleFormChange={handleFormChange} 
                            handleFormSubmit={handleSubmitDataForm}
                            data={selectedData}
                            handleFormChangeSelect={handleFormChangeSelect}
                            hanldeFormChangeFields={hanldeFormChangeFields}
                            form={form}
                            fieldsSchema={resource?.fields}
                            onFinish={() => handleHideEditModal()}
                            />
                        }
                      />
                    <MockifyTable 
                      columns={ColumnsWithActions(data, actions)} 
                      data={data} 
                      classes={["mockify-table"]} />
                  </>
                ),
              };
            })}
          />
        </>
      )
    }
    </>
  )

}

export default Data;