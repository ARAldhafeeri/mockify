import express from 'express';
import { getProjects, deleteProject, updateProjects, createProject, refreshProjectApiKey } from '../controllers/project';
import { PROJECT_ROUTE, PROJECT_ROUTE_REFRESH } from '../config/routes';
import authenticationMiddleWareAdminPortal from '../middleware/authentication';
import authorization from '../middleware/authorization';
const projectRouter = express.Router();


projectRouter
  .get( 
    PROJECT_ROUTE, 
    authenticationMiddleWareAdminPortal,
    authorization(["policy"], ["read", "write", "delete", "update"]),
    getProjects,
  )
  .post( 
    PROJECT_ROUTE, 
    authenticationMiddleWareAdminPortal,
    authorization(["policy"], ["read", "write", "delete", "update"]),
    createProject,
  )
  .put(
     PROJECT_ROUTE, 
     authenticationMiddleWareAdminPortal,
     authorization(["policy"], ["read", "write", "delete", "update"]),
     updateProjects,
  )
  .delete(
     PROJECT_ROUTE, 
     authenticationMiddleWareAdminPortal,
     authorization(["policy"], ["read", "write", "delete", "update"]),
     deleteProject,
  );

projectRouter.post( 
  PROJECT_ROUTE_REFRESH, 
  authenticationMiddleWareAdminPortal,
  authorization(["policy"], ["read", "write", "delete", "update"]),
  refreshProjectApiKey,
  )

export default projectRouter;
