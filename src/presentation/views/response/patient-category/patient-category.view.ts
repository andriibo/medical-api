import {ApiProperty} from '@nestjs/swagger';
import {PatientCategoryDto} from 'domain/dtos/response/patient-category/patient-category.dto';

export class PatientCategoryView implements PatientCategoryDto {
    @ApiProperty()
    public patientUserId: string;

    @ApiProperty()
    public category: string;

    @ApiProperty()
    public setAt: number;
}
