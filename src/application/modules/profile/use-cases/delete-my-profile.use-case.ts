import {IUserRepository} from 'app/modules/auth/repositories';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {ProfileSpecification} from 'app/modules/profile/specifications/profile.specification';
import {currentUnixTimestamp} from 'app/support/date.helper';
import {UserDto} from 'domain/dtos/response/user/user.dto';
import {UserDtoService} from 'app/modules/profile/services/user-dto.service';

export class DeleteMyProfileUseCase {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly authedUserService: IAuthedUserService,
        private readonly profileSpecification: ProfileSpecification,
        private readonly userDtoService: UserDtoService,
    ) {}

    public async deleteProfile(): Promise<UserDto> {
        const user = await this.authedUserService.getUser();
        this.profileSpecification.assertUserCanDeleteHisProfile(user);
        user.deletedAt = currentUnixTimestamp();
        const deletedUser = await this.userRepository.persist(user);

        return this.userDtoService.createUserDtoByUser(deletedUser);
    }
}
