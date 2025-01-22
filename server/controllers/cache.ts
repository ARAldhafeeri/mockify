import { ICacheController, ICacheService } from "../entities/cache";
import { asyncController } from "../utils/handlers";

class CacheController implements ICacheController {
  private service;

  constructor(service: ICacheService) {
    this.service = service;
  }

  getCache = asyncController(async (req, res) => {
    let projectId = req.params.projectId as string;

    let key = req.query.key as string;

    let tenantKey = this.service.addProjectNameToKey(projectId, key);
    let data: any;
    if (key) {
      data = await this.service.get(tenantKey);
    } else {
      data = await this.service.getAllProjectDataJSON(projectId);
    }

    return res
      .status(200)
      .json({ data: data, status: true, message: "success" });
  });

  setCacheKey = asyncController(async (req, res) => {
    let key = req.query.key as string;

    let body: any = req.body;

    let projectId = req.params.projectId as string;

    let tenantKey = this.service.addProjectNameToKey(projectId, key);

    const seted = await this.service.set(tenantKey, body.value);

    return res.status(200).json({
      data: { key: key, value: body.value },
      status: true,
      message: "success",
    });
  });

  deleteCacheKey = asyncController(async (req, res) => {
    let key = req.query.key as string;

    let projectId = req.params.projectId as string;

    let tenantKey = this.service.addProjectNameToKey(projectId, key);

    await this.service.del(tenantKey);

    return res.status(200).json({
      key: key,
      status: true,
      message: "success",
    });
  });
}

export default CacheController;
