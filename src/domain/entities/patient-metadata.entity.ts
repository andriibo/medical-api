import {UserMetadata} from './user-metadata.entity';

export interface PatientMetadata extends UserMetadata {
    gender: string;

    height: number;

    wight: number;
}
