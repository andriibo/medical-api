import {Injectable} from '@nestjs/common';
import {InjectDataSource} from '@nestjs/typeorm';
import {DataSource} from 'typeorm';
import {IPatientDataAccessRepository} from 'app/repositories';
import {PatientDataAccess} from 'domain/entities';
import {PatientDataAccessModel} from 'presentation/models';
import {User} from 'domain/entities';

@Injectable()
export class PatientDataAccessRepository implements IPatientDataAccessRepository {
    constructor(@InjectDataSource() private dataSource: DataSource) {}

    async create(patientDataAccessModel: PatientDataAccessModel): Promise<void> {
        await this.dataSource.manager.save(patientDataAccessModel);
    }

    async getOneByPatientAndGrantedUser(patient: User, grantedUser: User): Promise<PatientDataAccess> {
        return await this.dataSource.manager.findOneBy(PatientDataAccessModel, {
            patientUserId: patient.userId,
            grantedUserId: grantedUser.userId,
        });
    }

    async getByPatient(user: User): Promise<PatientDataAccess[]> {
        return await this.dataSource.manager.findBy(PatientDataAccessModel, {
            patientUserId: user.userId,
        });
    }

    async getByGrantedUser(user: User): Promise<PatientDataAccess[]> {
        return await this.dataSource.manager.findBy(PatientDataAccessModel, {
            grantedUserId: user.userId,
        });
    }
}
