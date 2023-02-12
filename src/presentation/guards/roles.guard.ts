import {
    Injectable,
    ExecutionContext,
    SetMetadata,
    UseGuards,
    applyDecorators,
    UnauthorizedException,
    CanActivate,
    Inject,
    ForbiddenException,
} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {UserRequest} from 'presentation/middlewares/assign-user.middleware';
import {isNullOrUndefined} from 'app/support/type.helper';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';

@Injectable()
export class RolesGuard implements CanActivate {
    public constructor(
        @Inject(Reflector) private readonly reflector: Reflector,
        @Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService,
    ) {}

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: UserRequest = context.switchToHttp().getRequest();

        if (isNullOrUndefined(request.user) || isNullOrUndefined(request.user.tokenClaims)) {
            throw new UnauthorizedException();
        }

        const user = await this.authedUserService.getUser();
        if (user.deletedAt !== null) {
            throw new ForbiddenException();
        }

        const userRoles: string[] = request.user.tokenClaims.getRoles();
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }

        return roles.some((role) => userRoles.includes(role));
    }
}

export const Roles = (...roles: string[]) => applyDecorators(SetMetadata('roles', roles), UseGuards(RolesGuard));
