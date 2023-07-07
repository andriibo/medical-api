import {SuggestedContact} from './suggested-contact.entity';
import {OrganizationType} from './organization-emergency-contact.entity';

export interface OrganizationSuggestedContact extends SuggestedContact {
    name: string;

    email: string | null;

    phone: string;

    fax: string | null;

    type: OrganizationType;
}
