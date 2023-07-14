import {ApiProperty} from '@nestjs/swagger';
import {MedicationDto} from 'domain/dtos/response/patient-medication/medication.dto';
import {MedicationView} from 'views/response/medication';
import {TimesPerDayEnum} from 'domain/constants/medication.const';

export class PatientMedicationView extends MedicationView implements MedicationDto {
    @ApiProperty()
    public medicationId: string;

    @ApiProperty({nullable: true})
    public dose: number | null;

    @ApiProperty({nullable: true, enum: TimesPerDayEnum})
    public timesPerDay: string | null;

    @ApiProperty()
    public createdBy: string;

    @ApiProperty()
    public createdAt: string;
}
