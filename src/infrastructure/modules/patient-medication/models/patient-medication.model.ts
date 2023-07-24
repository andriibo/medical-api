import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {PatientMedication} from 'domain/entities';
import {TimesPerDayEnum} from 'domain/constants/medication.const';
import {FloatTransformer} from 'infrastructure/data-transformers/float.transformer';

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

    @Column({type: 'decimal', precision: 7, scale: 2, transformer: new FloatTransformer()})
    public dose: number | null;

    @Column({name: 'times_per_day'})
    public timesPerDay: TimesPerDayEnum | null;

    @Column({name: 'created_by'})
    public createdBy: string;

    @Column({name: 'created_at'})
    public createdAt: string;
}
