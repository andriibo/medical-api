import {ApiProperty} from '@nestjs/swagger';
import {Type} from 'class-transformer';
import {ArrayMinSize, IsArray, IsNotEmpty, IsBoolean, IsNumber, ValidateNested, IsOptional} from 'class-validator';
import {SyncVitalDto, VitalDto} from 'domain/dtos/request/vital';

export class VitalView extends VitalDto {
    @ApiProperty({nullable: true, required: false})
    @IsNumber()
    @IsOptional()
    public temperature: number | null;

    @ApiProperty({nullable: true, required: false})
    @IsNumber()
    @IsOptional()
    public hr: number | null;

    @ApiProperty({nullable: true, required: false})
    @IsNumber()
    @IsOptional()
    public spo: number | null;

    @ApiProperty({nullable: true, required: false})
    @IsNumber()
    @IsOptional()
    public rr: number | null;

    @ApiProperty({nullable: true, required: false})
    @IsBoolean()
    @IsOptional()
    public fall: boolean | null;

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
