import { IEvent, IEventRepository } from "../entities/event";
import { IResService } from "../entities/resource";
import { IEventService } from "../entities/event";
import events from "../events";
import { IEdgeService } from "../entities/edge";

import { Service } from "./generic";

class EventService extends Service<IEvent> implements IEventService {
  resourceService: IResService;
  edgeService: IEdgeService;
  repository: IEventRepository;
  constructor(
    resourceService: IResService,
    edgeService: IEdgeService,
    repository: IEventRepository
  ) {
    super(repository);
    this.resourceService = resourceService;
    this.edgeService = edgeService;
    this.repository = repository;
  }

  dynamicallyAddEvent = async (event: any): Promise<any> => {
    events.on(event?._id, async (eventData: any) => {
      const edge = await this.edgeService.findOne({ name: event?.handler });
      // add line of code eventData to edge.code
      edge.code = `eventData = ${JSON.stringify(eventData)};` + edge.code;
      this.edgeService.runFunctionInContext(edge.code, true, null);
    });
  };

  dynamicallyRemoveEvent = async (event: any): Promise<any> => {
    events.removeAllListeners(event?._id);
  };

  dynamicallyAddAllEventsOnRuntime = async (): Promise<any> => {
    const events = await this.repository.find({}, {});
    events.forEach(async (event: IEvent) => {
      await this.dynamicallyAddEvent(event);
    });
  };

  dyamicallyUpdateEventInRunTime = async (
    event: IEvent,
    old: IEvent
  ): Promise<any> => {
    await this.dynamicallyRemoveEvent(old);
    await this.dynamicallyAddEvent(event);
  };
}

export default EventService;
