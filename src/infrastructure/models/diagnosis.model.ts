import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {Diagnosis} from 'domain/entities/diagnosis.entity';

@Entity('diagnosis')
export class DiagnosisModel implements Diagnosis {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({name: 'diagnosis_name'})
    public diagnosisName: string;
}
