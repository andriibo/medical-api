import {Injectable} from '@nestjs/common';
import {InjectDataSource} from '@nestjs/typeorm';
import {DataSource} from 'typeorm';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {PatientDataAccess} from 'domain/entities';
import {PatientDataAccessModel} from 'infrastructure/models';
import {User} from 'domain/entities';

@Injectable()
export class PatientDataAccessRepository implements IPatientDataAccessRepository {
    public constructor(@InjectDataSource() private dataSource: DataSource) {}

    public async create(patientDataAccess: PatientDataAccessModel): Promise<void> {
        await this.dataSource.manager.save(patientDataAccess);
    }

    public async update(patientDataAccess: PatientDataAccessModel): Promise<void> {
        await this.dataSource.manager.save(patientDataAccess);
    }

    public async delete(patientDataAccess: PatientDataAccessModel): Promise<void> {
        await this.dataSource.manager.remove(patientDataAccess);
    }

    public async getOneByPatientUserIdAndGrantedUserId(
        patientUserId: string,
        grantedUserId: string,
    ): Promise<PatientDataAccess> {
        return await this.dataSource.manager.findOneBy(PatientDataAccessModel, {patientUserId, grantedUserId});
    }

    public async getOneByPatientUserIdAndGrantedEmail(
        patientUserId: string,
        grantedEmail: string,
    ): Promise<PatientDataAccess> {
        return await this.dataSource.manager.findOneBy(PatientDataAccessModel, {patientUserId, grantedEmail});
    }

    public async getByPatient(patient: User): Promise<PatientDataAccess[]> {
        return await this.dataSource.manager.findBy(PatientDataAccessModel, {
            patientUserId: patient.id,
        });
    }

    public async getByGrantedUser(grantedUser: User): Promise<PatientDataAccess[]> {
        return await this.dataSource.manager.findBy(PatientDataAccessModel, {
            grantedUserId: grantedUser.id,
        });
    }

    public async getOneById(id: string): Promise<PatientDataAccess> {
        return await this.dataSource.manager.findOneBy(PatientDataAccessModel, {id});
    }
}
