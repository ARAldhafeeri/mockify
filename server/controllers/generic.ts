import { Request, Response } from "express";
import { asyncController } from "../utils/handlers";

class Controller<T> {
  constructor(protected service: T) {
    this.service = service;
  }

  fetch = asyncController(async (req: Request, res: Response) => {
    const { projectId, resourceId } = req.query;
    const query = projectId
      ? { project: projectId, userUID: req.userUID }
      : { resource: resourceId, userUID: req.userUID };
    const data = await (this.service as any).find(query);
    res.status(200).json({ data, status: true, message: "Data fetched" });
  });

  search = asyncController(async (req: Request, res: Response) => {
    const query = req.body.payload as string;
    const data = await (this.service as any).search(
      query,
      req.userUID as string
    );
    res.status(200).json({ data, status: true, message: "Search results" });
  });

  create = asyncController(async (req: Request, res: Response) => {
    const data = await (this.service as any).create(
      req.body,
      req.userUID as string
    );
    res
      .status(201)
      .json({ data, status: true, message: "Created successfully" });
  });

  update = asyncController(async (req: Request, res: Response) => {
    const data = await (this.service as any).update(
      req.body,
      req.userUID as string,
      req.query.id as string
    );
    res
      .status(200)
      .json({ data, status: true, message: "Updated successfully" });
  });

  delete = asyncController(async (req: Request, res: Response) => {
    const data = await (this.service as any).delete(
      req.query.id as string,
      req.userUID as string
    );
    res
      .status(200)
      .json({ data, status: true, message: "Deleted successfully" });
  });
}

export default Controller;
