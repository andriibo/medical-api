import {CallHandler, ExecutionContext, NestInterceptor} from '@nestjs/common';
import {BadRequestException} from '@nestjs/common';
import {Injectable} from '@nestjs/common';
import {ApplicationError, InfrastructureError} from 'app/errors';
import {catchError, Observable, throwError} from 'rxjs';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError((err) => {
                if (err instanceof ApplicationError) {
                    return throwError(() => new BadRequestException(err.message));
                }
                if (err instanceof InfrastructureError) {
                    return throwError(() => new BadRequestException(err.message));
                }
                return throwError(() => new BadRequestException(err.message));
            }),
        );
    }
}
