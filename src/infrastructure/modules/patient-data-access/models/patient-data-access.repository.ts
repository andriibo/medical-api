import {Injectable} from '@nestjs/common';
import {InjectDataSource} from '@nestjs/typeorm';
import {DataSource} from 'typeorm';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {PatientDataAccess} from 'domain/entities';
import {PatientDataAccessModel} from './patient-data-access.model';
import {User} from 'domain/entities';
import {PatientDataAccessStatus} from 'domain/entities/patient-data-access.entity';
import {UserRole} from 'domain/entities/user.entity';

@Injectable()
export class PatientDataAccessRepository implements IPatientDataAccessRepository {
    public constructor(@InjectDataSource() private dataSource: DataSource) {}

    public async create(patientDataAccess: PatientDataAccessModel): Promise<void> {
        await this.dataSource.manager.save(patientDataAccess);
    }

    public async update(patientDataAccess: PatientDataAccessModel | PatientDataAccessModel[]): Promise<void> {
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

    public async getOneByGrantedUserIdAndPatientEmail(
        grantedUserId: string,
        patientEmail: string,
    ): Promise<PatientDataAccess> {
        return await this.dataSource.manager.findOneBy(PatientDataAccessModel, {grantedUserId, patientEmail});
    }

    public async getByPatient(patient: User): Promise<PatientDataAccess[]> {
        return await this.dataSource.manager.find(PatientDataAccessModel, {
            where: {patientUserId: patient.id},
            order: {
                createdAt: 'DESC',
            },
        });
    }

    public async getByGrantedUser(grantedUser: User): Promise<PatientDataAccess[]> {
        return await this.dataSource.manager.find(PatientDataAccessModel, {
            where: {grantedUserId: grantedUser.id},
            order: {
                createdAt: 'DESC',
            },
        });
    }

    public async getByGrantedEmail(grantedEmail: string): Promise<PatientDataAccess[]> {
        return await this.dataSource.manager.findBy(PatientDataAccessModel, {
            grantedEmail,
        });
    }

    public async getByPatientEmail(patientEmail: string): Promise<PatientDataAccess[]> {
        return await this.dataSource.manager.findBy(PatientDataAccessModel, {
            patientEmail,
        });
    }

    public async getOneById(id: string): Promise<PatientDataAccess> {
        return await this.dataSource.manager.findOneBy(PatientDataAccessModel, {id});
    }

    public async getAccessesForDoctorsByPatientUserId(patientUserId: string): Promise<PatientDataAccess[]> {
        const role = UserRole.Doctor;
        const status = PatientDataAccessStatus.Approved;
        return await this.dataSource
            .createQueryBuilder(PatientDataAccessModel, 'pda')
            .where('pda.patient_user_id = :patientUserId', {patientUserId})
            .andWhere('pda.status = :status', {status})
            .andWhere('user.role = :role', {role})
            .leftJoinAndSelect('pda.grantedUser', 'user')
            .leftJoinAndSelect('user.doctorMetadata', 'metadata')
            .getMany();
    }

    public async getAccessesForCaregiversByPatientUserId(patientUserId: string): Promise<PatientDataAccess[]> {
        const role = UserRole.Caregiver;
        const status = PatientDataAccessStatus.Approved;
        return await this.dataSource
            .createQueryBuilder(PatientDataAccessModel, 'pda')
            .where('pda.patient_user_id = :patientUserId', {patientUserId})
            .andWhere('pda.status = :status', {status})
            .andWhere('user.role = :role', {role})
            .leftJoinAndSelect('pda.grantedUser', 'user')
            .getMany();
    }

    public async getByGrantedUserIdAndStatus(
        grantedUserId: string,
        status: PatientDataAccessStatus,
    ): Promise<PatientDataAccess[]> {
        return await this.dataSource.manager.findBy(PatientDataAccessModel, {
            grantedUserId,
            status,
        });
    }
}
