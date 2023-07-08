import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {OrganizationEmergencyContact} from 'domain/entities/organization-emergency-contact.entity';
import {OrganizationTypeEnum} from 'domain/constants/emergency-contact.const';

@Entity('organization_emergency_contact')
export class OrganizationEmergencyContactModel implements OrganizationEmergencyContact {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({name: 'user_id'})
    public userId: string;

    @Column()
    public name: string;

    @Column()
    public email: string | null;

    @Column()
    public phone: string;

    @Column()
    public fax: string | null;

    @Column()
    public type: OrganizationTypeEnum;

    @Column({name: 'created_at'})
    public createdAt: string;

    @Column()
    rank: number | null;
}
