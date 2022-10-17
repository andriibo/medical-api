import {UserMetadata} from './user-metadata.entity';

export interface PatientMetadata extends UserMetadata {
    dob: Date;

    gender: string;

    height: number;

    wight: number;
}
