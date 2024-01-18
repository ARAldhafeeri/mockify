import React from "react"; 
import EventService from "services/Event";
import MockifyButton from "components/commons/Button/Button";
import MockifyLoader from "components/commons/Loader/MockifyLoader";
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import MockifyModal from "components/commons/Modal/Modal";
import { IFetchedEventData } from "types/Event";
import EventForm from "../Forms/Event/EventForm";
import EventCards from "components/presentational/Event/EventCards";
import { Tabs } from "antd";

const Event : React.FC = () => {
  const { 
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
    // tabs
    handleTabChange,
    key,
  } = EventService();

  const actions = [
    {
      icon: <EditOutlined />,
      classes: ['table-action-primary', 'textAndIcon'],
      text: "Edit",
      onclick: (record : IFetchedEventData) => handleShowEditModal(record) 
    }, 
    {
      icon:<DeleteOutlined />,
      classes: ['table-action-secondary', 'textAndIcon'],
      text: "Delete",
      onclick: (record: IFetchedEventData) => handleShowDeleteModal(record)
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
          onClick={handleShowCreateEventModal} 
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
                    title="Delete Event Function"
                    onOk={() => handleDeleteEvent(selectedEvent._id || '')}
                    onCancel={() => handleHideDeleteModal()}
                    children={<p>Are you sure delete {selectedEvent.name} ?</p>}
                    />
                  <MockifyModal
                    show={showEditModal}
                    title="Update Event Function"
                    onOk={ () => handleHideEditModal()}
                    onCancel={() => handleHideEditModal()}
                    okButtonProps={{ style: { display: 'none' } }}
                    cancelButtonProps={{ style: { display: 'none' } }}
                    children={
                        <EventForm 
                          handleFormChange={handleFormChange} 
                          handleFormSubmit={handleSubmitEventForm}
                          handleFormChangeSelect={handleFormChangeSelect}
                          data={selectedEvent} 
                          form={form}
                          onFinish={() => handleHideEditModal()}
                          />
                      }
                    />
                  <MockifyModal
                    show={showCreateModal}
                    title="Create Event Function"
                    onOk={ () => handleShowCreateEventModal()}
                    onCancel={() => handleHideCreateEventModal()}
                    okButtonProps={{ style: { display: 'none' } }}
                    cancelButtonProps={{ style: { display: 'none' } }}
                    children={
                        <EventForm 
                          handleFormChange={handleFormChange} 
                          handleFormSubmit={handleSubmitEventForm}
                          data={selectedEvent} 
                          handleFormChangeSelect={handleFormChangeSelect}
                          form={form}
                          onFinish={() => handleHideEditModal()}
                          />
                      }
                    />
                  <EventCards data={event} actions={actions} />
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

export default Event;