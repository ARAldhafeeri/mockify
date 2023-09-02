export interface IFetchedUserData {
  _id: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
  createdBy: string;
}

export interface IPostedUserData {
  username: string;
  email: string;
  role: string;
}

export interface IDeleteUserData {
  _id: string;
}

export interface IUpdateUserData {
  username: string;
  email: string;
  role: string;
}

export interface IFetchUserResponse {
  message?: string;
  status: boolean;
  data?: IFetchedUserData[]
}

export interface IUserInitState {
  user: [] | IFetchUserResponse
  loading: 'loading' | 'pending' | 'rejected' | true | false;
  error: string | null;
}