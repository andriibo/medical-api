import {Inject} from '@nestjs/common';
import {IAuthService} from 'app/modules/auth/services/auth.service';
import {IRequestUserModel} from 'app/modules/auth/models';
import {TokenClaimsModel} from 'infrastructure/aws/cognito/token-claims.model';
import {isNullOrUndefined} from 'app/support/type.helper';
import {IncomingHttpHeaders} from 'http';

export class RequestUserService {
    public constructor(@Inject(IAuthService) private readonly authService: IAuthService) {}

    public async getUserDataByHttpHeaders(headers: IncomingHttpHeaders): Promise<IRequestUserModel | null> {
        const token: string = this.extractToken(headers);

        try {
            const tokenClaims = await this.authService.getUserByToken(token);

            return {
                token,
                tokenClaims: TokenClaimsModel.fromCognitoResponse(tokenClaims),
            };
        } catch {
            return null;
        }
    }

    private extractToken(headers: IncomingHttpHeaders): string {
        const token: string = headers?.authorization?.replace('Bearer ', '');

        return isNullOrUndefined(token) ? '' : token;
    }
}
