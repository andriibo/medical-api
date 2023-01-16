import {ApiProperty} from '@nestjs/swagger';
import {Type} from 'class-transformer';
import {ArrayMinSize, IsArray, IsNotEmpty, IsBoolean, IsNumber, ValidateNested, ValidateIf} from 'class-validator';
import {SyncVitalDto, VitalDto} from 'domain/dtos/request/vital';

export class VitalView extends VitalDto {
    @ApiProperty({nullable: true, required: false})
    @IsNumber()
    @ValidateIf((object, value) => value != null)
    public temperature: number | null;

    @ApiProperty({nullable: true, required: false})
    @IsNumber()
    @ValidateIf((object, value) => value != null)
    public hr: number | null;

    @ApiProperty({nullable: true, required: false})
    @IsNumber()
    @ValidateIf((object, value) => value != null)
    public spo: number | null;

    @ApiProperty({nullable: true, required: false})
    @IsNumber()
    @ValidateIf((object, value) => value != null)
    public rr: number | null;

    @ApiProperty({nullable: true, required: false})
    @IsBoolean()
    @ValidateIf((object, value) => value != null)
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
