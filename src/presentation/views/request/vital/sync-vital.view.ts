import {ApiProperty} from '@nestjs/swagger';
import {Type} from 'class-transformer';
import {ArrayMinSize, IsArray, IsNotEmpty, IsBoolean, IsNumber, ValidateNested} from 'class-validator';
import {SyncVitalDto, VitalDto} from 'domain/dtos/request/vital';

export class VitalView extends VitalDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    public temperature: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    public hr: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    public spo: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
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

export class SyncVitalView extends SyncVitalDto {
    @ApiProperty({isArray: true, type: VitalView})
    @IsArray()
    @ValidateNested()
    @ArrayMinSize(1)
    @Type(() => VitalView)
    public vitals: VitalView[] = [];
}
