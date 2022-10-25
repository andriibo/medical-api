import {ITokenClaimsModel} from 'app/modules/auth/models';

export class UserDataSignedInDto {
    public id: string;
    public email: string;
    public roles: string[];

    public static fromTokenClaimsModel(tokenClaims: ITokenClaimsModel): UserDataSignedInDto {
        const dto = new UserDataSignedInDto();
        dto.id = tokenClaims.getUserId();
        dto.email = tokenClaims.getUserEmail();
        dto.roles = tokenClaims.getRoles();

        return dto;
    }
}
