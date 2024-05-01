import React from "react";
import { IFetchedPolicyData } from "types/Policy";
import { fetchPolicy, deletePolicy, updatePolicy, createPolicy } from "redux/features/policy/policyThunk";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { ToastifyMockify } from "utils";
import { Form } from "antd";
import { IFetchedProjectData } from "types/Project";
import { toast } from "react-toastify";
import ProjectService from "./Project";
const PolicyService = () => {
  const { policy, loading } = useAppSelector((state) => state.policy);
  const { project } = useAppSelector((state) => state.project);
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

  const resetCreate = () => {
    setSelectedPolicy({
      project: "",
      resources: [],
      actions: [],
      roles: [],
      policies:[],
    });
    form.resetFields();
    setCurrentStep(0);
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
    selectedPolicy.project = projectID;
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
    switch(type){
      case "action":
        setSelectedPolicy({
          ...selectedPolicy, 
          actions: selectedPolicy.actions.map((action, i) => i === index ? value : action)
        })
        break;
      case "resource":
        setSelectedPolicy({
          ...selectedPolicy, 
          resources: selectedPolicy.resources.map((resource, i) => i === index ? value : resource)
        })
        break;
      case "role":
        setSelectedPolicy({
          ...selectedPolicy,
          roles: selectedPolicy.roles.map((role, i) => i === index ? value : role)
        })
        break;
    }
    
  };

  // create events
  const handleShowCreatePolicyModal = () => {
    // after create done 
    if(policy.length === 1){
      toast.info("Cannot create new policy, only one policy per project")
    } else {
      resetCreate();
      setCurrentStep(0);
      setShowCreateModal(true);
    }
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
        setSelectedPolicy({
          ...selectedPolicy,
          actions: [...selectedPolicy.actions, value]
        });
        break;
      case "resource":
        setSelectedPolicy({
          ...selectedPolicy,
          resources: [...selectedPolicy.resources, value]
        });
        break;
      case "role":
        setSelectedPolicy({
          ...selectedPolicy,
          roles: [...selectedPolicy.roles, value]
        });
        break;
    }
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

  // policies

  const handleFormChangePolicies = (
    value: string, 
    valueIndex: number, 
    policyIndex : number, 
    type: string 
    ) => {
    switch(type){
      case "action":
        setSelectedPolicy({
          ...selectedPolicy,
          policies: selectedPolicy.policies.map((policy,i) => i === policyIndex ? {
                ...policy,
                can: policy.can.map((reso, j) => j === valueIndex ? value : reso)
              } : policy
            )
          });
        break;
      case "resource":
        setSelectedPolicy({
          ...selectedPolicy,
          policies: selectedPolicy.policies.map((policy,i) => i === policyIndex ? {
                ...policy,
                on: policy.on.map((reso, j) => j === valueIndex ? value : reso)
              } : policy
            )
          });
        break;
      case "role":
        setSelectedPolicy({
          ...selectedPolicy,
          policies: selectedPolicy.policies.map((policy,i) => i === policyIndex ? {
                ...policy,
                role: value
              } : policy
            )
          });
        break;
    }
    
  };


    // form steps handlers 
    const handleAddPolicies =  (
      value: any, 
      policyIndex : number, 
      type: string 
     ) => {
      switch(type){
        case "action":
          setSelectedPolicy({
            ...selectedPolicy,
            policies: selectedPolicy.policies.map((policy,i) => i === policyIndex ? {
                  ...policy,
                  can: [...policy.can, value]
                } : policy
              )
            });
          break;
        case "resource":
          setSelectedPolicy({
            ...selectedPolicy,
            policies: selectedPolicy.policies.map((policy,i) => i === policyIndex ? {
                  ...policy,
                  on: [...policy.on, value]
                } : policy
              )
            });
          break;
        case "policy":
          setSelectedPolicy({
            ...selectedPolicy,
            policies: [...selectedPolicy.policies, value]
          });
          break;
      }
    }
  
    const handleRemovePolicies = (
      valueIndex: number, 
      policyIndex : number, 
      type: string 
     ) => {
      switch(type){
        case "action":
          setSelectedPolicy({
            ...selectedPolicy,
            policies: selectedPolicy.policies.map((policy,i) => i === policyIndex ? {
                  ...policy,
                  can: policy.can.filter((_, j) => j !== valueIndex)
                } : policy
              )
            });
          break;
        case "resource":
          setSelectedPolicy({
            ...selectedPolicy,
            policies: selectedPolicy.policies.map((policy,i) => i === policyIndex ? {
                  ...policy,
                  on: policy.on.filter((_, j) => j !== valueIndex)
                } : policy
              )
            });
          break;
        case "policy":
          setSelectedPolicy({
            ...selectedPolicy,
            policies: selectedPolicy.policies.filter((_, i) => i !== policyIndex)
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
    handleRemove,

    // policies
    handleFormChangePolicies,
    handleAddPolicies,
    handleRemovePolicies,

  }
}

export default PolicyService;