import {ApiProperty} from '@nestjs/swagger';
import {IsDateString, IsNotEmpty} from 'class-validator';

export class GetVitalQueryView {
    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    public startDate: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    public endDate: Date;
}
