import {Auth, AuthGuard} from './auth.guard';
import {Roles, RolesGuard} from './roles.guard';
import {WsAuth, WsAuthGuard} from './ws-auth.guard';
import {WsRoles, WsRolesGuard} from './ws-roles.guard';
import {WsPatientDataAccess, WsPatientDataAccessGuard} from './ws-patient-data-access.guard';

export {
    AuthGuard,
    Auth,
    RolesGuard,
    Roles,
    WsAuthGuard,
    WsAuth,
    WsRolesGuard,
    WsRoles,
    WsPatientDataAccessGuard,
    WsPatientDataAccess,
};
