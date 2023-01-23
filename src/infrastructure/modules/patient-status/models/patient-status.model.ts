import {Entity, Column, PrimaryColumn} from 'typeorm';
import {PatientStatus} from 'domain/entities/patient-status.entity';

@Entity('patient_status')
export class PatientStatusModel implements PatientStatus {
    @PrimaryColumn('uuid', {name: 'patient_user_id'})
    public patientUserId: string;

    @Column()
    public status: string;

    @Column({name: 'set_at'})
    public setAt: number;
}
