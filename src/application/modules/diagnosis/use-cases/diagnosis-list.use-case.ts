import {IDiagnosisRepository} from 'app/modules/diagnosis/repositories';

export class DiagnosisListUseCase {
    public constructor(private readonly diagnosisRepository: IDiagnosisRepository) {}

    public async getList(): Promise<string[]> {
        const items = await this.diagnosisRepository.get();

        return items.map((item) => item.name);
    }
}
