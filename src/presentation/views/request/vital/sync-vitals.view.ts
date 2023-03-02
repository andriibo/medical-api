import {ApiProperty} from '@nestjs/swagger';
import {Type} from 'class-transformer';
import {
    ArrayMinSize,
    IsArray,
    IsNotEmpty,
    IsBoolean,
    IsNumber,
    ValidateNested,
    IsOptional,
    IsUUID,
} from 'class-validator';
import {SyncVitalsDto, VitalDto} from 'domain/dtos/request/vital';

export class VitalView extends VitalDto {
    @ApiProperty({nullable: true, required: false, multipleOf: 0.1})
    @IsNumber()
    @IsOptional()
    public temp: number | null;

    @ApiProperty({nullable: true, required: false})
    @IsBoolean()
    @IsOptional()
    public isTempNormal: boolean | null;

    @ApiProperty({nullable: true, required: false})
    @IsNumber()
    @IsOptional()
    public hr: number | null;

    @ApiProperty({nullable: true, required: false})
    @IsBoolean()
    @IsOptional()
    public isHrNormal: boolean | null;

    @ApiProperty({nullable: true, required: false})
    @IsNumber()
    @IsOptional()
    public spo2: number | null;

    @ApiProperty({nullable: true, required: false})
    @IsBoolean()
    @IsOptional()
    public isSpo2Normal: boolean | null;

    @ApiProperty({nullable: true, required: false})
    @IsNumber()
    @IsOptional()
    public rr: number | null;

    @ApiProperty({nullable: true, required: false})
    @IsBoolean()
    @IsOptional()
    public isRrNormal: boolean | null;

    @ApiProperty({nullable: true, required: false})
    @IsBoolean()
    @IsOptional()
    public fall: boolean | null;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    public timestamp: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    public thresholdsId: string;
}

export class SyncVitalsView extends SyncVitalsDto {
    @ApiProperty({isArray: true, type: VitalView})
    @IsArray()
    @ValidateNested()
    @ArrayMinSize(1)
    @Type(() => VitalView)
    public vitals: VitalView[] = [];
}
