import {SuggestedContact} from './suggested-contact.entity';

export interface PersonSuggestedContact extends SuggestedContact {
    firstName: string;

    lastName: string;

    email: string;

    phone: string;

    relationship: string;
}
