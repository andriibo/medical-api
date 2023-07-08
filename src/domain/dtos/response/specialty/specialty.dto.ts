import {Specialty} from 'domain/entities';

export class SpecialtyDto {
    public specialtyName: string;

    public static fromSpecialty(specialty: Specialty): SpecialtyDto {
        const dto = new SpecialtyDto();
        dto.specialtyName = specialty.specialtyName;

        return dto;
    }
}
