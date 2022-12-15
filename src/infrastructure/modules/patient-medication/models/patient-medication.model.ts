import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {PatientMedication} from 'domain/entities';

@Entity('patient_medication')
export class PatientMedicationModel implements PatientMedication {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({name: 'patient_user_id'})
    public patientUserId: string;

    @Column({name: 'generic_name'})
    public genericName: string;

    @Column('text', {array: true, name: 'brand_names'})
    public brandNames: string[];

    @Column({name: 'created_by'})
    public createdBy: string;

    @Column({name: 'created_at'})
    public createdAt: string;
}
