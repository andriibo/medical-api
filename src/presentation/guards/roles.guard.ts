import {
    Injectable,
    CanActivate,
    ExecutionContext,
    SetMetadata,
    Inject,
    UnauthorizedException,
    UseGuards,
    applyDecorators,
} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {IAuthService} from 'app/services/auth.service';
import {CLAIMS} from 'infrastructure/aws/cognito.service';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, @Inject(IAuthService) private readonly authService: IAuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token: string = request.headers?.authorization?.replace('Bearer ', '');
        if (this.isNullOrUndefined(token)) {
            throw new UnauthorizedException();
        }

        try {
            const tokenClaims = await this.authService.getTokenClaims(token);
            const userRoles: string[] = tokenClaims[CLAIMS.ROLES];

            const roles = this.reflector.get<string[]>('roles', context.getHandler());
            if (!roles) {
                return true;
            }

            return roles.some((role) => userRoles.includes(role));
        } catch {
            throw new UnauthorizedException();
        }
    }

    private isNullOrUndefined(value: string): boolean {
        return value === null || value === undefined;
    }
}

export const Roles = (...roles: string[]) => applyDecorators(SetMetadata('roles', roles), UseGuards(RolesGuard));
