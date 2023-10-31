import { IFetchedProjectData } from './Project';
import { IFetchedUserData } from './User';

export interface IUserForm {
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  data: IFetchedUserData
  form: any;
  onFinish?: (values: any) => void;
}


export interface IProjectForm {
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  data: IFetchedProjectData
  form: any;
  onFinish?: (values: any) => void;
}