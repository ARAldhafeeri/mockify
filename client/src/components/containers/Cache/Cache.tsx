import React from "react"; 
import MockifyTable from "../../commons/Table/Table";
import CacheService from "services/Cache";
import MockifyButton from "components/commons/Button/Button";
import ColumnsWithActions from "../../presentational/Cache/CacheData";
import MockifyLoader from "components/commons/Loader/MockifyLoader";
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import MockifyModal from "components/commons/Modal/Modal";
import { IFetchedCacheData } from "types/Cache";
import CacheForm from "../Forms/Cache/CacheForm";
import GlobalTabs from "../GlobalTabs/GlobalTabs";

const Cache : React.FC = () => {
  // services
  const { 
    cache, 
    loading, 
    handleDeleteCache,
    // delete
    showDeleteModal, 
    handleShowDeleteModal,
    selectedCache, 
    setSelectedCache,
    handleHideDeleteModal, 
    // update
    handleShowEditModal,
    handleHideEditModal, 
    showEditModal,
    // form change
    handleFormChange,

    handleSubmitCacheForm,
    showCreateModal, 
    handleShowCreateCacheModal,
    handleHideCreateCacheModal,
    form,
    // tabs 
    handleTabChange,
    key,

  } = CacheService();

  // actions
  const actions = [
    {
      icon: <EditOutlined />,
      classes: ['table-action-primary', 'table-action'],
      onclick: (record : IFetchedCacheData) => handleShowEditModal(record) 
    }, 
    {
      icon:<DeleteOutlined />,
      classes: ['table-action-secondary', 'table-action'],
      onclick: (record: IFetchedCacheData) => handleShowDeleteModal(record)
    }
  ]

  // render component with global tabs
  return (
    <>
    {
        loading ? <MockifyLoader size="large" /> : (
        <GlobalTabs
          handleTabChange={handleTabChange}
          key={key}
          content={
            <>
              <MockifyModal 
                show={showDeleteModal}
                title="Delete cache"
                onOk={() => handleDeleteCache(selectedCache?.key)}
                onCancel={() => handleHideDeleteModal()}
                children={<p>Are you sure delete {selectedCache?.key} ?</p>}
                />
              <MockifyModal
                show={showEditModal}
                title="Update cache"
                onOk={ () => handleHideEditModal()}
                onCancel={() => handleHideEditModal()}
                okButtonProps={{ style: { display: 'none' } }}
                cancelButtonProps={{ style: { display: 'none' } }}
                children={
                    <CacheForm 
                      handleFormChange={handleFormChange} 
                      handleFormSubmit={handleSubmitCacheForm}
                      data={selectedCache} 
                      form={form}
                      onFinish={() => handleHideEditModal()}
                      />
                  }
                />
              <MockifyModal
                show={showCreateModal}
                title="Create cache"
                onOk={ () => handleShowCreateCacheModal()}
                onCancel={() => handleHideCreateCacheModal()}
                okButtonProps={{ style: { display: 'none' } }}
                cancelButtonProps={{ style: { display: 'none' } }}
                children={
                  <CacheForm 
                    handleFormChange={handleFormChange} 
                    handleFormSubmit={handleSubmitCacheForm}
                    data={selectedCache} 
                    form={form}
                    onFinish={() => handleHideEditModal()}
                  />
                  }
                />
              <MockifyTable 
                columns={ColumnsWithActions(actions)} 
                data={cache} 
                classes={["mockify-table"]} />
            </>
            } 
            withCreateBtn={true} 
            createBtn={
              <MockifyButton 
              classes={['table-action-third', 'table-action', 'left-tab-action']} 
              onClick={handleShowCreateCacheModal} 
              icon={<PlusCircleOutlined />} 
              />
            } 
        />
      )
    }
</>
)
}

export default Cache;