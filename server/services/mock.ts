import Data from "../models/Data";
import DataModel from "../models/Data";
import {Types} from "mongoose";
import { IData } from "../types/Data";
import ResourceService from "./resource";
import { 
  IEndpointFeatures, 
  IResService, 
  IResource, 
  ISchemaField
} from "../types/Resource";
import { 
  IFilterParams, 
  IMockService, 
  IPaginateParams, 
  IPaginatedResponse, 
  ISearchParams, 
  IValidateParams, 
  IMockFieldsMap
} from "../types/Mock";

const {ObjectId} = Types;



class MockService implements IMockService  {
  /**
   * keep in mind that this service provide multiple services for /mock
   * 1. should be queried separately
   * 2. should not be queried together
   * 3. filter will return all data that match the filter
   * 4. search will return all data that match the search
   * 5. paginate will return all data that match the pagination
   * 6. validate will validate the data against the schema defined in the resource
   * 7. requests should have params only for the feature they are querying 
   */

  resourceService: IResService;

  constructor() {
    this.resourceService = new ResourceService();
  }

  isNumber = (value: string): boolean => {
    return isNaN(parseInt(value)) == false;
  }


  isPaginated = (data: IEndpointFeatures, params: IPaginateParams): boolean => {
    return (data?.pagination && this.isNumber(params.page) && this.isNumber(params.limit));
  }

  isFilter = (data: IEndpointFeatures, params: IFilterParams): boolean => {
    return (data?.filter && Boolean(params.name)  && Boolean(params.value));
  }

  isSearch(data: IEndpointFeatures, params: ISearchParams): boolean {
    return (data?.search && Boolean(params.search));
  }


  paginatedQuery= async (projection: Object, params: IPaginateParams): Promise<IPaginatedResponse> => {
      
    const page = parseInt(params.page);
    const limit = parseInt(params.limit);
    const startIndex = (page - 1) * limit;

    const results = await DataModel.find(projection).limit(limit).skip(startIndex).exec();

    const total = await DataModel.countDocuments();

    return Promise.resolve({
      total: total,
      page: page,
      limit: limit,
      data: results
    });
  }

  searchQuery = async (data: string): Promise<any> => {
    
    const results = await DataModel.find(
      {
        $text: {
          $search: data
        }
      }
      ).exec();

      return results;
      
      
  }


  filterQuery = async (projection: Object): Promise<any> => {
    // projection is {filterName: filterValue}
    const results = await DataModel.find(projection);

    return results;
  }


  getSchemaFieldTypeMap = ( schema : IResource["fields"] ) : IMockFieldsMap => {
    const fieldTypesMap : IMockFieldsMap = new Map();
    schema.forEach(
      (field : any) => {
        fieldTypesMap.set(field.name, field.type);;    
      });

    return fieldTypesMap;

  }

  validateMockData = async (data: any, fields: IResource["fields"], resource: string): Promise<any> => {
    let fieldsTypes: IMockFieldsMap = this.getSchemaFieldTypeMap(fields);
    // missing required fields, incorrect types
    let status : boolean = true;
    fieldsTypes.forEach((value : string , key : any) => {
      let  fieldIsRequired = (fields.find((field : any) => field.name == key) as any).required;
      let  fieldIsRequiredAndDoesNotExist = (!(key in data)) && fieldIsRequired;
      if( fieldIsRequiredAndDoesNotExist )  status =  false;
      if(typeof data[key] != fieldsTypes.get(key) ) status = false;
    })

    // extra fields
    Object.keys(data ?? {}).forEach((key) => {
      let fieldExists = fieldsTypes.has(key);
      if (!fieldExists) status =  false;
    })
    return status;
  }

  validateAndCreateQuery = async (data: any, fields: IResource["fields"], resource: string): Promise<any> => {
    
    let dataIsValid = await this.validateMockData(data, fields, resource);

    if(!dataIsValid) return false;

    const results = await DataModel.create(
      {data : data, resource: resource}
      );
    return results;
  }

  validateAndUpdateQuery = async (data: any, fields: IResource["fields"], resource: string): Promise<any> => {
    
    let dataIsValid  = await this.validateMockData(data, fields, resource);
    
    if(!dataIsValid) return false;

    const results = await DataModel.create(
      {data : data, resource: resource}
      );
    return results;
  }


  find = async ( projection: Object) : Promise<any> => {

    const found = await DataModel.find( 
       projection
       )
    
    return found;
  }

  
  create = async (d: IData) : Promise<any>  => {
    
    let resource = await this.resourceService.findById(d.resource);

    if (!resource) return false;

    let fieldsNames : Array<string> = [];

    resource.fields.forEach((field : {name: string, type: string, required: string}) => {
      fieldsNames.push(field.name);
    });

    Object.keys(d?.data ?? {}).forEach((key) => {
      if (!fieldsNames.includes(key)) return false;
    })

    const dNew = new DataModel(d);
    const dCreated = await dNew.save();
    return dCreated;
  }

  update = async (d: IData) : Promise<any> => {
    
    const dUpdated = await DataModel.findOneAndUpdate(
      { _id: d._id },
      d,
      { new: true }
    );

    return dUpdated;
  }

  delete = async (id: Types.ObjectId) : Promise<any> => {
    
    const dDeleted = await DataModel.findByIdAndDelete(id);

    return dDeleted;
  }

  findOrCreate = async (data: IData) : Promise<any> => {
    const found = await DataModel.findOne({resource: data?.resource});
    
    if (found) {
      return found;
    }

    const NEW = new DataModel(data);
    const created = await NEW.save();
    return created;
  }
  
}

export default MockService;