import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {UserDtoMapper} from 'app/modules/profile/mappers/user-dto.mapper';
import {UserDto} from 'domain/dtos/response/user/user.dto';

export class CaregiverProfileUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly userDtoMapper: UserDtoMapper,
    ) {}

    public async getProfileInfo(): Promise<UserDto> {
        const user = await this.authedUserService.getUser();

        return this.userDtoMapper.mapUserDtoByUser(user);
    }
}
