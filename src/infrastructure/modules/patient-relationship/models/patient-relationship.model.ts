import {Entity, Column, OneToOne, JoinColumn, PrimaryColumn} from 'typeorm';
import {UserModel} from 'infrastructure/modules/auth/models';
import {PatientRelationship} from 'domain/entities/patient-relationship.entity';

@Entity('patient_relationship')
export class PatientRelationshipModel implements PatientRelationship {
    @PrimaryColumn('uuid')
    public id: string;

    @Column('uuid', {name: 'patient_user_id'})
    public patientUserId: string;

    @Column('uuid', {name: 'granted_user_id'})
    public grantedUserId: string;

    @Column({name: 'granted_email', nullable: true})
    public grantedEmail?: string;

    @Column({name: 'patient_email', nullable: true})
    public patientEmail?: string;

    @Column()
    public direction: string;

    @Column()
    public status: string;

    @Column({name: 'patient_category'})
    public patientCategory: string;

    @Column({name: 'created_at'})
    public createdAt: string;

    @Column({name: 'patient_category_updated_at'})
    public patientCategoryUpdatedAt: number | null;

    @OneToOne(() => UserModel)
    @JoinColumn({name: 'patient_user_id'})
    patientUser?: UserModel | null;

    @OneToOne(() => UserModel)
    @JoinColumn({name: 'granted_user_id'})
    public grantedUser?: UserModel | null;
}
