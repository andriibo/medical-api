import {EmergencyContact} from './emergency-contact.entity';

export enum OrganizationType {
    Pharmacy = 'Pharmacy',
    NursingHome = 'Nursing Home',
    Other = 'Other',
}

export interface OrganizationEmergencyContact extends EmergencyContact {
    name: string;

    email: string | null;

    phone: string;

    fax: string | null;

    type: OrganizationType;
}
