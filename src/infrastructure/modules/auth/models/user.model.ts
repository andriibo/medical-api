import {Entity, Column, PrimaryGeneratedColumn, OneToOne} from 'typeorm';
import {User} from 'domain/entities';
import {DoctorMetadataModel} from 'infrastructure/modules/auth/models/doctor-metadata.model';
import {PatientMetadataModel} from 'infrastructure/modules/auth/models/patient-metadata.model';

@Entity('user')
export class UserModel implements User {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public email: string;

    @Column({name: 'first_name'})
    public firstName: string;

    @Column({name: 'last_name'})
    public lastName: string;

    @Column()
    public phone: string;

    @Column()
    public role: string;

    @Column({name: 'created_at'})
    public createdAt: string;

    @Column()
    public avatar: string | null;

    @Column({name: 'deleted_at'})
    public deletedAt: number | null;

    @OneToOne(() => DoctorMetadataModel, (metadata) => metadata.user)
    public doctorMetadata?: DoctorMetadataModel | null;

    @OneToOne(() => PatientMetadataModel, (metadata) => metadata.user)
    public patientMetadata?: PatientMetadataModel | null;
}
