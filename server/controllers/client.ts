import ClientService from "../services/client";
import { IClientController } from "../entities/client";
import Controller from "./generic";
import { asyncController } from "../utils/handlers";
class ClientController
  extends Controller<ClientService>
  implements IClientController
{
  verifyClientCredentials = asyncController(async (req, res) => {
    let data = req.body;

    const fetchedData = await super.service.findOne({
      id: data.clientId,
      secret: data.clientSecret,
    });

    return res
      .status(200)
      .json({ data: fetchedData, status: true, message: "success" });
  });
}

export default ClientController;
