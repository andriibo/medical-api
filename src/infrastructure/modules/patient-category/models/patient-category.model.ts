import {Entity, Column, PrimaryColumn, OneToOne, JoinColumn} from 'typeorm';
import {PatientCategory} from 'domain/entities/patient-category.entity';
import {UserModel} from 'infrastructure/modules/auth/models';

@Entity('patient_relationship')
export class PatientCategoryModel implements PatientCategory {
    @PrimaryColumn('uuid', {name: 'patient_user_id'})
    public patientUserId: string;

    @PrimaryColumn('uuid', {name: 'granted_user_id'})
    public grantedUserId: string;

    @Column()
    public category: string;

    @Column({name: 'patient_category_updated_at'})
    public patientCategoryUpdatedAt: number | null;

    @OneToOne(() => UserModel)
    @JoinColumn({name: 'patient_user_id'})
    patientUser?: UserModel | null;

    @OneToOne(() => UserModel)
    @JoinColumn({name: 'granted_user_id'})
    public grantedUser?: UserModel | null;
}
