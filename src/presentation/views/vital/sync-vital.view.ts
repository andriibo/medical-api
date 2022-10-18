import {ApiProperty} from '@nestjs/swagger';
import {IsBoolean, IsNotEmpty, IsNumber, Max, Min} from 'class-validator';
import {SyncVitalDto} from 'domain/dtos/vital/sync-vital.dto';

export class SyncVitalView extends SyncVitalDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Min(34)
    @Max(42) //40
    public temperature: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(200) //160
    public hr: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Min(80)
    @Max(105)
    public spo: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Min(-10)
    @Max(40)
    public rr: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    public fall: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    public timestamp: number;
}
