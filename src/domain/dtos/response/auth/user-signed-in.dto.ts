import {IAccessTokenClaimsModel} from 'app/modules/auth/models';
import {UserDto} from 'domain/dtos/response/user/user.dto';

export class UserSignedInDto {
    public accessToken: string;
    public accessTokenExpireTime: Date;
    public refreshToken: string | null;
    public user: UserDto;

    public static fromTokenData(
        accessToken: string,
        refreshToken: string | null,
        accessTokenClaims: IAccessTokenClaimsModel,
        userDto: UserDto,
    ): UserSignedInDto {
        const dto = new UserSignedInDto();
        dto.accessToken = accessToken;
        dto.accessTokenExpireTime = accessTokenClaims.getAccessTokenExpireTime();
        dto.refreshToken = refreshToken;
        dto.user = userDto;

        return dto;
    }
}
