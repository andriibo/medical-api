import {SuggestedContact} from './suggested-contact.entity';
import {OrganizationTypeEnum} from 'domain/constants/emergency-contact.const';

export interface OrganizationSuggestedContact extends SuggestedContact {
    name: string;

    email: string | null;

    phone: string;

    fax: string | null;

    type: OrganizationTypeEnum;
}
