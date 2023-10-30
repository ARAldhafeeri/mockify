import express from 'express';
import { getProjects, deleteProject, updateProjects, createProject, refreshProjectApiKey } from '../controllers/project';
import { PROJECT_ROUTE, PROJECT_ROUTE_REFRESH } from '../config/routes';
import authenticationMiddleWareAdminPortal from '../middleware/authentication';
const projectRouter = express.Router();

projectRouter.use(authenticationMiddleWareAdminPortal)
projectRouter.get( PROJECT_ROUTE, getProjects)
  .post( PROJECT_ROUTE, createProject)
  .put( PROJECT_ROUTE, updateProjects)
  .delete( PROJECT_ROUTE, deleteProject);

projectRouter.post( PROJECT_ROUTE_REFRESH, refreshProjectApiKey)

export default projectRouter;
