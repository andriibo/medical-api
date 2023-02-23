import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {UserDtoService} from 'app/modules/profile/services/user-dto.service';
import {UserDto} from 'domain/dtos/response/user/user.dto';

export class CaregiverProfileUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly userDtoService: UserDtoService,
    ) {}

    public async getProfileInfo(): Promise<UserDto> {
        const user = await this.authedUserService.getUser();

        return this.userDtoService.createUserDtoByUser(user);
    }
}
