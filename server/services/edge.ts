import EdgeModel from "../models/edge";
import { IEdge, IEdgeRepository } from "../entities/edge";
import { IEdgeService } from "../entities/edge";

import { IResource, IResService } from "../entities/resource";
import { Types } from "mongoose";
import CONTEXT from "../sandbox/context";

const { ObjectId } = Types;
import vm from "vm";
import { Service } from "./generic";

class EdgeService extends Service<IEdge> implements IEdgeService {
  private rService: IResService;
  constructor(resourceService: IResService, repository: IEdgeRepository) {
    super(repository);
    this.rService = resourceService;
    this.repository = repository;
  }

  findEdgeFunctionsBYresourceId = async (resourceId: string): Promise<any> => {
    const res: IResource = await this.rService.findById(
      new ObjectId(resourceId)
    );

    if (!res) return false;

    const found = await EdgeModel.find({ resource: res._id });

    return found;
  };

  addImmediatelyInvokedAsync = (code: string): string => {
    /**
     * recieve a code
     * add Immediately Invoked Async Function Expression
     * return the new code
     */
    const newCode = `(async () => { ${code} })()`;
    return newCode;
  };

  cleanUpData = (data: any, projectId: string, resourceId: string): any => {
    /**
     * recieve a data object
     * remove all records that do not relate to resourceId or resourceProjectId
     * return the new data object
     */
    let newData: Array<any> = [];

    for (let i = 0; i < data.length; i++) {
      let entity = data[i];
      if (entity.project) {
        if (entity.project.toString() === projectId) {
          newData.push(entity);
        }
      }
      if (entity.resource) {
        if (entity.resource.toString() === resourceId) {
          newData.push(entity);
        }
      }
    }
    return newData;
  };

  runFunctionInContext = async (
    code: string,
    asyncc = false,
    additionalContext: any = null
  ): Promise<any> => {
    /**
     * recieve a context and code
     * run the code in the context sandbox
     * return the data in the context
     * which is i/o user wants from the code
     * user have access to this context :
     * 1- ResourceModel
     * 2- DataModel
     * 3- ProjectModel
     * 4- PolicyModel
     * 5- and node js modules
     * this might be a security issue - to be tested and hardened
     * but for now we want to give the user the ability to do anything
     * to cover all use cases
     */
    if (additionalContext) {
      Object.assign(CONTEXT, additionalContext);
    }

    if (asyncc) {
      code = this.addImmediatelyInvokedAsync(code);
      vm.createContext(CONTEXT);
      await vm.runInContext(code, CONTEXT);
      let data = CONTEXT.data;
      let safeRes = CONTEXT.safeRes;
      // reset context
      CONTEXT.data = {};
      CONTEXT.safeRes = {
        headers: null,
        httpStatus: null,
        message: null,
        status: null,
      };
      return { data: data, safeRes: safeRes };
    } else {
      vm.createContext(CONTEXT);
      vm.runInContext(code, CONTEXT);
      let data = CONTEXT.data;
      if (code.includes("Model")) {
        data = this.cleanUpData(
          CONTEXT.data,
          additionalContext?.projectId,
          additionalContext?.resourceId
        );
      }
      return data;
    }
  };
}

export default EdgeService;
