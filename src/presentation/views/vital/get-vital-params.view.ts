import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsUUID} from 'class-validator';

export class GetVitalParamsView {
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    public userId: string;
}
