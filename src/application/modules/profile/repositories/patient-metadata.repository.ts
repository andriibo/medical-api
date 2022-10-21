import {PatientMetadata} from 'domain/entities/patient-metadata.entity';

export interface IPatientMetadataRepository {
    getOneById(userId: string): Promise<PatientMetadata>;
}

export const IPatientMetadataRepository = Symbol('IPatientMetadataRepository');
