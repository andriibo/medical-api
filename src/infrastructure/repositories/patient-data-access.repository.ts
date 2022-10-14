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

    async create(patientDataAccess: PatientDataAccessModel): Promise<void> {
        await this.dataSource.manager.save(patientDataAccess);
    }

    async update(patientDataAccess: PatientDataAccessModel): Promise<void> {
        await this.dataSource.manager.save(patientDataAccess);
    }

    async delete(patientDataAccess: PatientDataAccessModel): Promise<void> {
        await this.dataSource.manager.remove(patientDataAccess);
    }

    async getOneByPatientAndGrantedUser(patient: User, grantedUser: User): Promise<PatientDataAccess> {
        return await this.dataSource.manager.findOneBy(PatientDataAccessModel, {
            patientUserId: patient.userId,
            grantedUserId: grantedUser.userId,
        });
    }

    async getByPatient(patient: User): Promise<PatientDataAccess[]> {
        return await this.dataSource.manager.findBy(PatientDataAccessModel, {
            patientUserId: patient.userId,
        });
    }

    async getByGrantedUser(grantedUser: User): Promise<PatientDataAccess[]> {
        return await this.dataSource.manager.findBy(PatientDataAccessModel, {
            grantedUserId: grantedUser.userId,
        });
    }

    async getOneByAccessId(accessId: string): Promise<PatientDataAccess> {
        return await this.dataSource.manager.findOneBy(PatientDataAccessModel, {accessId});
    }
}
