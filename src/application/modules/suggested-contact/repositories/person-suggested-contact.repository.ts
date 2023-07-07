import {PersonSuggestedContact} from 'domain/entities/person-suggested-contact.entity';

export interface IPersonSuggestedContactRepository {
    create(suggestedContact: PersonSuggestedContact): Promise<void>;
    getOneById(id: string): Promise<PersonSuggestedContact>;
    delete(suggestedContact: PersonSuggestedContact): Promise<void>;
    getByPatientUserId(patientUserId: string): Promise<PersonSuggestedContact[]>;
    getByPatientUserIdAndSuggestedBy(patientUserId: string, suggestedBy: string): Promise<PersonSuggestedContact[]>;
}

export const IPersonSuggestedContactRepository = Symbol('IPersonSuggestedContactRepository');
