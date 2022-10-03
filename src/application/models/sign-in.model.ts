import {AuthUserDto} from 'domain/dtos/auth-user.dto';

export class SignInModel {
    private constructor(public readonly userName: string, public readonly password: string) {}

    static fromAuthUserDto(dto: AuthUserDto): SignInModel {
        return new SignInModel(dto.userName, dto.password);
    }
}
