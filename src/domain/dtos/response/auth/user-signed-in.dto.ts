import {ITokenClaimsModel} from 'app/modules/auth/models';
import {UserDto} from 'domain/dtos/response/user/user.dto';

export class UserSignedInDto {
    public token: string;
    public tokenExpireTime: Date;
    public user: UserDto;

    public static fromTokenData(token: string, tokenClaims: ITokenClaimsModel, userDto: UserDto): UserSignedInDto {
        const dto = new UserSignedInDto();
        dto.token = token;
        dto.tokenExpireTime = tokenClaims.getTokenExpireTime();
        dto.user = userDto;

        return dto;
    }
}
