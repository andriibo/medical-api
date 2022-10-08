import {Injectable, CanActivate, ExecutionContext, Inject, UseGuards, UnauthorizedException} from '@nestjs/common';
import {IAuthService} from 'app/services/auth.service';
import {TokenClaimsModel} from 'infrastructure/aws/token-claims.model';
import {ITokenClaimsModel} from 'app/models/token-claims.model';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(@Inject(IAuthService) protected readonly authService: IAuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        request.tokenClaims = await this.getTokenClaims(request);

        return true;
    }

    protected async getTokenClaims(request: any): Promise<ITokenClaimsModel> {
        const token: string = this.extractToken(request);

        try {
            const tokenClaims = await this.authService.getTokenClaims(token);

            return TokenClaimsModel.fromCognitoResponse(tokenClaims);
        } catch {
            throw new UnauthorizedException();
        }
    }

    protected extractToken(request: any): string {
        const token: string = request.headers?.authorization?.replace('Bearer ', '');

        if (this.isNullOrUndefined(token)) {
            throw new UnauthorizedException();
        }

        return token;
    }

    private isNullOrUndefined(value: string): boolean {
        return value === null || value === undefined;
    }
}

export const Auth = () => UseGuards(AuthGuard);
