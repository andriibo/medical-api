import {Entity, Column, PrimaryColumn, OneToOne, JoinColumn} from 'typeorm';
import {PatientDataAccess} from 'domain/entities/patient-data-access.entity';
import {UserModel} from 'infrastructure/modules/auth/models';

@Entity('patient_relationship')
export class PatientDataAccessModel implements PatientDataAccess {
    @PrimaryColumn('uuid')
    public id: string;

    @Column('uuid', {name: 'patient_user_id', nullable: true})
    public patientUserId?: string;

    @Column('uuid', {name: 'granted_user_id', nullable: true})
    public grantedUserId?: string;

    @Column({name: 'granted_email', nullable: true})
    public grantedEmail?: string;

    @Column({name: 'patient_email', nullable: true})
    public patientEmail?: string;

    @Column()
    public direction: string;

    @Column()
    public status: string;

    @Column({name: 'created_at'})
    public createdAt: string;

    @OneToOne(() => UserModel)
    @JoinColumn({name: 'patient_user_id'})
    patientUser?: UserModel | null;

    @OneToOne(() => UserModel)
    @JoinColumn({name: 'granted_user_id'})
    public grantedUser?: UserModel | null;
}
