import {ApiProperty} from '@nestjs/swagger';
import {MedicationDto} from 'domain/dtos/response/patient-medication/medication.dto';
import {UserView} from 'presentation/views/response/user';

export class MedicationView implements MedicationDto {
    @ApiProperty()
    public medicationId: string;

    @ApiProperty()
    public genericName: string;

    @ApiProperty()
    public brandNames: string[];

    @ApiProperty()
    public createdAt: string;

    @ApiProperty()
    public createdByUser: UserView;
}
