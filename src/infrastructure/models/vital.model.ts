import {Vital} from 'domain/entities';
import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from 'typeorm';
import {UserModel} from './user.model';

@Entity('vital')
export class VitalModel implements Vital {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public timestamp: number;

    @Column()
    public temperature: number;

    @Column()
    public hr: number;

    @Column()
    public spo: number;

    @Column()
    public rr: number;

    @Column()
    public fall: boolean;

    @Column({name: 'user_id'})
    public userId: string;

    @ManyToOne(() => UserModel)
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    public user: UserModel;
}
