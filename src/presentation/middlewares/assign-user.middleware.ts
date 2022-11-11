import {Inject, Injectable, NestMiddleware} from '@nestjs/common';
import {IRequestUserModel} from 'app/modules/auth/models';
import {IAuthService} from 'app/modules/auth/services/auth.service';
import {Request, Response} from 'express';
import {TokenClaimsModel} from 'infrastructure/aws/cognito/token-claims.model';
import {isNullOrUndefined} from 'app/support/type.helper';

@Injectable()
export class AssignUserMiddleware implements NestMiddleware {
    public constructor(@Inject(IAuthService) private readonly authService: IAuthService) {}

    public async use(request: UserRequest, response: Response, next: Function): Promise<any> {
        request.user = await this.getTokenClaims(request);
        next();
    }

    private async getTokenClaims(request: any): Promise<IRequestUserModel> {
        const token: string = this.extractToken(request);

        try {
            const tokenClaims = await this.authService.getTokenClaims(token);

            return {
                token,
                tokenClaims: TokenClaimsModel.fromCognitoResponse(tokenClaims),
            };
        } catch {
            return null;
        }
    }

    private extractToken(request: any): string {
        const token: string = request.headers?.authorization?.replace('Bearer ', '');

        if (isNullOrUndefined(token)) {
            return '';
        }

        return token;
    }
}

//TODO: Need to move it to a folder with shared models
export interface UserRequest extends Request {
    user: Nullable<IRequestUserModel>;
}

type Nullable<T> = T | null;
