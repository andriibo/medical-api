import {TokenClaimsModel} from 'infrastructure/aws/cognito/token-claims.model';
import {UserDataSignedInDto} from './user-data-signed-in.dto';

export class UserSignedInDto {
    public token: string;
    public tokenExpireTime: Date;
    public user: UserDataSignedInDto;

    public static fromAuthResponse(token: string, tokenClaims: object): UserSignedInDto {
        const tokenClaimsModel = TokenClaimsModel.fromCognitoResponse(tokenClaims);

        const dto = new UserSignedInDto();
        dto.token = token;
        dto.tokenExpireTime = tokenClaimsModel.getTokenExpireTime();
        dto.user = UserDataSignedInDto.fromTokenClaimsModel(tokenClaimsModel);

        return dto;
    }
}
