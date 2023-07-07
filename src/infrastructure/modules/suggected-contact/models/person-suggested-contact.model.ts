import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {PersonSuggestedContact} from 'domain/entities/person-suggested-contact.entity';

@Entity('person_suggested_contact')
export class PersonSuggestedContactModel implements PersonSuggestedContact {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({name: 'patient_user_id'})
    public patientUserId: string;

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

    @Column({name: 'suggested_by'})
    public suggestedBy: string;

    @Column({name: 'suggested_at'})
    public suggestedAt: string;
}
