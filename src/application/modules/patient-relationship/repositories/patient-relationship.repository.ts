import {PatientRelationship} from 'domain/entities/patient-relationship.entity';
import {PatientDataAccessStatus} from 'domain/entities/patient-data-access.entity';

export interface IPatientRelationshipRepository {
    getByGrantedUserIdAndStatus(grantedUserId: string, status: PatientDataAccessStatus): Promise<PatientRelationship[]>;
}

export const IPatientRelationshipRepository = Symbol('IPatientRelationshipRepository');
