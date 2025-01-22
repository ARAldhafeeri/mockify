import { IEvent, IEventRepository } from "../entities/event";
import { Repository } from "./generic";

class EventRepository extends Repository<IEvent> implements IEventRepository {}

export default EventRepository;
