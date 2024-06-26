import React from "react"; 
import ClientService from "services/Client";
import MockifyButton from "components/commons/Button/Button";
import MockifyLoader from "components/commons/Loader/MockifyLoader";
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import MockifyModal from "components/commons/Modal/Modal";
import { IFetchedClientData } from "types/Client";
import ClientForm from "../Forms/Client/ClientForm";
import ClientCards from "components/presentational/Client/ClientCards";
import GlobalTabsProjects from "../GlobalTabs/GlobalTabsProjects";
import NextPrevPagination from "../Pagination/NextPrevPagination";
import { useAppSelector } from "redux/hooks";

const Client : React.FC = () => {

  // services
  const { project } = useAppSelector(project => project.project); 

  const { 
    client, 
    loading, 
    handleDeleteClient,
    // delete
    showDeleteModal, 
    handleShowDeleteModal,
    selectedClient, 
    setSelectedClient,
    handleHideDeleteModal, 
    // update
    handleShowEditModal,
    handleHideEditModal, 
    showEditModal,
    // form change
    handleFormChange,

    handleSubmitClientForm,
    showCreateModal, 
    handleShowCreateClientModal,
    handleHideCreateClientModal,
    form,
    // tabs 
    handleTabChange,
    key,
    // services  
    resource,
    // select 
    handleFormChangeSelect

  } = ClientService();

  // actions 
  const actions = [
    {
      icon: <EditOutlined />,
      classes: ['table-action-primary', 'textAndIcon'],
      text: "Edit",
      onclick: (record : IFetchedClientData) => handleShowEditModal(record) 
    }, 
    {
      icon:<DeleteOutlined />,
      classes: ['table-action-secondary', 'textAndIcon'],
      text: "Delete",
      onclick: (record: IFetchedClientData) => handleShowDeleteModal(record)
    }
  ]

  
  // render component with global tabs
    return <GlobalTabsProjects
      handleTabChange={handleTabChange}
      tabKey={key}
      content={
        <>
        <MockifyModal 
          show={showDeleteModal}
          title="Delete client"
          onOk={() => handleDeleteClient(selectedClient?._id || '')}
          onCancel={() => handleHideDeleteModal()}
          children={<p>Are you sure delete {selectedClient?.clientName} ?</p>}
          />
        <MockifyModal
          show={showEditModal}
          title="Update client"
          onOk={ () => handleHideEditModal()}
          onCancel={() => handleHideEditModal()}
          okButtonProps={{ style: { display: 'none' } }}
          cancelButtonProps={{ style: { display: 'none' } }}
          children={
              <ClientForm 
                handleFormChange={handleFormChange} 
                handleFormSubmit={handleSubmitClientForm}
                handleFormChangeSelect={handleFormChangeSelect}
                data={selectedClient} 
                form={form}
                projectOptions={project}
                onFinish={() => handleHideEditModal()}
              />
            }
          />
        <MockifyModal
          show={showCreateModal}
          title="Create client"
          onOk={ () => handleShowCreateClientModal()}
          onCancel={() => handleHideCreateClientModal()}
          okButtonProps={{ style: { display: 'none' } }}
          cancelButtonProps={{ style: { display: 'none' } }}
          children={
              <ClientForm 
                handleFormChange={handleFormChange} 
                handleFormSubmit={handleSubmitClientForm}
                handleFormChangeSelect={(handleFormChangeSelect)}
                data={selectedClient} 
                form={form}
                projectOptions={project}
                onFinish={() => handleHideEditModal()}
              />
            }
          />
        <NextPrevPagination
          data={client}
          actions={actions}
          itemsPerPage={6}
          Cards={ClientCards}
        />
      </>
      } 
      withCreateBtn={true} 
      createBtn={
        <MockifyButton 
        classes={['table-action-third', 'table-action', 'left-tab-action']} 
        onClick={handleShowCreateClientModal} 
        icon={<PlusCircleOutlined />} 
    />
    } 
      />

  } 

export default Client;