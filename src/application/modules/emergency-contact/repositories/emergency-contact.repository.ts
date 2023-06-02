import {EmergencyContact} from 'domain/entities/emergency-contact.entity';

export interface IEmergencyContactRepository {
    create(emergencyContact: EmergencyContact): Promise<void>;

    update(emergencyContact: EmergencyContact): Promise<void>;

    delete(emergencyContact: EmergencyContact): Promise<void>;

    getOneById(id: string): Promise<EmergencyContact>;

    getByUserId(userId: string): Promise<EmergencyContact[]>;

    getByUserIdOrderedByRank(userId: string): Promise<EmergencyContact[]>;

    countByUserId(userId: string): Promise<number>;
}

export const IEmergencyContactRepository = Symbol('IEmergencyContactRepository');
