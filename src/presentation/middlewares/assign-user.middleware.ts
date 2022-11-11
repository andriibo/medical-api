import {Injectable, NestMiddleware} from '@nestjs/common';
import {IRequestUserModel} from 'app/modules/auth/models';
import {Request, Response} from 'express';
import {RequestUserService} from 'infrastructure/services/request-user.service';

@Injectable()
export class AssignUserMiddleware implements NestMiddleware {
    public constructor(private readonly requestUserService: RequestUserService) {}

    public async use(request: UserRequest, response: Response, next: Function): Promise<any> {
        request.user = await this.requestUserService.getUserDataByHttpHeaders(request.headers);
        next();
    }
}

//TODO: Need to move it to a folder with shared models
export interface UserRequest extends Request {
    user: Nullable<IRequestUserModel>;
}

type Nullable<T> = T | null;
