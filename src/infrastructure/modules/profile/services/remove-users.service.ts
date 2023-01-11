import {IRemoveUsersService} from 'app/modules/profile/services/remove-users.service';
import {DataSource} from 'typeorm';
import {IAuthService} from 'app/modules/auth/services/auth.service';
import {User} from 'domain/entities';
import {UserModel} from 'infrastructure/modules/auth/models';

export class RemoveUsersService implements IRemoveUsersService {
    public constructor(private readonly authService: IAuthService, private dataSource: DataSource) {}

    public async delete(user: User): Promise<void> {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await queryRunner.manager
                .createQueryBuilder()
                .delete()
                .from(UserModel)
                .where('id=:id', {id: user.id})
                .execute();
            await this.authService.deleteUser(user);
            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }
}
