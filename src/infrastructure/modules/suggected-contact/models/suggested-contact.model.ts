import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {SuggestedContact} from 'domain/entities/suggested-contact.entity';

@Entity('suggested_contact')
export class SuggestedContactModel implements SuggestedContact {
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
