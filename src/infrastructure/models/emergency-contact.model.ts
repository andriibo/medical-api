import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {EmergencyContact} from 'domain/entities';

@Entity('emergency_contact')
export class EmergencyContactModel implements EmergencyContact {
    @PrimaryGeneratedColumn('uuid', {name: 'contact_id'})
    contactId: string;

    @Column({name: 'user_id'})
    userId: string;

    @Column({name: 'first_name'})
    firstName: string;

    @Column({name: 'last_name'})
    lastName: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    relationship: string;

    @Column({name: 'created_at'})
    createdAt: string;
}
