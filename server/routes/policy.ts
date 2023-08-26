import express from 'express';
import { getPolicy, deletePolicy, updatePolicy, createPolicy } from '../controllers/policy';
import { POLICY_ROUTE } from '../config/routes';
import authenticationMiddleWareAdminPortal from '../middleware/authentication';
const policyRouter = express.Router();

policyRouter.use(authenticationMiddleWareAdminPortal)
policyRouter.get( POLICY_ROUTE, getPolicy)
  .post( POLICY_ROUTE, createPolicy)
  .put( POLICY_ROUTE, updatePolicy)
  .delete( POLICY_ROUTE, deletePolicy);

export default policyRouter;