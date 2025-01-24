import { Response, Request } from "express";
import { Types } from "mongoose";
import { asyncController } from "../utils/handlers";
import { superAdmin } from "../config/roles";
import Controller from "./generic";
import { IProjectController } from "../entities/project";
import { IProjectService } from "../entities/project";
import CryptoService from "../services/crypto";
import { SECRET_KEY } from "../getEnv";
import jwt from "jsonwebtoken";

const { ObjectId } = Types;

class ProjectController
  extends Controller<IProjectService>
  implements IProjectController
{
  private cryptoService: CryptoService;

  constructor(projectService: IProjectService, cryptoService: CryptoService) {
    super(projectService);
    this.cryptoService = cryptoService;
  }

  fetch = asyncController(async (req: Request, res: Response) => {
    const token = req.headers["authorization"]?.split(" ")[1] as string;
    let authenticatedUserData = jwt.verify(token, SECRET_KEY);
    let userRoleFromToken;
    if (
      typeof authenticatedUserData !== "string" &&
      "role" in authenticatedUserData
    ) {
      userRoleFromToken = authenticatedUserData.role;

      const isSuperAdmin = authenticatedUserData.role === superAdmin;
      const filter = isSuperAdmin
        ? {}
        : { user: new ObjectId(authenticatedUserData.id) };

      const foundProjects = await this.service.find(filter);
      if (!foundProjects) {
        throw new Error("Projects not found");
      }

      return res.status(200).json({
        data: foundProjects,
        status: true,
        message: "Fetching projects was successful",
      });
    }
  });

  create = asyncController(async (req: Request, res: Response) => {
    const data = req.body;
    data.apiKey = await this.cryptoService.generateAPIKey();

    const newProject = await this.service.create(data);
    if (!newProject) {
      throw new Error("Project not created");
    }

    return res.status(200).json({
      data: newProject,
      status: true,
      message: "Project created successfully",
    });
  });

  update = asyncController(async (req: Request, res: Response) => {
    const data = req.body;

    if (data?.apiKey) {
      throw new Error("apiKey cannot be updated");
    }

    const updatedProject = await this.service.update(data);
    if (!updatedProject) {
      throw new Error("Project not updated");
    }

    return res.status(200).json({
      data: updatedProject,
      status: true,
      message: "Project updated successfully",
    });
  });
}

export default ProjectController;
