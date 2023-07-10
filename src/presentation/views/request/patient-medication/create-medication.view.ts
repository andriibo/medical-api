import {ApiProperty} from '@nestjs/swagger';
import {Length, IsNotEmpty, IsUUID, IsArray, IsString, Min, Max, IsIn} from 'class-validator';
import {MedicationDto} from 'domain/dtos/request/patient-medication/medication.dto';
import {MinDose, MaxDose, TimesPerDayEnum} from 'domain/constants/medication.const';

export class CreateMedicationView extends MedicationDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    public patientUserId: string;

    @ApiProperty({minLength: 2, maxLength: 100})
    @IsNotEmpty()
    @Length(2, 100)
    public genericName: string;

    @ApiProperty()
    @IsArray()
    @IsString({each: true})
    public brandNames: string[];

    @ApiProperty({minimum: MinDose, maximum: MaxDose})
    @IsNotEmpty()
    @Min(MinDose)
    @Max(MaxDose)
    public dose: number;

    @ApiProperty({enum: [TimesPerDayEnum.QD, TimesPerDayEnum.BID, TimesPerDayEnum.TID, TimesPerDayEnum.QID]})
    @IsNotEmpty()
    @IsIn([TimesPerDayEnum.QD, TimesPerDayEnum.BID, TimesPerDayEnum.TID, TimesPerDayEnum.QID])
    public timesPerDay: string;
}
