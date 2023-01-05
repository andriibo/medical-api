import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {User, UserMetadata} from 'domain/entities';

@Entity('user')
export class UserModel implements User {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

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

    @Column({name: 'created_at'})
    public createdAt: string;

    @Column()
    public avatar: string | null;

    @Column({name: 'deleted_at'})
    public deletedAt: string | null;

    public metadata?: UserMetadata;
}
