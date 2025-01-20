import ClientRepository from "./client";
import ClientModel from "../models/client";

export const clientRepository = new ClientRepository(ClientModel);
