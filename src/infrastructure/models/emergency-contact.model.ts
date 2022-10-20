import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {EmergencyContact} from 'domain/entities';

@Entity('emergency_contact')
export class EmergencyContactModel implements EmergencyContact {
    @PrimaryGeneratedColumn('uuid', {name: 'contact_id'})
    public contactId: string;

    @Column({name: 'user_id'})
    public userId: string;

    @Column({name: 'first_name'})
    public firstName: string;

    @Column({name: 'last_name'})
    public lastName: string;

    @Column()
    public email: string;

    @Column()
    public phone: string;

    @Column()
    public relationship: string;

    @Column({name: 'created_at'})
    public createdAt: string;
}
