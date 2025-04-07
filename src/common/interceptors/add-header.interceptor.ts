import type { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import type { Observable } from "rxjs";

export class AddHeaderInterceptor implements NestInterceptor{
  intercept
  ( 
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {

      const response = context.switchToHttp().getResponse();
      
      response.setHeader('X-Custom-Header', 'O valor do cabeçalho é esse aqui')

      return next.handle();
      //throw new Error('Method not implemented');
  }
}