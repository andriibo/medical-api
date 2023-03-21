import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';
import {IRemoveMyAvatarService} from 'app/modules/profile/services/remove-my-avatar.service';

export class RemoveMyAvatarUseCase {
    public constructor(
        private readonly authedUserService: IAuthedUserService,
        private readonly removeMyAvatarService: IRemoveMyAvatarService,
    ) {}

    public async remove(): Promise<void> {
        const user = await this.authedUserService.getUser();
        await this.removeMyAvatarService.removeAvatar(user);
    }
}
