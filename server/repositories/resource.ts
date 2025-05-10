import { IResource, IResourceRepository } from "../entities/resource";

import { Repository } from "./generic";

class ResourceRepository
  extends Repository<IResource>
  implements IResourceRepository {}

export default ResourceRepository;
