import {DoctorMetadata} from 'domain/entities/doctor-metadata.entity';

export interface IDoctorMetadataRepository {
    getOneById(userId: string): Promise<DoctorMetadata>;
    getByIds(userIds: string[]): Promise<DoctorMetadata[]>;
}

export const IDoctorMetadataRepository = Symbol('IDoctorMetadataRepository');
