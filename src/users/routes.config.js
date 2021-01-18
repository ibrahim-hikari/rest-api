'use strict';

require('dotenv').config();

const UserController = require('./controller/users.controllers');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');

const ADMIN = process.env.permissionLevels_ADMIN;
const PAID = process.env.permissionLevels_PAID_USER;
const FREE = process.env.permissionLevels_NORMAL_USER;

exports.routesConfig = function (app) {
    app.post('/users', [
        UserController.insert
    ]);

    app.put('/users/:userId', [
        UserController.update
    ]);

    app.get('/users', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        UserController.list
    ]);

    app.get('/users/:userId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        UserController.getById
    ]);

    app.patch('/users/:userId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        UserController.patchById
    ]);

    app.delete('/users/userId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        UserController.removeById
    ]);
};