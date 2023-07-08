import {UserMetadata} from './user-metadata.entity';

export interface CaregiverMetadata extends UserMetadata {
    institution: string;
}
