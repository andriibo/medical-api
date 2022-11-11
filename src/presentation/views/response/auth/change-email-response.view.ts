import {ApiProperty} from '@nestjs/swagger';
import {ChangeEmailResultDto} from 'domain/dtos/response/auth/change-email.dto';

export class ChangeEmailResponseView extends ChangeEmailResultDto {
    @ApiProperty()
    public attributeName: string;

    @ApiProperty()
    public deliveryMedium: string;

    @ApiProperty()
    public destination: string;
}
