import {ApiProperty} from '@nestjs/swagger';
import {Length, IsNotEmpty, IsUUID, IsArray, IsString} from 'class-validator';
import {MedicationDto} from 'domain/dtos/request/patient-medication/medication.dto';

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
}
