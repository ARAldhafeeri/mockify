import React from "react";
import { IFetchedPolicyData } from "types/Policy";
import { fetchPolicy, deletePolicy, updatePolicy, createPolicy } from "redux/features/policy/policyThunk";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { ToastifyMockify } from "utils";
import { Form } from "antd";
import { IFetchedProjectData } from "types/Project";
import { toast } from "react-toastify";
const PolicyController = () => {
  const { policy, loading } = useAppSelector((state) => state.policy);
  const { project } = useAppSelector((state) => state.project )
  const [ key, setKey ] = React.useState<number>(0);
  const [ currentStep, setCurrentStep ] = React.useState<number>(0);
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
    setCurrentStep(0);
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


  const handleFormChange = (value : string, type: string, index: number) => {
    console.log(value, type, index)
    switch(type){
      case "action":
        selectedPolicy.actions[index] = value;
        break;
      case "resource":
        selectedPolicy.resources[index] = value;
        break;
      case "role":
        selectedPolicy.roles[index] = value;
        break;
    }
    setSelectedPolicy({
      ...selectedPolicy
    })
  };

  // create events
  const handleShowCreatePolicyModal = () => {
    // after create done 
    // if(policy.length === 1){
    //   toast.info("Cannot create new policy, only one policy per project")
    // } else {
    //   setCurrentStep(0);
    //   setShowCreateModal(true);
    // }
    setCurrentStep(0);
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

  // steps
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  }

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  }

  // form steps handlers 
  const handleAdd =  (value : string, type : string) => {
    switch(type){
      case "action":
        selectedPolicy.actions.push(value);
        break;
      case "resource":
        selectedPolicy.resources.push(value);
        break;
      case "role":
        selectedPolicy.roles.push(value);
        break;
    }
    setSelectedPolicy({...selectedPolicy});
  }

  const handleRemove = (index : number , type: string ) => {
    switch(type){
      case "action":
        setSelectedPolicy({
          ...selectedPolicy,
          actions: selectedPolicy.actions.filter((_, i) => i !== index) 
        });
        break;
      case "resource":
        setSelectedPolicy({
          ...selectedPolicy,
          resources: selectedPolicy.resources.filter((_, i) => i !== index) 
        });
        break;
      case "role":
        setSelectedPolicy({
          ...selectedPolicy,
          roles: selectedPolicy.roles.filter((_, i) => i !== index)
        });
        break;
    }
  }


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

    // steps
    currentStep,
    nextStep,
    prevStep,

    // add or remove
    handleAdd,
    handleRemove

  }
}

export default PolicyController;