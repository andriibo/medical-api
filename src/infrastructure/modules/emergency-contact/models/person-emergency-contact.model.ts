import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {PersonEmergencyContact} from 'domain/entities';

@Entity('person_emergency_contact')
export class PersonEmergencyContactModel implements PersonEmergencyContact {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

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

    @Column()
    rank: number | null;
}
