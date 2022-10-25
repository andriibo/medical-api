import {IMedicationRepository} from 'app/modules/medication/repositories';
import {MedicationDto} from 'domain/dtos/response/medication/medication.dto';

export class MedicationListUseCase {
    public constructor(private readonly medicationRepository: IMedicationRepository) {}

    public async getList(): Promise<MedicationDto[]> {
        const items = await this.medicationRepository.get();

        return items.map((item) => MedicationDto.fromMedication(item));
    }
}
