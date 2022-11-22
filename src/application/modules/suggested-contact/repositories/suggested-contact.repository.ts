import {SuggestedContact} from 'domain/entities/suggested-contact.entity';

export interface ISuggestedContactRepository {
    create(suggestedContact: SuggestedContact): Promise<void>;
}

export const ISuggestedContactRepository = Symbol('ISuggestedContactRepository');
