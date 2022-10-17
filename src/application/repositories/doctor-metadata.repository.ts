import {DoctorMetadata} from 'domain/entities/doctor-metadata.entity';

export interface IDoctorMetadataRepository {
    getOneByUserId(userId: string): Promise<DoctorMetadata>;
}

export const IDoctorMetadataRepository = Symbol('IDoctorMetadataRepository');
