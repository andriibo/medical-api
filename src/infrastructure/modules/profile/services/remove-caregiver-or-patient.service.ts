import {DataSource} from 'typeorm';
import {IAuthService} from 'app/modules/auth/services/auth.service';
import {Inject, Injectable} from '@nestjs/common';
import {InjectDataSource} from '@nestjs/typeorm';
import {UserModel} from 'infrastructure/modules/auth/models';
import {IRemoveUserService} from 'app/modules/profile/services/remove-user.service';
import {User} from 'domain/entities/user.entity';

@Injectable()
export class RemoveCaregiverOrPatientService implements IRemoveUserService {
    public constructor(
        @Inject(IAuthService) private readonly authService: IAuthService,
        @InjectDataSource() private readonly dataSource: DataSource,
    ) {}

    public async remove(user: User): Promise<void> {
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
            await queryRunner.release();
        } catch (err) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();

            throw err;
        }
    }
}
