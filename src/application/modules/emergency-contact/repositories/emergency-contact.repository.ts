export interface IEmergencyContactRepository {
    countByUserId(userId: string): Promise<number>;
}
