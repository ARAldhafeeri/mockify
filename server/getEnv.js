"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = exports.WEB_SOCKET_PORT = exports.REDIS_PASSWORD = exports.REDIS_URL = exports.ADMIN_PSWD = exports.ADMIN_USERNAME = exports.domain = exports.JWT_EXPIRES_IN = exports.SUPER_ADMIN_EMAIL = exports.SUPER_ADMIN_PSWD = exports.SUPER_ADMIN_USERNAME = exports.DATABASE_URL = exports.SECRET_KEY_FILES_256BIT = exports.SECRET_KEY = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.SECRET_KEY = `${process.env.SECRET_KEY}`;
exports.SECRET_KEY_FILES_256BIT = `${process.env.SECRET_KEY_FILES_256BIT}`;
exports.DATABASE_URL = `${process.env.DATABASE_URL}`;
exports.SUPER_ADMIN_USERNAME = `${process.env.SUPER_ADMIN_USERNAME}`;
exports.SUPER_ADMIN_PSWD = `${process.env.SUPER_ADMIN_PSWD}`;
exports.SUPER_ADMIN_EMAIL = `${process.env.SUPER_ADMIN_EMAIL}`;
exports.JWT_EXPIRES_IN = `${process.env.JWT_EXPIRES_IN}`;
exports.domain = `${process.env.DOMAIN}`;
exports.ADMIN_USERNAME = `${process.env.ADMIN_USERNAME}`;
exports.ADMIN_PSWD = `${process.env.ADMIN_PSWD}`;
//  redis
exports.REDIS_URL = `${process.env.REDIS_URL}`;
exports.REDIS_PASSWORD = `${process.env.REDIS_PASSWORD}`;
// websocket
exports.WEB_SOCKET_PORT = parseInt(`${process.env.WEB_SOCKET_PORT}`);
exports.ENV = `${process.env.ENV}`;
