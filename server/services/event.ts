import Event from "../models/Event";
import EventModel from "../models/Event";
import {Types} from "mongoose";
import { IEvent } from "../types/Event";
import ResourceService from "./resource";
import { IResService } from "../types/Resource";
import { IEventService } from "../types/Event";
import events from "../events";
import { IEdgeService } from "../types/Edge";
import EdgeService from "./Edge";
const {ObjectId} = Types;


class EventService implements IEventService  {

  resourceService: IResService;
  edgeService: IEdgeService;

  constructor() {
    this.resourceService = new ResourceService();
    this.edgeService = new EdgeService();
  }

  find = async ( projection: Object) : Promise<any> => {

    const found = await EventModel.find( 
       projection
       )
    
    return found;
  }

  findOne = async ( projection: Object) : Promise<any> => {
    const foundRes = await EventModel.findOne( 
       projection
       ).lean();
    
    return foundRes;
  }


  create = async (event: IEvent) : Promise<any>  => {
    
    let resource = await this.resourceService.findById(event.resource);

    if (!resource) return false;

    const dNew = new EventModel(event);
    const dCreated = await dNew.save();
    return dCreated;
  }

  update = async (event: IEvent) : Promise<any> => {
    
    const dUpdated = await EventModel.findOneAndUpdate(
      { _id: event?._id },
      event,
      { new: true }
    );

    return dUpdated;
  }

  delete = async (id: Types.ObjectId) : Promise<any> => {
    
    const dDeleted = await EventModel.findByIdAndDelete(id);

    return dDeleted;
  }

  findOrCreate = async (event: IEvent) : Promise<any> => {
    const found = await EventModel.findOne({resource: event?.resource});
    
    if (found) {
      return found;
    }

    const NEW = new EventModel(event);
    const created = await NEW.save();
    return created;
  }

  dynamicallyAddEvent = async (event: IEvent) : Promise<any> => {
    events.on(event?.name, async (eventData: any) => {
      const edge = await this.edgeService.findOne({name: event?.handler})
      // add line of code eventData to edge.code
      edge.code = `eventData = ${JSON.stringify(eventData)};` + edge.code;
      this.edgeService.runFunctionInContext(edge.code, true, null);
    })
  }

  dynamicallyRemoveEvent = async (event: IEvent) : Promise<any> => {
    events.removeAllListeners(event?.name);
  }

  dynamicallyAddAllEventsOnRuntime = async () : Promise<any> => {
    const events = await this.find({});
    events.forEach(async (event: IEvent) => {
      await this.dynamicallyAddEvent(event);
    })

  }

  dyamicallyUpdateEventInRunTime = async (event: IEvent, old: IEvent) : Promise<any> => {
    await this.dynamicallyRemoveEvent(old);
    await this.dynamicallyAddEvent(event);
  }
  
  
}

export default EventService;