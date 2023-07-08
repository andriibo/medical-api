import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {OrganizationSuggestedContact} from 'domain/entities/organization-suggested-contact.entity';
import {OrganizationTypeEnum} from 'domain/constants/emergency-contact.const';

@Entity('organization_suggested_contact')
export class OrganizationSuggestedContactModel implements OrganizationSuggestedContact {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({name: 'patient_user_id'})
    public patientUserId: string;

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

    @Column({name: 'suggested_by'})
    public suggestedBy: string;

    @Column({name: 'suggested_at'})
    public suggestedAt: string;
}
