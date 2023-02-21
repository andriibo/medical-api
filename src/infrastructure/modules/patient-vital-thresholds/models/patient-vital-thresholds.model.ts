import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {PatientVitalThresholds} from 'domain/entities';
import {
    MaxDBP,
    MaxHR,
    MaxMAP,
    MaxRR,
    MaxSBP,
    MaxTemp,
    MinDBP,
    MinHR,
    MinMAP,
    MinRR,
    MinSBP,
    MinSpO2,
    MinTemp,
} from 'domain/constants/thresholds.const';
import {FloatTransformer} from 'infrastructure/data-transformers/float.transformer';

@Entity('patient_vital_thresholds')
export class PatientVitalThresholdsModel implements PatientVitalThresholds {
    @PrimaryGeneratedColumn()
    public id: string;

    @Column({name: 'patient_user_id'})
    public patientUserId: string;

    @Column({name: 'min_hr'})
    minHr: number;

    @Column({name: 'max_hr'})
    maxHr: number;

    @Column({name: 'hr_set_by'})
    hrSetBy: string | null = null;

    @Column({name: 'hr_set_at'})
    hrSetAt: number | null = null;

    @Column('numeric', {name: 'min_temp', precision: 5, scale: 2, transformer: new FloatTransformer()})
    minTemp: number;

    @Column('numeric', {name: 'max_temp', precision: 5, scale: 2, transformer: new FloatTransformer()})
    maxTemp: number;

    @Column({name: 'temp_set_by'})
    tempSetBy: string | null = null;

    @Column({name: 'temp_set_at'})
    tempSetAt: number | null = null;

    @Column({name: 'min_spo2'})
    minSpo2: number;

    @Column({name: 'spo2_set_by'})
    spo2SetBy: string | null = null;

    @Column({name: 'spo2_set_at'})
    spo2SetAt: number | null = null;

    @Column({name: 'min_rr'})
    minRr: number;

    @Column({name: 'max_rr'})
    maxRr: number;

    @Column({name: 'rr_set_by'})
    rrSetBy: string | null = null;

    @Column({name: 'rr_set_at'})
    rrSetAt: number | null = null;

    @Column({name: 'min_dbp'})
    minDbp: number;

    @Column({name: 'max_dbp'})
    maxDbp: number;

    @Column({name: 'dbp_set_by'})
    dbpSetBy: string | null = null;

    @Column({name: 'dbp_set_at'})
    dbpSetAt: number | null = null;

    @Column({name: 'min_sbp'})
    minSbp: number;

    @Column({name: 'max_sbp'})
    maxSbp: number;

    @Column({name: 'sbp_set_by'})
    sbpSetBy: string | null = null;

    @Column({name: 'sbp_set_at'})
    sbpSetAt: number | null = null;

    @Column({name: 'min_map'})
    minMap: number;

    @Column({name: 'max_map'})
    maxMap: number;

    @Column({name: 'map_set_by'})
    mapSetBy: string | null = null;

    @Column({name: 'map_set_at'})
    mapSetAt: number | null = null;

    @Column({name: 'created_at'})
    public createdAt: string;

    public static getModelWithDefaultValues(): PatientVitalThresholdsModel {
        const model = new PatientVitalThresholdsModel();
        model.minHr = MinHR;
        model.maxHr = MaxHR;
        model.minTemp = MinTemp;
        model.maxTemp = MaxTemp;
        model.minSpo2 = MinSpO2;
        model.minRr = MinRR;
        model.maxRr = MaxRR;
        model.minDbp = MinDBP;
        model.maxDbp = MaxDBP;
        model.minSbp = MinSBP;
        model.maxSbp = MaxSBP;
        model.minMap = MinMAP;
        model.maxMap = MaxMAP;

        return model;
    }
}
