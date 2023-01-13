import {DataSource} from 'typeorm';
import {IAuthService} from 'app/modules/auth/services/auth.service';
import {Inject, Injectable} from '@nestjs/common';
import {InjectDataSource} from '@nestjs/typeorm';
import {UserModel} from 'infrastructure/modules/auth/models';
import {IRemoveUserService} from 'app/modules/profile/services/remove-user.service';
import {User, UserRole} from 'domain/entities/user.entity';
import {QueryRunner} from 'typeorm/query-runner/QueryRunner';

@Injectable()
export class RemoveUserService implements IRemoveUserService {
    private queryRunner: QueryRunner;

    public constructor(
        @Inject(IAuthService) private readonly authService: IAuthService,
        @InjectDataSource() private readonly dataSource: DataSource,
    ) {}

    public async delete(user: User): Promise<void> {
        this.queryRunner = this.dataSource.createQueryRunner();
        await this.queryRunner.connect();
        await this.queryRunner.startTransaction();

        try {
            if (user.role === UserRole.Doctor) {
                await this.removeDoctor(user);
            } else {
                await this.removeCaregiverOrPatient(user);
            }

            await this.authService.deleteUser(user);
            await this.queryRunner.commitTransaction();
            await this.queryRunner.release();
        } catch (err) {
            await this.queryRunner.rollbackTransaction();
            await this.queryRunner.release();

            throw err;
        }
    }

    private async removeCaregiverOrPatient(user: User): Promise<void> {
        await this.queryRunner.manager
            .createQueryBuilder()
            .delete()
            .from(UserModel)
            .where('id=:id', {id: user.id})
            .execute();
    }

    private async removeDoctor(doctor: User): Promise<void> {
        doctor.email = null;
        doctor.deletedAt = null;
        await this.queryRunner.manager.save(doctor);
    }
}
