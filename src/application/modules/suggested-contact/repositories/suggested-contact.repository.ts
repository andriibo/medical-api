import {SuggestedContact} from 'domain/entities/suggested-contact.entity';

export interface ISuggestedContactRepository {
    create(suggestedContact: SuggestedContact): Promise<void>;
    getOneById(id: string): Promise<SuggestedContact>;
    delete(suggestedContact: SuggestedContact): Promise<void>;
    getByPatientUserId(patientUserId: string): Promise<SuggestedContact[]>;
    getByPatientUserIdAndSuggestedBy(patientUserId: string, suggestedBy: string): Promise<SuggestedContact[]>;
}

export const ISuggestedContactRepository = Symbol('ISuggestedContactRepository');
