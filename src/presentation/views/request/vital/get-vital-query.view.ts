import {ApiProperty} from '@nestjs/swagger';
import {IsDate, IsNotEmpty} from 'class-validator';

export class GetVitalQueryView {
    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    public startDate: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    public endDate: Date;
}
