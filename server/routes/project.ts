import express from 'express';
import { getProjects, deleteProject, updateProjects, createProject, refreshProjectApiKey } from '../controllers/project';
import { PROJECT_ROUTE, PROJECT_ROUTE_REFRESH } from '../config/routes';
import authenticationMiddleWareAdminPortal from '../middleware/authentication';
import authorization from '../middleware/authorization';
const projectRouter = express.Router();


projectRouter
  .get( 
    PROJECT_ROUTE, getProjects,
    authenticationMiddleWareAdminPortal,
    authorization(["project"], ["read", "write", "delete", "update"])
  )
  .post( 
    PROJECT_ROUTE, createProject,
    authenticationMiddleWareAdminPortal,
    authorization(["project"], ["read", "write", "delete", "update"])
  )
  .put(
     PROJECT_ROUTE, updateProjects,
     authenticationMiddleWareAdminPortal,
     authorization(["project"], ["read", "write", "delete", "update"])
  )
  .delete(
     PROJECT_ROUTE, deleteProject,
     authenticationMiddleWareAdminPortal,
     authorization(["project"], ["read", "write", "delete", "update"])
  );

projectRouter.post( 
  PROJECT_ROUTE_REFRESH, refreshProjectApiKey,
  authenticationMiddleWareAdminPortal,
  authorization(["project"], ["read", "write", "delete", "update"])
  )

export default projectRouter;
