import {ExecutionContext, UseGuards, CanActivate, UnauthorizedException, Injectable} from '@nestjs/common';
import {WsException} from '@nestjs/websockets';
import {isNullOrUndefined} from 'support/type.helper';
import {RequestUserService} from 'infrastructure/services/request-user.service';
import {IncomingHttpHeaders} from 'http';

@Injectable()
export class WsAuthGuard implements CanActivate {
    public constructor(private readonly requestUserService: RequestUserService) {}

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const headers = this.extractHttpHeaders(context);

        const requestUser = await this.requestUserService.getUserDataByHttpHeaders(headers);

        if (isNullOrUndefined(requestUser)) {
            throw new WsException(new UnauthorizedException());
        }

        return true;
    }

    private extractHttpHeaders(context: ExecutionContext): IncomingHttpHeaders {
        return context.switchToWs().getClient().handshake.headers;
    }
}

export const WsAuth = () => UseGuards(WsAuthGuard);
