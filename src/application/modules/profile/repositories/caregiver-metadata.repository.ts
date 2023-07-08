import {CaregiverMetadata} from 'domain/entities/caregiver-metadata.entity';

export interface ICaregiverMetadataRepository {
    getOneById(userId: string): Promise<CaregiverMetadata>;
    getByIds(userIds: string[]): Promise<CaregiverMetadata[]>;
}

export const ICaregiverMetadataRepository = Symbol('ICaregiverMetadataRepository');
