import {
    Injectable,
    ExecutionContext,
    SetMetadata,
    UseGuards,
    applyDecorators,
    UnauthorizedException,
    CanActivate,
} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {UserRequest} from 'presentation/middlewares/assign-user.middleware';
import {isNullOrUndefined} from 'app/support/type.helper';

@Injectable()
export class RolesGuard implements CanActivate {
    public constructor(private reflector: Reflector) {}

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: UserRequest = context.switchToHttp().getRequest();

        if (isNullOrUndefined(request.tokenClaims)) {
            throw new UnauthorizedException();
        }

        const userRoles: string[] = request.tokenClaims.getRoles();
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }

        return roles.some((role) => userRoles.includes(role));
    }
}

export const Roles = (...roles: string[]) => applyDecorators(SetMetadata('roles', roles), UseGuards(RolesGuard));
