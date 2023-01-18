import {Vital} from 'domain/entities';
import {FloatTransformer} from 'infrastructure/data-transformers/float.transformer';
import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from 'typeorm';
import {UserModel} from 'infrastructure/modules/auth/models';

@Entity('vital')
export class VitalModel implements Vital {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public timestamp: number;

    @Column({precision: 5, scale: 2, transformer: new FloatTransformer()})
    public temperature: number | null = null;

    @Column()
    public hr: number | null = null;

    @Column()
    public spo: number | null = null;

    @Column()
    public rr: number | null = null;

    @Column()
    public fall: boolean | null = null;

    @Column({name: 'user_id'})
    public userId: string;

    @ManyToOne(() => UserModel)
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    public user: UserModel;
}
