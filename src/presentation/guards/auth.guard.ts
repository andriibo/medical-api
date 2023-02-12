import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UseGuards,
    UnauthorizedException,
    ForbiddenException,
    Inject,
} from '@nestjs/common';
import {UserRequest} from 'presentation/middlewares/assign-user.middleware';
import {isNullOrUndefined} from 'app/support/type.helper';
import {IAuthedUserService} from 'app/modules/auth/services/authed-user.service';

@Injectable()
export class AuthGuard implements CanActivate {
    public constructor(@Inject(IAuthedUserService) private readonly authedUserService: IAuthedUserService) {}

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: UserRequest = context.switchToHttp().getRequest();

        if (isNullOrUndefined(request.user) || isNullOrUndefined(request.user.tokenClaims)) {
            throw new UnauthorizedException();
        }

        const user = await this.authedUserService.getUser();
        if (user.deletedAt !== null) {
            throw new ForbiddenException();
        }

        return true;
    }
}

export const Auth = () => UseGuards(AuthGuard);
