import { string } from 'yaml/dist/schema/common/string';


export interface IAPINormalizedResponse {
  data?: Array<any>;
  message: string;
  status: boolean;
}
