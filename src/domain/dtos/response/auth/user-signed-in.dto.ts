export class UserSignedInDto {
    public token: string;

    public static fromToken(token: string): UserSignedInDto {
        const dto = new UserSignedInDto();
        dto.token = token;

        return dto;
    }
}
