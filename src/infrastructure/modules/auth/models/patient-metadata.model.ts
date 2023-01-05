import {Entity, Column, OneToOne, JoinColumn, PrimaryColumn} from 'typeorm';
import {PatientMetadata} from 'domain/entities/patient-metadata.entity';
import {UserModel} from './user.model';

@Entity('patient_metadata')
export class PatientMetadataModel implements PatientMetadata {
    @PrimaryColumn('uuid', {name: 'user_id'})
    public userId: string;

    @Column()
    public dob: Date;

    @Column()
    public gender: string;

    @Column()
    public height: number;

    @Column()
    public weight: number;

    @OneToOne(() => UserModel, (user) => user.patientMetadata)
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    public user: UserModel;
}
