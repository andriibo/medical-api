import {ApiProperty} from '@nestjs/swagger';
import {AbsoluteVitalsDto} from 'domain/dtos/response/vital/absolute-vitals.dto';

export class AbsoluteVitalsView extends AbsoluteVitalsDto {
    @ApiProperty()
    public minHr: number;

    @ApiProperty()
    public maxHr: number;

    @ApiProperty()
    public minTemp: number;

    @ApiProperty()
    public maxTemp: number;

    @ApiProperty()
    public minSpo2: number;

    @ApiProperty()
    public maxSpo2: number;

    @ApiProperty()
    public minRr: number;

    @ApiProperty()
    public maxRr: number;

    @ApiProperty()
    public minDbp: number;

    @ApiProperty()
    public maxDbp: number;

    @ApiProperty()
    public minSbp: number;

    @ApiProperty()
    public maxSbp: number;
}
