import PolicyService from "../services/policy";
import { IPolicyController } from "../entities/policy";
import Controller from "./generic";

class PolicyController
  extends Controller<PolicyService>
  implements IPolicyController {}

export default PolicyController;
