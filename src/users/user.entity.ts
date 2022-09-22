import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn({name: 'user_id'})
    userId: string;

    @Column()
    name: string;

    @Column({name: 'is_active', default: true})
    isActive: boolean;

    @Column({name: 'created_at', type: 'timestamp'})
    createdAt: string;
}