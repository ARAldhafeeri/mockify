import React from "react";
import { IFetchedPolicyData } from "types/Policy";
import { fetchPolicy, deletePolicy, updatePolicy, createPolicy } from "redux/features/policy/policyThunk";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { ToastifyMockify } from "utils";
import { Form } from "antd";
import { IFetchedProjectData } from "types/Project";
const PolicyController = () => {
  const { policy, loading } = useAppSelector((state) => state.policy);
  const { project } = useAppSelector((state) => state.project )
  const [ key, setKey ] = React.useState<number>(0);
  const  [ projectID, setProjectID ] = React.useState<string>(project?.[0]?._id ?? "");
  const  [ showDeleteModal, setShowDeleteModal ] = React.useState<boolean>(false);
  const [ showEditModal, setShowEditModal ] = React.useState<boolean>(false);
  const [ showCreateModal, setShowCreateModal ] = React.useState<boolean>(false);
  const [selectedPolicy, setSelectedPolicy ] = React.useState<IFetchedPolicyData>({
    project: "",
    resources: [],
    actions: [],
    roles: [],
    policies:[],
  });
  const dispatch = useAppDispatch();

  const handleTabChange = (key : string, projects : IFetchedProjectData[]) => {
    setKey(parseInt(key))
    setProjectID(projects[parseInt(key)]._id as string);
  }

  // antd form 
  const [form] = Form.useForm();

  // delete policy event
  const handleDeletePolicy = (id : string) => {
    ToastifyMockify(
      dispatch(
        deletePolicy(id)
        )
    );
    setShowDeleteModal(false);
  }

  const handleShowDeleteModal = (record : IFetchedPolicyData) => {
    setSelectedPolicy(record);
    setShowDeleteModal(true);
  }

  const handleHideDeleteModal = () => {
    setShowDeleteModal(false);
  }

  // update policy event
  const handleShowEditModal = (record: IFetchedPolicyData) => {
    setSelectedPolicy(record);
    setShowEditModal(true);
  }

  const handleHideEditModal = () => {
    setShowEditModal(false);
  }

  const handleSubmitPolicyForm = (e : any) => {
    e.preventDefault();
    let dispatched;
    if (showEditModal) {
      dispatched = dispatch(updatePolicy(selectedPolicy))
    } else {
      delete selectedPolicy._id;
      dispatched = dispatch(createPolicy(selectedPolicy))
    }

    ToastifyMockify(dispatched);
  }


  const handleFormChange = (e : any, name : any=null) => {
    setSelectedPolicy({
      ...selectedPolicy,
      [e.target.name]: e.target.value
    })
  };

  // create events
  const handleShowCreatePolicyModal = () => {
    setShowCreateModal(true);
  }

  const handleHideCreatePolicyModal = () => {
    setShowCreateModal(false);
  }


  React.useEffect(() =>{
    const dispatched = dispatch(fetchPolicy(projectID));
    ToastifyMockify(dispatched);
    setShowEditModal(false);
  }, [dispatch, key])

  return {
    // globals
    policy, 
    loading,
    selectedPolicy, 
    setSelectedPolicy,

    // delete event
    handleDeletePolicy,
    showDeleteModal,
    handleShowDeleteModal,
    handleHideDeleteModal,

    // update event
    showEditModal,
    handleShowEditModal,
    handleHideEditModal,
    handleSubmitPolicyForm,
    
    // form change 
    handleFormChange,

    // create event
    showCreateModal, 
    handleShowCreatePolicyModal,
    handleHideCreatePolicyModal,
    form,
    // tabs 
    handleTabChange,
    key,

  }
}

export default PolicyController;