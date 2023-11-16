import React, { useEffect } from "react"; 
import MockifyTable from "../../commons/Table/Table";
import PolicyController from "controllers/Policy";
import MockifyButton from "components/commons/Button/Button";
import ColumnsWithActions from "../../presentational/Policy/PolicyData";
import MockifyLoader from "components/commons/Loader/MockifyLoader";
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import MockifyModal from "components/commons/Modal/Modal";
import { IFetchedPolicyData } from "types/Policy";
import PolicyForm from "../Forms/Policy/PolicyForm";
import { Tabs } from "antd";
import ProjectController from "controllers/Project";
import Policies from "../../presentational/Policy/Policies";

const Policy : React.FC = () => {
  const { 
    policy, 
    loading, 
    handleDeletePolicy,
    // delete
    showDeleteModal, 
    handleShowDeleteModal,
    selectedPolicy, 
    setSelectedPolicy,
    handleHideDeleteModal, 
    // update
    handleShowEditModal,
    handleHideEditModal, 
    showEditModal,
    // form change
    handleFormChange,

    handleSubmitPolicyForm,
    showCreateModal, 
    handleShowCreatePolicyModal,
    handleHideCreatePolicyModal,
    form,
    // tabs 
    handleTabChange,
    key,  
  } = PolicyController();

  const {
    project,
  }   = ProjectController();

  const actions = [
    {
      icon: <EditOutlined />,
      classes: ['table-action-primary', 'table-action'],
      onclick: (record : IFetchedPolicyData) => handleShowEditModal(record) 
    }, 
    {
      icon:<DeleteOutlined />,
      classes: ['table-action-secondary', 'table-action'],
      onclick: (record: IFetchedPolicyData) => handleShowDeleteModal(record)
    },
    {
      icon: <PlusCircleOutlined />,
      classes: ['table-action-third', 'table-action'],
      onclick: handleShowCreatePolicyModal,
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
        style={{ height: "100%" }}
        onTabClick={(e) => handleTabChange(e, project)}
        activeKey={`${key}`}
        onLoad={(e) => handleTabChange(`${key}`, project)}
        
        items={project.map((proj : any, index : number) => {
          return {
            label: `${proj.name}`,
            key: `${index}`,
            disabled: false,
            children: (
              <>
                <MockifyModal 
                  show={showDeleteModal}
                  title="Delete policy"
                  onOk={() => handleDeletePolicy(selectedPolicy._id || '')}
                  onCancel={() => handleHideDeleteModal()}
                  children={<p>Are you sure delete {selectedPolicy._id} ?</p>}
                  />
                <MockifyModal
                  show={showEditModal}
                  title="Update policy"
                  onOk={ () => handleHideEditModal()}
                  onCancel={() => handleHideEditModal()}
                  okButtonProps={{ style: { display: 'none' } }}
                  cancelButtonProps={{ style: { display: 'none' } }}
                  children={
                      <PolicyForm 
                        handleFormChange={handleFormChange}
                        handleFormSubmit={handleSubmitPolicyForm}
                        data={selectedPolicy}
                        projectOptions={project}
                        form={form}
                        onFinish={() => handleHideEditModal()}
                        />
                    }
                  />
                <MockifyModal
                  show={showCreateModal}
                  title="Create policy"
                  onOk={ () => handleShowCreatePolicyModal()}
                  onCancel={() => handleHideCreatePolicyModal()}
                  okButtonProps={{ style: { display: 'none' } }}
                  cancelButtonProps={{ style: { display: 'none' } }}
                  children={
                      <PolicyForm 
                        handleFormChange={handleFormChange} 
                        handleFormSubmit={handleSubmitPolicyForm}
                        data={selectedPolicy} 
                        projectOptions={project}
                        form={form}
                        onFinish={() => handleHideEditModal()}
                        />
                    }
                  />
                <MockifyTable 
                  columns={ColumnsWithActions(actions)} 
                  data={policy} 
                  expandable={{
                    expandedRowRender: (record : IFetchedPolicyData) => <Policies policies={record?.policies} />,
                  }}
                  expandRowByClick
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

export default Policy;