import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {User, UserMetadata} from 'domain/entities';

@Entity('user')
export class UserModel implements User {
    @PrimaryGeneratedColumn('uuid', {name: 'user_id'})
    userId: string;

    @Column()
    email: string;

    @Column({name: 'first_name'})
    firstName: string;

    @Column({name: 'last_name'})
    lastName: string;

    @Column()
    phone: string;

    @Column()
    role: string;

    @Column({name: 'is_active'})
    isActive: boolean;

    @Column({name: 'created_at'})
    createdAt: string;

    metadata: UserMetadata;
}
