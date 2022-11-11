import {ExecutionContext, UseGuards, CanActivate, Inject, UnauthorizedException} from '@nestjs/common';
import {Handshake} from 'socket.io/dist/socket';
import {isNullOrUndefined} from 'app/support/type.helper';
import {IAuthService} from 'app/modules/auth/services/auth.service';
import {ITokenClaimsModel} from 'app/modules/auth/models';
import {TokenClaimsModel} from 'infrastructure/aws/cognito/token-claims.model';

export class WsAuthGuard implements CanActivate {
    public constructor(@Inject(IAuthService) private readonly authService: IAuthService) {}

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const tokenClaims: ITokenClaimsModel = await this.getTokenClaims(context);
        console.log('tokenClaims', tokenClaims);
        if (isNullOrUndefined(tokenClaims)) {
            throw new UnauthorizedException();
        }

        return true;
    }

    private async getTokenClaims(context: ExecutionContext): Promise<ITokenClaimsModel> {
        const token: string = this.extractToken(context);

        try {
            const tokenClaims = await this.authService.getTokenClaims(token);

            return TokenClaimsModel.fromCognitoResponse(tokenClaims);
        } catch {
            return null;
        }
    }

    private extractToken(context: ExecutionContext): string {
        const request: Handshake = context.switchToWs().getClient().handshake;
        const token: string = request.headers?.authorization?.replace('Bearer ', '');

        return isNullOrUndefined(token) ? '' : token;
    }
}

export const WsAuth = () => UseGuards(WsAuthGuard);
