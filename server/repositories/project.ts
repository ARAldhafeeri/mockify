import { IProject, IProjectRepository } from "../entities/project";

import { Repository } from "./generic";

class ProjectRepository
  extends Repository<IProject>
  implements IProjectRepository {}

export default ProjectRepository;
