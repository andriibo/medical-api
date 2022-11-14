import {ApiProperty} from '@nestjs/swagger';

export class UploadAvatarProfileView {
    @ApiProperty({type: 'string', format: 'binary', required: true})
    public file: Express.Multer.File;
}
