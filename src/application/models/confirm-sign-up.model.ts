import {ConfirmSignUpUserDto} from 'domain/dtos/auth/confirm-sign-up-user.dto';

export class ConfirmSignUpModel {
    private constructor(public readonly userName: string, public readonly code: string) {}

    static fromConfirmSignUpUserDto(dto: ConfirmSignUpUserDto): ConfirmSignUpModel {
        return new ConfirmSignUpModel(dto.userName, dto.code);
    }
}
