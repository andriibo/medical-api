import {Entity, Column, PrimaryColumn} from 'typeorm';
import {PatientStatus, PatientStatusEnum} from 'domain/entities/patient-status.entity';
import {currentUnixTimestamp} from 'app/support/date.helper';

@Entity('patient_status')
export class PatientStatusModel implements PatientStatus {
    @PrimaryColumn('uuid', {name: 'patient_user_id'})
    public patientUserId: string;

    @Column()
    public status: string;

    @Column({name: 'set_at'})
    public setAt: number;

    public static getModelWithDefaultValues(patientUserId: string): PatientStatusModel {
        const model = new PatientStatusModel();
        model.patientUserId = patientUserId;
        model.status = PatientStatusEnum.Normal;
        model.setAt = currentUnixTimestamp();

        return model;
    }
}
