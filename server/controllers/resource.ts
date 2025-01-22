import { IResourceController, IResService } from "../entities/resource";
import Controller from "./generic";

class ResourceController
  extends Controller<IResService>
  implements IResourceController {}

export default ResourceController;
