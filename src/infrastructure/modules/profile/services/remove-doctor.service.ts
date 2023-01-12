import {DataSource} from 'typeorm';
import {IAuthService} from 'app/modules/auth/services/auth.service';
import {User} from 'domain/entities';
import {IRemoveDoctorService} from 'app/modules/profile/services/remove-doctor.service';

export class RemoveDoctorService implements IRemoveDoctorService {
    public constructor(private readonly authService: IAuthService, private readonly dataSource: DataSource) {}

    public async delete(doctor: User): Promise<void> {
        doctor.email = null;
        doctor.deletedAt = null;
        console.log(this.authService);
        console.log(this.dataSource);
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
