import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {Medication} from 'domain/entities';

@Entity('medication')
export class MedicationModel implements Medication {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({name: 'generic_name'})
    public genericName: string;

    @Column({name: 'brand_names'})
    public brandNames: string;
}
