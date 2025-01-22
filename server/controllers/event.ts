import { IEventController, IEventService } from "../entities/event";
import EventService from "../services/event";
import Controller from "./generic";

class EventController
  extends Controller<IEventService>
  implements IEventController {}

export default EventController;
