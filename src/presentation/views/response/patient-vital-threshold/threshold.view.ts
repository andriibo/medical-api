import {ApiProperty} from '@nestjs/swagger';
import {ThresholdDto} from 'domain/dtos/response/patient-vital-threshold/threshold.dto';
import {UserView} from 'presentation/views/response/user';

export class ThresholdView implements ThresholdDto {
    @ApiProperty()
    public thresholdName: string;

    @ApiProperty()
    public value: number;

    @ApiProperty()
    public setAtTimestamp?: number;

    @ApiProperty()
    public setByUser?: UserView;
}
