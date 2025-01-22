import { IResService } from "../entities/resource";
import { IResource } from "../entities/resource";
import { Service } from "./generic";

class ResourceService extends Service<IResource> implements IResService {}

export default ResourceService;
