import { ObjectId, Types } from "mongoose";
import { IClient, IClientService } from "../entities/client";
import { ICryptoService } from "../entities/auth";
import CryptoService from "./crypto";
import { Service } from "./generic";
import ClientRepository from "../repositories/client";

class ClientService extends Service<IClient> implements IClientService {
  private cryptoService: ICryptoService;
  constructor(repo: ClientRepository, cryptoService: CryptoService) {
    super(repo);

    this.cryptoService = cryptoService;
  }

  generateClientCredentials = async (): Promise<any> => {
    return {
      id: (
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
      ).toString(),
      secret: await this.cryptoService.generateAPIKey(),
    };
  };

  findClientsByPorjectId = async (projectId: Types.ObjectId): Promise<any> => {
    const found = this.repository.findOne({ project: projectId });
    return found;
  };
}

export default ClientService;
