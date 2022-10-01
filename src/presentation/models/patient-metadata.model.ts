import {Entity, Column, OneToOne, JoinColumn, PrimaryColumn} from 'typeorm';
import {PatientMetadata} from 'domain/entities/patient-metadata.entity';
import {UserModel} from './user.model';

@Entity('patient_metadata')
export class PatientMetadataModel implements PatientMetadata {
    @PrimaryColumn('uuid', {name: 'user_id'})
    userId: string;

    @Column()
    dob: Date;

    @Column()
    gender: string;

    @Column()
    height: number;

    @Column()
    wight: number;

    @OneToOne(() => UserModel)
    @JoinColumn({name: 'user_id', referencedColumnName: 'userId'})
    user: UserModel;
}
