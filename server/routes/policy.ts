import express from 'express';
import { getPolicy, deletePolicy, updatePolicy, createPolicy } from '../controllers/policy';
import { POLICY_ROUTE } from '../config/routes';
import authenticationMiddleWareAdminPortal from '../middleware/authentication';
import authorization from '../middleware/authorization';
const policyRouter = express.Router();


policyRouter
  .get( 
    POLICY_ROUTE, 
    getPolicy,
    authenticationMiddleWareAdminPortal,
    authorization(["policy"], ["read", "write", "delete", "update"])
    )
  .post( 
    POLICY_ROUTE, 
    createPolicy,
    authenticationMiddleWareAdminPortal,
    authorization(["policy"], ["read", "write", "delete", "update"])
    )
  .put( 
    POLICY_ROUTE, 
    updatePolicy,
    authenticationMiddleWareAdminPortal,
    authorization(["policy"], ["read", "write", "delete", "update"])
  )
  .delete( 
    POLICY_ROUTE, 
    deletePolicy,
    authenticationMiddleWareAdminPortal,
    authorization(["policy"], ["read", "write", "delete", "update"])
  );

export default policyRouter;
