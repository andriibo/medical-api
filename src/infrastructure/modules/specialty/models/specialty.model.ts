import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {Specialty} from 'domain/entities';

@Entity('specialty')
export class SpecialtyModel implements Specialty {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({name: 'specialty_name'})
    public specialtyName: string;
}
