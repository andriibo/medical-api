import {Entity, Column, PrimaryGeneratedColumn, OneToOne, BeforeInsert} from 'typeorm';
import {User} from 'domain/entities';
import {DoctorMetadataModel, PatientMetadataModel, CaregiverMetadataModel} from 'infrastructure/modules/auth/models';
import {currentUnixTimestamp} from 'support/date.helper';

@Entity('user')
export class UserModel implements User {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public email: string | null;

    @Column({name: 'first_name'})
    public firstName: string;

    @Column({name: 'last_name'})
    public lastName: string;

    @Column()
    public phone: string;

    @Column()
    public role: string;

    @Column({name: 'role_label'})
    public roleLabel: string;

    @Column({name: 'created_at'})
    public createdAt: string;

    @Column()
    public avatar: string | null;

    @Column({name: 'deleted_at'})
    public deletedAt: number | null;

    @Column({name: 'password_updated_at'})
    public passwordUpdatedAt: number;

    @OneToOne(() => DoctorMetadataModel, (metadata) => metadata.user)
    public doctorMetadata?: DoctorMetadataModel | null;

    @OneToOne(() => PatientMetadataModel, (metadata) => metadata.user)
    public patientMetadata?: PatientMetadataModel | null;

    @OneToOne(() => CaregiverMetadataModel, (metadata) => metadata.user)
    public caregiverMetadata?: CaregiverMetadataModel | null;

    @BeforeInsert()
    insertCreated() {
        this.passwordUpdatedAt = currentUnixTimestamp();
    }
}
