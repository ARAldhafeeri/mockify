import { IFetchedCacheData } from './Cache';
import { IFetchedClientData } from './Client';
import { IFetchedDataData } from './Data';
import { IFetchEdgeResponse, IFetchedEdgeData } from './Edge';
import { IFetchedEventData } from './Event';
import { IFetchedPolicyData, IUserDefinedPolicy } from './Policy';
import { IFetchedProjectData } from './Project';
import { IFetchedResourceData } from './Resource';
import { IFetchUserResponse, IFetchedUserData } from './User';

export interface IUserForm {
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFormChangeSelect: (value : string) => void;
  data: IFetchedUserData
  form: any;
  onFinish?: (values: any) => void;
}


export interface IProjectForm {
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFormChangeSelect: (value : string) => void;
  data: IFetchedProjectData
  form: any;
  onFinish?: (values: any) => void;
}

export interface ICacheForm {
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  data: IFetchedCacheData;
  form: any;
  onFinish?: (values: any) => void;
}


export interface IResourceForm {
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement> | boolean | String, name: String | null  | number) => void;
  handleFormChangeFeatures: (e: React.ChangeEvent<HTMLInputElement> | boolean | String, name: String | null  | number) => void;
  handleFormChangeFields: (index: number, name: string, value: string | boolean | number) => void;
  handleAddField: (name : string, type : string, required : boolean) => void;
  handleRemoveField: (index: number) => void;
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  projectOptions: IFetchedProjectData[];
  data: IFetchedResourceData;
  form: any;
  onFinish?: (values: any) => void;
}

export interface IResourceFormGeneralInfoStepProps {
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement> | boolean | String, name: String | null  | number) => void;
  projectOptions: IFetchedProjectData[];
  data: IFetchedResourceData;

}

export interface IResourceFormFeatureStepProps{
  handleFormChangeFeatures: (e: React.ChangeEvent<HTMLInputElement> | boolean | String, name: String | null  | number) => void;
  data: IFetchedResourceData;
}

export interface IResourceFormFieldsStepProps {
  handleAddField: (name : string, type : string, required : boolean) => void;
  handleRemoveField: (index: number) => void;
  handleFormChangeFields: (index: number, name: string, value: string | boolean | number) => void;
  data: IFetchedResourceData;

}
export interface IFieldSchema {
  name: string;
  type: string;
  required: boolean;
}
export interface IDataForm {
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement> | boolean) => void;  data: IFetchedDataData;
  hanldeFormChangeFields: (name : string, value: string, type: string) => void;
  handleFormChangeSelect: (value : string) => void;
  fieldsSchema: Array<IFieldSchema>;
  form: any;
  onFinish?: (values: any) => void;
}

export interface IPolicyForm {
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleFormChange: (value : string, type: string, index: number) => void;
  data: IFetchedPolicyData;
  form: any;
  onFinish?: (values: any) => void;
  projectOptions?: IFetchedProjectData[];
  // steps
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  // add or remove
  handleAdd: (value : string, type: string) => void;
  handleRemove: (index: number, type: string) => void;
  handleFormChangePolicies: (    
    value: string, 
    valueIndex: number, 
    policyIndex : number, 
    type: string ) => void;
  handleAddPolicies: (    
    value: any, 
    policyIndex : number, 
    type: string ) => void;
  handleRemovePolicies: ( valueIndex: number, 
    policyIndex : number, 
    type: string ) => void;
}

export interface IPolicyFieldsStepProps {
  handleAdd: (value : string, type: string) => void;
  handleRemove: (index: number, type: string) => void;
  data: Array<string>;
  handleFormChange: (value : string, type: string, index: number) => void;
  fieldsType: string;
}


export interface IPolicyPolciesStepProps {
  handleFormChangePolicies: (    
    value: string, 
    valueIndex: number, 
    policyIndex : number, 
    type: string ) => void;
  handleAddPolicies: (    
    value: any, 
    policyIndex : number, 
    type: string ) => void;
  handleRemovePolicies: ( valueIndex: number, 
    policyIndex : number, 
    type: string ) => void;
  data: IUserDefinedPolicy[];
  policy?: IFetchedPolicyData
  fieldsType: string;
}

export interface IFormMakerPolicyProps {
  handleFormChange: (value : string, type: string, index: number) => void;
  handleRemove: (value: number, type: string) => void;
  handleAdd: (value: string, type: string) => void;
  data?: any;
  fields?: Array<string> | IUserDefinedPolicy[];
  policy?: IFetchedPolicyData
  fieldsType: string;
  }
  
  export interface IFormMakerPolicyData {
  handleChange:(e: React.ChangeEvent<HTMLInputElement> | boolean) => void;
  data?: any;
  fields?: Array<string>;
  }

  export interface IMethods {
    GET: string;
    POST: string;
    PUT: string;
    DELETE: string;
  }

  export interface IEdgeForm {
    handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleFormChange: (value : string, type: string, index: number) => void;
    data: any;
    form: any;
    onFinish?: (values: any) => void;
    resourceOptions?: IFetchedResourceData[];
    methodOptions?: IMethods;
  }

  export interface IUsersSelectProps {
    handleFormChange: (value : string) => void;
    userOptions?: IFetchUserResponse[];
  }

  export interface IResourceSelectProps {
    handleFormChange: (value : string) => void;
    resourceOptions?: IFetchedResourceData[];
  }

  export interface IEventForm {
    handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleFormChangeSelect: (value : string, type : string) => void;
    data: IFetchedEventData;
    form: any;
    onFinish?: (values: any) => void;
    resource: IFetchedResourceData[];
    edge: IFetchEdgeResponse[];
  }


export interface IClientForm {
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFormChangeSelect: (value : string, type : string) => void;
  data: IFetchedClientData;
  form: any;
  onFinish?: (values: any) => void;
  resource: IFetchedResourceData[];
}



  export interface IEdgeSelectProps {
    handleFormChange: (value : string) => void;
    edgeOptions?: IFetchEdgeResponse[];
  }