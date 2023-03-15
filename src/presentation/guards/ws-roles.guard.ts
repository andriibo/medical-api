import {
    ExecutionContext,
    UseGuards,
    CanActivate,
    UnauthorizedException,
    Injectable,
    applyDecorators,
    SetMetadata,
} from '@nestjs/common';
import {WsException} from '@nestjs/websockets';
import {isNullOrUndefined} from 'app/support/type.helper';
import {RequestUserService} from 'infrastructure/services/request-user.service';
import {Reflector} from '@nestjs/core';
import {IRequestUserModel} from 'app/modules/auth/models';

@Injectable()
export class WsRolesGuard implements CanActivate {
    public constructor(private reflector: Reflector, private readonly requestUserService: RequestUserService) {}

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const requestUser = await this.getRequestUser(context);

        const allowedRoles = this.reflector.get<string[]>('roles', context.getHandler());

        if (!allowedRoles.length) {
            return true;
        }

        const userRoles: string[] = requestUser.accessTokenClaims.getRoles();

        for (const allowedRole of allowedRoles) {
            if (userRoles.includes(allowedRole)) {
                return true;
            }
        }

        throw new WsException(new UnauthorizedException());
    }

    private async getRequestUser(context: ExecutionContext): Promise<IRequestUserModel> {
        const headers = context.switchToWs().getClient().handshake.headers;

        const requestUser = await this.requestUserService.getUserDataByHttpHeaders(headers);

        if (isNullOrUndefined(requestUser)) {
            throw new WsException(new UnauthorizedException());
        }

        return requestUser;
    }
}

export const WsRoles = (...roles: string[]) => applyDecorators(SetMetadata('roles', roles), UseGuards(WsRolesGuard));
