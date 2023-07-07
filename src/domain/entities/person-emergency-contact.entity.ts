import {EmergencyContact} from './emergency-contact.entity';

export enum PersonContactRelationship {
    MedicalProfessional = 'MedicalProfessional',
    Caregiver = 'Caregiver',
    FriendsFamily = 'Friends&Family',
}

export interface PersonEmergencyContact extends EmergencyContact {
    firstName: string;

    lastName: string;

    email: string;

    phone: string;

    relationship: string;
}
