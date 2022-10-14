import {EmergencyContact} from 'domain/entities/emergency-contact.entity';

export interface IEmergencyContactRepository {
    create(emergencyContact: EmergencyContact): Promise<void>;

    delete(emergencyContact: EmergencyContact): Promise<void>;

    getOneByContactId(contactId: string): Promise<EmergencyContact>;

    getByUserId(userId: string): Promise<EmergencyContact[]>;
}

export const IEmergencyContactRepository = Symbol('IEmergencyContactRepository');
