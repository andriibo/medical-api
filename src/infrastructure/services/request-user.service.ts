import {Inject} from '@nestjs/common';
import {IAuthService} from 'app/modules/auth/services/auth.service';
import {IRequestUserModel} from 'app/modules/auth/models';
import {AccessTokenClaimsModel} from 'infrastructure/aws/cognito/access-token-claims.model';
import {isNullOrUndefined} from 'support/type.helper';
import {IncomingHttpHeaders} from 'http';

export class RequestUserService {
    public constructor(@Inject(IAuthService) private readonly authService: IAuthService) {}

    public async getUserDataByHttpHeaders(headers: IncomingHttpHeaders): Promise<IRequestUserModel | null> {
        const accessToken: string = this.extractAccessToken(headers);

        try {
            const tokenClaims = await this.authService.getAccessTokenClaimsByAccessToken(accessToken);

            return {
                accessToken,
                accessTokenClaims: AccessTokenClaimsModel.fromCognitoResponse(tokenClaims),
            };
        } catch {
            return null;
        }
    }

    private extractAccessToken(headers: IncomingHttpHeaders): string {
        const token: string = headers?.authorization?.replace('Bearer ', '');

        return isNullOrUndefined(token) ? '' : token;
    }
}
