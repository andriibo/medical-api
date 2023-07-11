import {Injectable} from '@nestjs/common';
import {InjectDataSource} from '@nestjs/typeorm';
import {DataSource} from 'typeorm';
import {IPatientMedicationRepository} from 'app/modules/patient-medication/repositories';
import {PatientMedication} from 'domain/entities';
import {PatientMedicationModel} from './patient-medication.model';

@Injectable()
export class PatientMedicationRepository implements IPatientMedicationRepository {
    public constructor(@InjectDataSource() private dataSource: DataSource) {}

    public async create(patientDiagnosis: PatientMedicationModel): Promise<void> {
        await this.dataSource.manager.save(patientDiagnosis);
    }

    public async update(patientDiagnosis: PatientMedicationModel): Promise<void> {
        await this.dataSource.manager.save(patientDiagnosis);
    }

    public async delete(patientDiagnosis: PatientMedicationModel): Promise<void> {
        await this.dataSource.manager.remove(patientDiagnosis);
    }

    public async getByPatientUserId(patientUserId: string): Promise<PatientMedication[]> {
        return await this.dataSource.manager.findBy(PatientMedicationModel, {patientUserId});
    }

    public async getOneById(id: string): Promise<PatientMedication> {
        return await this.dataSource.manager.findOneBy(PatientMedicationModel, {id});
    }
}
