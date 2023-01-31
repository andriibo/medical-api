import {PatientRelationship, PatientRelationshipStatus} from 'domain/entities/patient-relationship.entity';

export interface IPatientRelationshipRepository {
    getByGrantedUserIdAndStatus(
        grantedUserId: string,
        status: PatientRelationshipStatus,
    ): Promise<PatientRelationship[]>;
}

export const IPatientRelationshipRepository = Symbol('IPatientRelationshipRepository');
