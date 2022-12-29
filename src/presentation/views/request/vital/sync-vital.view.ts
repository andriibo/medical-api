import {ApiProperty} from '@nestjs/swagger';
import {Type} from 'class-transformer';
import {ArrayMinSize, IsArray, IsNotEmpty, IsBoolean, IsNumber, ValidateNested} from 'class-validator';
import {SyncVitalDto, VitalDto} from 'domain/dtos/request/vital';

export class VitalView extends VitalDto {
    @ApiProperty({nullable: true})
    @IsNumber()
    public temperature: number | null;

    @ApiProperty({nullable: true})
    @IsNumber()
    public hr: number | null;

    @ApiProperty({nullable: true})
    @IsNumber()
    public spo: number | null;

    @ApiProperty({nullable: true})
    @IsNumber()
    public rr: number | null;

    @ApiProperty({nullable: true})
    @IsBoolean()
    public fall: boolean | null;
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    public timestamp: number | null;
}

export class SyncVitalView extends SyncVitalDto {
    @ApiProperty({isArray: true, type: VitalView})
    @IsArray()
    @ValidateNested()
    @ArrayMinSize(1)
    @Type(() => VitalView)
    public vitals: VitalView[] = [];
}
