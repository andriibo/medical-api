import {Injectable} from '@nestjs/common';
import {InjectDataSource} from '@nestjs/typeorm';
import {DataSource} from 'typeorm';
import {PatientRelationshipModel} from './patient-relationship.model';
import {IPatientRelationshipRepository} from 'app/modules/patient-relationship/repositories';
import {PatientRelationship, PatientRelationshipStatus} from 'domain/entities/patient-relationship.entity';

@Injectable()
export class PatientRelationshipRepository implements IPatientRelationshipRepository {
    public constructor(@InjectDataSource() private dataSource: DataSource) {}

    public async getByGrantedUserIdAndStatus(
        grantedUserId: string,
        status: PatientRelationshipStatus,
    ): Promise<PatientRelationship[]> {
        return await this.dataSource
            .createQueryBuilder(PatientRelationshipModel, 'pr')
            .leftJoinAndSelect('pr.patientUser', 'user')
            .leftJoinAndSelect('user.patientMetadata', 'metadata')
            .where('pr.granted_user_id = :grantedUserId', {grantedUserId})
            .andWhere('pr.status = :status', {status})
            .andWhere('user.deleted_at is null')
            .andWhere('user.email is not null')
            .getMany();
    }
}
