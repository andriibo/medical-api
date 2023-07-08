import {ISpecialtyRepository} from 'app/modules/specialty/repositories';
import {SpecialtiesDto} from 'domain/dtos/response/specialty/specialties.dto';

export class GetSpecialtiesUseCase {
    public constructor(private readonly specialtyRepository: ISpecialtyRepository) {}

    public async getSpecialties(): Promise<SpecialtiesDto> {
        const items = await this.specialtyRepository.get();

        const dto = new SpecialtiesDto();
        dto.specialtyNames = items.map((item) => item.specialtyName);

        return dto;
    }
}
