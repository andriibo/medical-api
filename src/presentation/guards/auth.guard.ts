import {Injectable, CanActivate, ExecutionContext, UseGuards, UnauthorizedException} from '@nestjs/common';
import {UserRequest} from 'presentation/middlewares/assign-user.middleware';

@Injectable()
export class AuthGuard implements CanActivate {
    public constructor() {}

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: UserRequest = context.switchToHttp().getRequest();
        if (request.tokenClaims === null) {
            throw new UnauthorizedException();
        }

        return true;
    }
}

export const Auth = () => UseGuards(AuthGuard);
