import React from "react";
import { IFetchedEventData } from "types/Event";
import { fetchEvents, deleteEvent, updateEvent, createEvent } from "redux/features/event/eventThunk";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { ToastifyMockify } from "utils";
import { Form } from "antd";
import ResourceService from "./Resource";
import { IFetchedResourceData } from "types/Resource";
import EdgeService from "./Edge";

const EventService = () => {
  const { event, loading } = useAppSelector((state) => state.event);
  const { resource } = useAppSelector((state) => state.resource);
  const {edge, getEdgeByResourceName } = EdgeService();
  const [ key, setKey ] = React.useState<number>(0);
  const  [ resourceId, setResourceId ] = React.useState<string>(resource[0]?.resourceName ?? "");

  const  [ showDeleteModal, setShowDeleteModal ] = React.useState<boolean>(false);
  const [ showEditModal, setShowEditModal ] = React.useState<boolean>(false);
  const [ showCreateModal, setShowCreateModal ] = React.useState<boolean>(false);
  const [selectedEvent, setSelectedEvent ] = React.useState<IFetchedEventData>({
    resource: "",
    name: "",
    handler: "",
  });

  const dispatch = useAppDispatch();

  const handleTabChange = (key : string, resources : IFetchedResourceData[]) => {
    setKey(parseInt(key))
    const res  = resources[parseInt(key)];

    setResourceId(res._id as string);
    getEdgeByResourceName(res.resourceName as string)
  }

  
  // antd form 
  const [form] = Form.useForm();

  // delete event event
  const handleDeleteEvent = (id : string) => {
    ToastifyMockify(
      dispatch(
        deleteEvent(id)
        )
    );
    setShowDeleteModal(false);
  }

  const handleShowDeleteModal = (record : IFetchedEventData) => {
    setSelectedEvent(record);
    setShowDeleteModal(true);
  }

  const handleHideDeleteModal = () => {
    setShowDeleteModal(false);
  }

  // update event event
  const handleShowEditModal = (record: IFetchedEventData) => {
    setSelectedEvent(record);
    setShowEditModal(true);
  }

  const handleHideEditModal = () => {
    setShowEditModal(false);
  }

  const handleSubmitEventForm = (e : any) => {
    e.preventDefault();
    let dispatched;
    if (showEditModal) {
      dispatched = dispatch(updateEvent(selectedEvent))
    } else {
      delete selectedEvent._id;
      dispatched = dispatch(createEvent(selectedEvent))
    }

    ToastifyMockify(dispatched);
  }

  const handleFormChange = (e : any) => {
    setSelectedEvent({
      ...selectedEvent,
      [e.target.name]: e.target.value
    })
  };

  const handleFormChangeSelect = (value : string, type : string) => {
   switch(type) {
    case "resource":
      setSelectedEvent({
        ...selectedEvent,
        resource: value
      })
      break;
    case "handler":
      setSelectedEvent({
        ...selectedEvent,
        handler: value
      })
      break;
    default:
      break;
   }
  }

  // create events
  const handleShowCreateEventModal = () => {
    setShowCreateModal(true);
  }

  const handleHideCreateEventModal = () => {
    setShowCreateModal(false);
  }
  
  React.useEffect(() =>{
    const dispatched = dispatch(fetchEvents(resourceId));
    ToastifyMockify(dispatched);
    setShowEditModal(false);
  }, [dispatch, key])

  return {
    // globals
    event, 
    loading,
    selectedEvent, 
    setSelectedEvent,
    // delete event
    handleDeleteEvent,
    showDeleteModal,
    handleShowDeleteModal,
    handleHideDeleteModal,
    // update event
    showEditModal,
    handleShowEditModal,
    handleHideEditModal,
    handleSubmitEventForm,
    handleFormChange,
    // create event
    showCreateModal, 
    handleShowCreateEventModal,
    handleHideCreateEventModal,
    form,
    handleFormChangeSelect,
    // services
    resource,
    edge,
    // tabs
    handleTabChange,
    key,

  }
}

export default EventService;