import {Injectable, CanActivate, ExecutionContext, Inject, UseGuards, UnauthorizedException} from '@nestjs/common';
import {IAuthService} from 'app/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(@Inject(IAuthService) private readonly authService: IAuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token: string = request.headers?.authorization?.replace('Bearer ', '');
        if (this.isNullOrUndefined(token)) {
            throw new UnauthorizedException();
        }

        try {
            await this.authService.getTokenClaims(token);
            return true;
        } catch {
            throw new UnauthorizedException();
        }
    }

    private isNullOrUndefined(value: string): boolean {
        return value === null || value === undefined;
    }
}

export const Auth = () => UseGuards(AuthGuard);
