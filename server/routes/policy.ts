import express from 'express';
import { getPolicy, deletePolicy, updatePolicy, createPolicy } from '../controllers/policy';
import { POLICY_ROUTE } from '../config/routes';
import authenticationMiddleWareAdminPortal from '../middleware/authentication';
import authorization from '../middleware/authorization';
const policyRouter = express.Router();


policyRouter
  .get( 
    POLICY_ROUTE, 
    authenticationMiddleWareAdminPortal,
    authorization(["policy"], ["read", "write", "delete", "update"]),
    getPolicy,

    )
  .post( 
    POLICY_ROUTE, 
    authenticationMiddleWareAdminPortal,
    authorization(["policy"], ["read", "write", "delete", "update"]),
    createPolicy,
    )
  .put( 
    POLICY_ROUTE, 
    authenticationMiddleWareAdminPortal,
    authorization(["policy"], ["read", "write", "delete", "update"]),
    updatePolicy,
  )
  .delete( 
    POLICY_ROUTE, 
    authenticationMiddleWareAdminPortal,
    authorization(["policy"], ["read", "write", "delete", "update"]),
    deletePolicy,
  );

export default policyRouter;
