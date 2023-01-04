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
} from 'app/modules/patient-vital-thresholds/templates/default-thresholds.template';

@Entity('patient_vital_thresholds')
export class PatientVitalThresholdsModel implements PatientVitalThresholds {
    @PrimaryGeneratedColumn()
    public id: number;

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

    @Column({name: 'min_temp'})
    minTemp: number;

    @Column({name: 'max_temp'})
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

    public static getModelWithDefaultValues(): PatientVitalThresholdsModel {
        const model = new PatientVitalThresholdsModel();
        model.minHr = MinHR.value;
        model.maxHr = MaxHR.value;
        model.minTemp = MinTemp.value;
        model.maxTemp = MaxTemp.value;
        model.minSpo2 = MinSpO2.value;
        model.minRr = MinRR.value;
        model.maxRr = MaxRR.value;
        model.minDbp = MinDBP.value;
        model.maxDbp = MaxDBP.value;
        model.minSbp = MinSBP.value;
        model.maxSbp = MaxSBP.value;
        model.minMap = MinMAP.value;
        model.maxMap = MaxMAP.value;

        return model;
    }
}
