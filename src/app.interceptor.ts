import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class AppInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any>{
        const request = context.switchToHttp().getRequest();
        const now = Date.now();
        console.log(request)
        return next.handle()
        .pipe(
            tap(() => console.log(`After... ${Date.now() - now}ms`)),
          )
    }
}