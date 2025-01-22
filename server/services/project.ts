import { IProjectService } from "../entities/project";
import { IProject } from "../entities/project";
import { Service } from "./generic";

class ProjectService extends Service<IProject> implements IProjectService {}

export default ProjectService;
