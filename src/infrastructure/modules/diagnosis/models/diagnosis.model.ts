import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {Diagnosis} from 'domain/entities';

@Entity('diagnosis')
export class DiagnosisModel implements Diagnosis {
    @PrimaryGeneratedColumn()
    public id: string;

    @Column({name: 'diagnosis_name'})
    public diagnosisName: string;
}
