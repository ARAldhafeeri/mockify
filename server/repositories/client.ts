import { IClient, IClientRepository } from "../entities/client";
import { Repository } from "./generic";

class ClientRepository
  extends Repository<IClient>
  implements IClientRepository {}

export default ClientRepository;
