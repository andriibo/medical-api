import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {PatientVitalThreshold} from 'domain/entities';

@Entity('patient_vital_threshold')
export class PatientVitalThresholdModel implements PatientVitalThreshold {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({name: 'patient_user_id'})
    public patientUserId: string;

    @Column({name: 'threshold_name'})
    public thresholdName: string;

    @Column()
    public value: number;

    @Column({name: 'set_by'})
    public setBy: string;

    @Column({name: 'set_at'})
    public setAt: string;
}
