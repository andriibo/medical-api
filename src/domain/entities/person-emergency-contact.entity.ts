import {EmergencyContact} from './emergency-contact.entity';

export interface PersonEmergencyContact extends EmergencyContact {
    firstName: string;

    lastName: string;

    email: string;

    phone: string;

    relationship: string;
}
