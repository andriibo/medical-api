import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {User, UserMetadata} from 'domain/entities';

@Entity('user')
export class UserModel implements User {
    @PrimaryGeneratedColumn('uuid', {name: 'user_id'})
    public userId: string;

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

    @Column({name: 'is_active'})
    public isActive: boolean;

    @Column({name: 'created_at'})
    public createdAt: string;

    public metadata: UserMetadata;
}
