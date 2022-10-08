import {Injectable, ExecutionContext, SetMetadata, Inject, UseGuards, applyDecorators} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {IAuthService} from 'app/services/auth.service';
import {AuthGuard} from './auth.guard';

@Injectable()
export class RolesGuard extends AuthGuard {
    constructor(@Inject(IAuthService) protected readonly authService: IAuthService, private reflector: Reflector) {
        super(authService);
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        request.tokenClaims = await this.getTokenClaims(request);

        const userRoles: string[] = request.tokenClaims.getRoles();

        const roles = this.reflector.get<string[]>('roles', context.getHandler());

        if (!roles) {
            return true;
        }

        return roles.some((role) => userRoles.includes(role));
    }
}

export const Roles = (...roles: string[]) => applyDecorators(SetMetadata('roles', roles), UseGuards(RolesGuard));
