import {UserDto} from 'domain/dtos/response/user/user.dto';

export class UserSignedInDto {
    public accessToken: string;
    public accessTokenExpireTime: Date;
    public refreshToken: string | null;
    public user: UserDto;

    public static fromTokenData(accessToken: string, refreshToken: string | null, userDto: UserDto): UserSignedInDto {
        const dto = new UserSignedInDto();
        dto.accessToken = accessToken;
        dto.refreshToken = refreshToken;
        dto.user = userDto;

        return dto;
    }
}
