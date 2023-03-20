import {DataSource} from 'typeorm';
import {Inject, Injectable} from '@nestjs/common';
import {InjectDataSource} from '@nestjs/typeorm';
import {User} from 'domain/entities';
import {IRemoveMyAvatarService} from 'app/modules/profile/services/remove-my-avatar.service';
import {IUserAvatarService} from 'app/modules/profile/services/user-avatar.service';

@Injectable()
export class RemoveMyAvatarService implements IRemoveMyAvatarService {
    public constructor(
        @Inject(IUserAvatarService) private readonly userAvatarService: IUserAvatarService,
        @InjectDataSource() private readonly dataSource: DataSource,
    ) {}

    public async removeAvatar(user: User): Promise<void> {
        if (user.avatar === null) {
            return;
        }
        const avatarToDelete = user.avatar;
        user.avatar = null;

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await queryRunner.manager.save(user);
            await this.userAvatarService.deleteFile(avatarToDelete);
            await queryRunner.commitTransaction();
            await queryRunner.release();
        } catch (err) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();

            throw err;
        }
    }
}
