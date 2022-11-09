import {AuthUserDto} from 'domain/dtos/request/auth/auth-user.dto';

export class SignInModel {
    private constructor(public readonly email: string, public readonly password: string) {}

    public static fromAuthUserDto(dto: AuthUserDto): SignInModel {
        return new SignInModel(dto.email, dto.password);
    }
}
