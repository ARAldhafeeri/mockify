import express from 'express';
import { getPolicy, deletePolicy, updatePolicy, createPolicy } from '../controllers/policy';
import { POLICY_ROUTE } from '../config/routes';
import authenticationMiddleWareAdminPortal from '../middleware/authentication';
import authorization from '../middleware/authorization';
const policyRouter = express.Router();

policyRouter.use(authenticationMiddleWareAdminPortal)
policyRouter.use(authorization(["policy"], ["read", "write", "delete", "update"]));
policyRouter.get( POLICY_ROUTE, getPolicy)
  .post( POLICY_ROUTE, createPolicy)
  .put( POLICY_ROUTE, updatePolicy)
  .delete( POLICY_ROUTE, deletePolicy);

export default policyRouter;
