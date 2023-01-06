import {ITokenClaimsModel} from 'app/modules/auth/models';
import {UserDto} from 'domain/dtos/response/user/user.dto';
import {User} from 'domain/entities';

export class UserSignedInDto {
    public token: string;
    public tokenExpireTime: Date;
    public user: UserDto;

    public static fromTokenData(token: string, tokenClaims: ITokenClaimsModel, user: User): UserSignedInDto {
        const dto = new UserSignedInDto();
        dto.token = token;
        dto.tokenExpireTime = tokenClaims.getTokenExpireTime();
        dto.user = UserDto.fromUser(user);

        return dto;
    }
}
