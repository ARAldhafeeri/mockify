import adminModel from "./models/User";
import PasswordService from "./services/password";
import { superAdmin } from "./config/roles";

import { SUPER_ADMIN_PSWD, SUPER_ADMIN_EMAIL, SUPER_ADMIN_USERNAME } from "./getEnv";
var superAdminDefaultData;
const passwordService = new PasswordService();

(async function() {
    [superAdminDefaultData] = await adminModel.find({username: SUPER_ADMIN_USERNAME})

    if (!superAdminDefaultData) {
        
        const {hashedPassword, salt} = await passwordService.createPassword(SUPER_ADMIN_PSWD)
        superAdminDefaultData = {
            username: SUPER_ADMIN_USERNAME,
            email: SUPER_ADMIN_EMAIL,
            role: superAdmin  || 'superAdmin',
            hashedPassword: hashedPassword,
            salt: salt,
            createdBy: "system"
        }
    
        superAdminDefaultData = await adminModel.create(superAdminDefaultData)
}})();


export const DefaultData = superAdminDefaultData;