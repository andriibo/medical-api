import {Entity, Column, OneToOne, JoinColumn, PrimaryColumn} from 'typeorm';
import {DoctorMetadata} from 'domain/entities/doctor-metadata.entity';
import {UserModel} from './user.model';

@Entity('doctor_metadata')
export class DoctorMetadataModel implements DoctorMetadata {
    @PrimaryColumn('uuid', {name: 'user_id'})
    public userId: string;

    @Column()
    public institution: string;

    @OneToOne(() => UserModel)
    @JoinColumn({name: 'user_id', referencedColumnName: 'userId'})
    public user: UserModel;
}
