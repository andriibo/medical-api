import {DataSource} from 'typeorm';
import {IAuthService} from 'app/modules/auth/services/auth.service';
import {Inject, Injectable} from '@nestjs/common';
import {InjectDataSource} from '@nestjs/typeorm';
import {IRemoveUserService} from 'app/modules/profile/services/remove-user.service';
import {User} from 'domain/entities';

@Injectable()
export class RemoveDoctorService implements IRemoveUserService {
    public constructor(
        @Inject(IAuthService) private readonly authService: IAuthService,
        @InjectDataSource() private readonly dataSource: DataSource,
    ) {}

    public async remove(user: User): Promise<void> {
        user.email = null;
        user.deletedAt = null;

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await queryRunner.manager.save(user);
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
