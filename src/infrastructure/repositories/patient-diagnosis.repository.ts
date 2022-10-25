import {Injectable} from '@nestjs/common';
import {InjectDataSource} from '@nestjs/typeorm';
import {DataSource} from 'typeorm';
import {IPatientDiagnosisRepository} from 'app/modules/patient-diagnosis/repositories';
import {PatientDiagnosis} from 'domain/entities';
import {PatientDiagnosisModel} from 'infrastructure/models';

@Injectable()
export class PatientDiagnosisRepository implements IPatientDiagnosisRepository {
    public constructor(@InjectDataSource() private dataSource: DataSource) {}

    public async create(patientDiagnosis: PatientDiagnosisModel): Promise<void> {
        await this.dataSource.manager.save(patientDiagnosis);
    }

    public async delete(patientDiagnosis: PatientDiagnosisModel): Promise<void> {
        await this.dataSource.manager.remove(patientDiagnosis);
    }

    public async getByPatientUserId(patientUserId: string): Promise<PatientDiagnosis[]> {
        return await this.dataSource.manager.findBy(PatientDiagnosisModel, {patientUserId});
    }

    public async getOneById(id: string): Promise<PatientDiagnosis> {
        return await this.dataSource.manager.findOneBy(PatientDiagnosisModel, {id});
    }
}
