import {Injectable} from '@nestjs/common';
import {InjectDataSource} from '@nestjs/typeorm';
import {DataSource} from 'typeorm';
import {IPatientDataAccessRepository} from 'app/modules/patient-data-access/repositories';
import {PatientDataAccess} from 'domain/entities';
import {PatientDataAccessModel} from './patient-data-access.model';
import {PatientDataAccessStatusEnum} from 'domain/constants/patient-data-access.const';
import {UserRoleEnum} from 'domain/constants/user.const';

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

    public async getWithGrantedUserByPatientUserId(patientUserId: string): Promise<PatientDataAccess[]> {
        return await this.dataSource
            .createQueryBuilder(PatientDataAccessModel, 'pda')
            .leftJoinAndSelect('pda.grantedUser', 'user')
            .where('pda.patient_user_id = :patientUserId', {patientUserId})
            .andWhere('(pda.granted_email is not null or (user.deleted_at is null and user.email is not null))')
            .orderBy({
                'pda.lastInviteSentAt': 'DESC',
            })
            .getMany();
    }

    public async getWithPatientUserByGrantedUserId(grantedUserId: string): Promise<PatientDataAccess[]> {
        return await this.dataSource
            .createQueryBuilder(PatientDataAccessModel, 'pda')
            .leftJoinAndSelect('pda.patientUser', 'user')
            .where('pda.granted_user_id = :grantedUserId', {grantedUserId})
            .andWhere('(pda.patient_email is not null or (user.deleted_at is null and user.email is not null))')
            .orderBy({
                'pda.lastInviteSentAt': 'DESC',
            })
            .getMany();
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

    public async getOneWithPatientUserById(id: string): Promise<PatientDataAccess> {
        return await this.dataSource
            .createQueryBuilder(PatientDataAccessModel, 'pda')
            .leftJoinAndSelect('pda.patientUser', 'user')
            .where({id})
            .getOne();
    }

    public async getDoctorsByPatientUserIdAndStatus(
        patientUserId: string,
        status: PatientDataAccessStatusEnum,
    ): Promise<PatientDataAccess[]> {
        const role = UserRoleEnum.Doctor;
        return await this.dataSource
            .createQueryBuilder(PatientDataAccessModel, 'pda')
            .leftJoinAndSelect('pda.grantedUser', 'user')
            .leftJoinAndSelect('user.doctorMetadata', 'metadata')
            .where('pda.patient_user_id = :patientUserId', {patientUserId})
            .andWhere('pda.status = :status', {status})
            .andWhere('user.role = :role', {role})
            .andWhere('user.deleted_at is null')
            .andWhere('user.email is not null')
            .getMany();
    }

    public async getCaregiversByPatientUserIdAndStatus(
        patientUserId: string,
        status: PatientDataAccessStatusEnum,
    ): Promise<PatientDataAccess[]> {
        const role = UserRoleEnum.Caregiver;
        return await this.dataSource
            .createQueryBuilder(PatientDataAccessModel, 'pda')
            .leftJoinAndSelect('pda.grantedUser', 'user')
            .leftJoinAndSelect('user.caregiverMetadata', 'metadata')
            .where('pda.patient_user_id = :patientUserId', {patientUserId})
            .andWhere('pda.status = :status', {status})
            .andWhere('user.role = :role', {role})
            .andWhere('user.deleted_at is null')
            .andWhere('user.email is not null')
            .getMany();
    }

    public async getByGrantedUserIdAndStatus(
        grantedUserId: string,
        status: PatientDataAccessStatusEnum,
    ): Promise<PatientDataAccess[]> {
        return await this.dataSource
            .createQueryBuilder(PatientDataAccessModel, 'pda')
            .leftJoinAndSelect('pda.patientUser', 'user')
            .leftJoinAndSelect('user.patientMetadata', 'metadata')
            .where({grantedUserId, status})
            .andWhere('user.deleted_at is null')
            .andWhere('user.email is not null')
            .getMany();
    }

    public async getOneWithPatientAndMetadataByGrantedUserIdAndPatientUserId(
        grantedUserId: string,
        patientUserId: string,
    ): Promise<PatientDataAccess> {
        return await this.dataSource
            .createQueryBuilder(PatientDataAccessModel, 'pda')
            .leftJoinAndSelect('pda.patientUser', 'user')
            .leftJoinAndSelect('user.patientMetadata', 'metadata')
            .where({grantedUserId, patientUserId})
            .getOne();
    }
}
