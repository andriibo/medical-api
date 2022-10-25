import {IDiagnosisRepository} from 'app/modules/diagnosis/repositories';
import {DiagnosisDto} from 'domain/dtos/response/diagnosis/diagnosis.dto';

export class DiagnosisListUseCase {
    public constructor(private readonly diagnosisRepository: IDiagnosisRepository) {}

    public async getList(): Promise<DiagnosisDto[]> {
        const items = await this.diagnosisRepository.get();

        return items.map((item) => DiagnosisDto.fromDiagnosis(item));
    }
}
