import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {Medication} from 'domain/entities';

@Entity('medication')
export class MedicationModel implements Medication {
    @PrimaryGeneratedColumn()
    public id: string;

    @Column({name: 'generic_name'})
    public genericName: string;

    @Column('text', {array: true, name: 'brand_names'})
    public brandNames: string[];
}
