import {ITokenClaimsModel} from 'app/modules/auth/models';

export class UserDataSignedInDto {
    public id: string;
    public email: string;
    public roles: string[];

    public static fromTokenClaimsModel(tokenClaims: ITokenClaimsModel, email: string): UserDataSignedInDto {
        const dto = new UserDataSignedInDto();
        dto.id = tokenClaims.getUserId();
        dto.email = email;
        dto.roles = tokenClaims.getRoles();

        return dto;
    }
}
