import {ISpecialtyRepository} from 'app/modules/specialty/repositories';
import {SpecialtyDto} from 'domain/dtos/response/specialty/specialty.dto';

export class GetSpecialtiesUseCase {
    public constructor(private readonly specialtyRepository: ISpecialtyRepository) {}

    public async getSpecialties(): Promise<SpecialtyDto[]> {
        const items = await this.specialtyRepository.get();

        return items.map((item) => SpecialtyDto.fromSpecialty(item));
    }
}
