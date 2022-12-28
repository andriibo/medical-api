import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {PatientVitalThresholds} from 'domain/entities';

@Entity('patient_vital_thresholds', {
    orderBy: {
        id: 'DESC',
    },
})
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
    hrSetBy?: string;

    @Column({name: 'hr_set_at'})
    hrSetAt?: number;

    @Column({name: 'min_temp'})
    minTemp: number;

    @Column({name: 'max_temp'})
    maxTemp: number;

    @Column({name: 'temp_set_by'})
    tempSetBy?: string;

    @Column({name: 'temp_set_at'})
    tempSetAt?: number;

    @Column({name: 'min_spo2'})
    minSpo2: number;

    @Column({name: 'spo2_set_by'})
    spo2SetBy?: string;

    @Column({name: 'spo2_set_at'})
    spo2SetAt?: number;

    @Column({name: 'min_rr'})
    minRr: number;

    @Column({name: 'max_rr'})
    maxRr: number;

    @Column({name: 'rr_set_by'})
    rrSetBy?: string;

    @Column({name: 'hr_set_at'})
    rrSetAt?: number;

    @Column({name: 'min_dbp'})
    minDbp: number;

    @Column({name: 'max_dbp'})
    maxDbp: number;

    @Column({name: 'dbp_set_by'})
    dbpSetBy?: string;

    @Column({name: 'dbp_set_at'})
    dbpSetAt?: number;

    @Column({name: 'min_sbp'})
    minSbp: number;

    @Column({name: 'max_sbp'})
    maxSbp: number;

    @Column({name: 'sbp_set_by'})
    sbpSetBy?: string;

    @Column({name: 'sbp_set_at'})
    sbpSetAt?: number;

    @Column({name: 'min_map'})
    minMap: number;

    @Column({name: 'max_map'})
    maxMap: number;

    @Column({name: 'map_set_by'})
    mapSetBy?: string;

    @Column({name: 'map_set_at'})
    mapSetAt?: number;
}
