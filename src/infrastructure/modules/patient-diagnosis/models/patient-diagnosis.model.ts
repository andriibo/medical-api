import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {PatientDiagnosis} from 'domain/entities';

@Entity('patient_diagnosis')
export class PatientDiagnosisModel implements PatientDiagnosis {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({name: 'patient_user_id'})
    public patientUserId: string;

    @Column({name: 'diagnosis_name'})
    public diagnosisName: string;

    @Column({name: 'created_by'})
    public createdBy: string;

    @Column({name: 'created_at'})
    public createdAt: string;
}
