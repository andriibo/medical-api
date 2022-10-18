import {Vital} from 'domain/entities';
import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from 'typeorm';
import {UserModel} from './user.model';

@Entity('vital')
export class VitalModel implements Vital {
    @PrimaryGeneratedColumn('uuid', {name: 'vital_id'})
    vitalId: string;

    @Column()
    timestamp: number;

    @Column()
    temperature: number;

    @Column()
    hr: number;

    @Column()
    spo: number;

    @Column()
    rr: number;

    @Column()
    fall: boolean;

    @Column({name: 'user_id'})
    userId: string;

    @ManyToOne(() => UserModel)
    @JoinColumn({name: 'user_id', referencedColumnName: 'userId'})
    user: UserModel;
}
