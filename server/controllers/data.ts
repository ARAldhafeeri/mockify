import { IDataController } from "../entities/data";
import DataService from "../services/data";
import Controller from "./generic";

class DataController
  extends Controller<DataService>
  implements IDataController {}

export default DataController;
