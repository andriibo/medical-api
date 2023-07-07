import {SuggestedContact} from './suggested-contact.entity';

export enum PersonSuggestedContactRelationship {
    MedicalProfessional = 'MedicalProfessional',
    Caregiver = 'Caregiver',
    FriendsFamily = 'Friends&Family',
}

export interface PersonSuggestedContact extends SuggestedContact {
    firstName: string;

    lastName: string;

    email: string;

    phone: string;

    relationship: string;
}
