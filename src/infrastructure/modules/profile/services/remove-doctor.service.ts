import {DataSource} from 'typeorm';
import {IAuthService} from 'app/modules/auth/services/auth.service';
import {IRemoveDoctorService} from 'app/modules/profile/services/remove-doctor.service';
import {Inject, Injectable} from '@nestjs/common';
import {InjectDataSource} from '@nestjs/typeorm';
import {UserModel} from 'infrastructure/modules/auth/models';

@Injectable()
export class RemoveDoctorService implements IRemoveDoctorService {
    public constructor(
        @Inject(IAuthService) private readonly authService: IAuthService,
        @InjectDataSource() private readonly dataSource: DataSource,
    ) {}

    public async delete(doctor: UserModel): Promise<void> {
        doctor.email = null;
        doctor.deletedAt = null;

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await queryRunner.manager.save(doctor);
            await this.authService.deleteUser(doctor);
            await queryRunner.commitTransaction();
            await queryRunner.release();
        } catch (err) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();

            throw err;
        }
    }
}
