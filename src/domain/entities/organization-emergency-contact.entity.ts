import {EmergencyContact} from './emergency-contact.entity';
import {OrganizationTypeEnum} from 'domain/constants/emergency-contact.const';

export interface OrganizationEmergencyContact extends EmergencyContact {
    name: string;

    email: string | null;

    phone: string;

    fax: string | null;

    type: OrganizationTypeEnum;
}
