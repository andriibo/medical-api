import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

export enum UserRole {
    Doctor = 'Doctor',
    Patient = 'Patient',
}

@Entity()
export class User {
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
}
