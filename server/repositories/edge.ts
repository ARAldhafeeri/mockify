import { IEdge, IEdgeRepository } from "../entities/edge";
import { Repository } from "./generic";

class EdgeRepository extends Repository<IEdge> implements IEdgeRepository {}

export default EdgeRepository;
