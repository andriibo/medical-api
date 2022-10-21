import {Entity, Column, PrimaryColumn} from 'typeorm';
import {PatientDataAccess} from 'domain/entities/patient-data-access.entity';

@Entity('patient_data_access')
export class PatientDataAccessModel implements PatientDataAccess {
    @PrimaryColumn('uuid')
    public id: string;

    @Column('uuid', {name: 'patient_user_id'})
    public patientUserId: string;

    @Column('uuid', {name: 'granted_user_id', nullable: true})
    public grantedUserId?: string;

    @Column({name: 'granted_user_email', nullable: true})
    public grantedUserEmail?: string;

    @Column()
    public direction: string;

    @Column()
    public status: string;

    @Column({name: 'created_at'})
    public createdAt: string;
}
