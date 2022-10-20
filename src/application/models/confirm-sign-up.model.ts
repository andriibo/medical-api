import {ConfirmSignUpUserDto} from 'domain/dtos/request/auth/confirm-sign-up-user.dto';

export class ConfirmSignUpModel {
    private constructor(public readonly userName: string, public readonly code: string) {}

    public static fromConfirmSignUpUserDto(dto: ConfirmSignUpUserDto): ConfirmSignUpModel {
        return new ConfirmSignUpModel(dto.userName, dto.code);
    }
}
