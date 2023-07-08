import {Entity, Column, OneToOne, JoinColumn, PrimaryColumn} from 'typeorm';
import {CaregiverMetadata} from 'domain/entities/caregiver-metadata.entity';
import {UserModel} from './user.model';

@Entity('caregiver_metadata')
export class CaregiverMetadataModel implements CaregiverMetadata {
    @PrimaryColumn('uuid', {name: 'user_id'})
    public userId: string;

    @Column()
    public institution: string;

    @OneToOne(() => UserModel, (user) => user.caregiverMetadata)
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    public user: UserModel;
}
