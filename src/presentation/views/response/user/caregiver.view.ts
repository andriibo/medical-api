import {ApiProperty} from '@nestjs/swagger';
import {CaregiverDto} from 'domain/dtos/response/profile/caregiver.dto';

export class CaregiverView extends CaregiverDto {
    @ApiProperty()
    public userId: string;

    @ApiProperty()
    public email: string;

    @ApiProperty()
    public firstName: string;

    @ApiProperty()
    public lastName: string;

    @ApiProperty()
    public phone: string;

    @ApiProperty()
    public role: string;

    @ApiProperty()
    public roleLabel: string;

    @ApiProperty()
    public institution: string;

    @ApiProperty({nullable: true})
    public avatar: string | null;

    @ApiProperty({nullable: true})
    public deletedAt: number | null;

    @ApiProperty()
    public passwordUpdatedAt: number;
}
