export class UserSignedInDto {
    token: string;

    static fromToken(token: string): UserSignedInDto {
        const dto = new UserSignedInDto();
        dto.token = token;

        return dto;
    }
}
