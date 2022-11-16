import {IFileNameService} from 'app/modules/profile/services/file-name.service';
import {Express} from 'express';
import {v4 as uuidv4} from 'uuid';
import * as mime from 'mime-types';

export class FileNameService implements IFileNameService {
    public createNameToUserAvatar(file: Express.Multer.File): string {
        return uuidv4() + '.' + mime.extension(file.mimetype);
    }
}
