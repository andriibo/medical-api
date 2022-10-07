import {Entity, Column, PrimaryColumn} from 'typeorm';
import {PatientDataAccess} from 'domain/entities/patient-data-access.entity';

@Entity('patient_data_access')
export class PatientDataAccessModel implements PatientDataAccess {
    @PrimaryColumn('uuid', {name: 'access_id'})
    accessId: string;

    @Column('uuid', {name: 'patient_data_id'})
    patientUserId: string;

    @Column('uuid', {name: 'granted_data_id', nullable: true})
    grantedUserId?: string;

    @Column({name: 'invite_id', nullable: true})
    inviteId?: string;

    @Column()
    direction: string;

    @Column()
    status: string;

    @Column({name: 'created_at'})
    createdAt: string;
}
