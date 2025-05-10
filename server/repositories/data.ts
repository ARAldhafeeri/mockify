import { IData, IDataRepository } from "../entities/data";

import { Repository } from "./generic";

class DataRepository extends Repository<IData> implements IDataRepository {}

export default DataRepository;
