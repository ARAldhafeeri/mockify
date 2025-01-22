import { IPolicy, IPolicyRepository } from "../entities/policy";
import { Repository } from "./generic";

class PolicyRepository
  extends Repository<IPolicy>
  implements IPolicyRepository {}

export default PolicyRepository;
