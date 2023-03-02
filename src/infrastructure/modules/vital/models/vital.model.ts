import {Vital} from 'domain/entities';
import {Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from 'typeorm';
import {UserModel} from 'infrastructure/modules/auth/models';
import {FloatTransformer} from 'infrastructure/data-transformers/float.transformer';

@Entity('vital')
export class VitalModel implements Vital {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    public timestamp: number;

    @Column({type: 'decimal', precision: 5, scale: 1, transformer: new FloatTransformer()})
    public temp: number | null = null;

    @Column({name: 'is_temp_normal'})
    public isTempNormal: boolean | null;

    @Column()
    public hr: number | null = null;

    @Column({name: 'is_hr_normal'})
    public isHrNormal: boolean | null;

    @Column()
    public spo2: number | null = null;

    @Column({name: 'is_spo2_normal'})
    public isSpo2Normal: boolean | null;

    @Column()
    public rr: number | null = null;

    @Column({name: 'is_rr_normal'})
    public isRrNormal: boolean | null;

    @Column()
    public fall: boolean | null = null;

    @Column({name: 'user_id'})
    public userId: string;

    @Column({name: 'thresholds_id'})
    public thresholdsId: string;

    @ManyToOne(() => UserModel)
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    public user: UserModel;
}
