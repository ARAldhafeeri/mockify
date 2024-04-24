import React from "react";
import { IFetchedClientData } from "types/Client";
import { fetchClients, deleteClient, updateClient, createClient } from "redux/features/client/clientThunk";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { ToastifyMockify } from "utils";
import { Form } from "antd";
import { IFetchedProjectData } from "types/Project";
import ProjectService from "./Project";
import ResourceService from "./Resource";
const ClientService = () => {
  const { resource } = ResourceService();
  const { project } = ProjectService();
  const { client, loading } = useAppSelector((state) => state.client);
  const [ key, setKey ] = React.useState<number>(0);
  const [ projectT, setProject ] = React.useState<IFetchedProjectData>(project[0]);
  const  [ showDeleteModal, setShowDeleteModal ] = React.useState<boolean>(false);
  const [ showEditModal, setShowEditModal ] = React.useState<boolean>(false);
  const [ showCreateModal, setShowCreateModal ] = React.useState<boolean>(false);
  const [selectedClient, setSelectedClient ] = React.useState<any>({
    project: projectT?._id,
    client: {}
  });

  const dispatch = useAppDispatch();
  
  const handleTabChange = (key : string, projects : IFetchedProjectData[]) => {
    setKey(parseInt(key))
    setProject(projects[parseInt(key)]);
  }

  // antd form 
  const [form] = Form.useForm();

  // delete client event
  const handleDeleteClient = (id : string) => {
    ToastifyMockify(
      dispatch(
        deleteClient(id)
        )
    );
    setShowDeleteModal(false);
  }

  const handleShowDeleteModal = (record : IFetchedClientData) => {
    setSelectedClient(record);
    setShowDeleteModal(true);
  }

  const handleHideDeleteModal = () => {
    setShowDeleteModal(false);
  }

  // update client event
  const handleShowEditModal = (record: IFetchedClientData) => {
    setSelectedClient(record);
    setShowEditModal(true);
  }

  const handleHideEditModal = () => {
    setShowEditModal(false);
  }

  const handleSubmitClientForm = (e : any) => {
    e.preventDefault();
    let dispatched;
    if (showEditModal) {
      delete selectedClient._id;
      delete selectedClient.secret;
      delete selectedClient.id;
      selectedClient.project = projectT?._id;
      dispatched = dispatch(updateClient(selectedClient))
    } else {
      selectedClient.project = projectT?._id;
      dispatched = dispatch(createClient(selectedClient))
    }
    
    ToastifyMockify(dispatched);
  }

  const handleFormChange = (e : any) => {
    e.preventDefault();
    console.log(e)
        setSelectedClient({
          ...selectedClient,
          [e.target.name]: e.target.value
        })
  };

  // create events
  const handleShowCreateClientModal = () => {
    setShowCreateModal(true);
  }

  const handleHideCreateClientModal = () => {
    setShowCreateModal(false);
  }

  const handleFormChangeSelect = (value : string) => {
    setSelectedClient({
      ...selectedClient,
      project: value
    })
   }


  

  React.useEffect(() =>{
    const dispatched = dispatch(fetchClients(projectT?._id));
    ToastifyMockify(dispatched);
    setShowEditModal(false);
    setShowCreateModal(false);
  }, [dispatch, key])

  return {
    // globals
    client, 
    loading,
    selectedClient, 
    setSelectedClient,

    // delete event
    handleDeleteClient,
    showDeleteModal,
    handleShowDeleteModal,
    handleHideDeleteModal,

    // update event
    showEditModal,
    handleShowEditModal,
    handleHideEditModal,
    handleSubmitClientForm,
    
    // form change 
    handleFormChange,

    // create event
    showCreateModal, 
    handleShowCreateClientModal,
    handleHideCreateClientModal,
    form,

    // tabs 
    handleTabChange,
    key,

    // services
    resource,
    // form change select
    handleFormChangeSelect,


  }
}

export default ClientService;
