import {Entity, Column, PrimaryColumn} from 'typeorm';
import {PatientCategory} from 'domain/entities/patient-category.entity';

@Entity('patient_relationship')
export class PatientCategoryModel implements PatientCategory {
    @PrimaryColumn('uuid')
    public id: string;

    @PrimaryColumn('uuid', {name: 'patient_user_id'})
    public patientUserId: string;

    @Column()
    public category: string;

    @Column({name: 'patient_category_updated_at'})
    public patientCategoryUpdatedAt: number;
}
