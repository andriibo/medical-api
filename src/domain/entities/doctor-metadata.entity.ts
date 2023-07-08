import {UserMetadata} from './user-metadata.entity';

export interface DoctorMetadata extends UserMetadata {
    institution: string;

    specialty: string;
}
