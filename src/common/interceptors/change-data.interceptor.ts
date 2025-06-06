import {CallHandler,ExecutionContext,NestInterceptor,} from '@nestjs/common';
import { map } from 'rxjs';

export class ChangeDataInterceptor implements NestInterceptor {

  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    console.log('ChangeDataInterceptor executado ANTES');
   

    
    //await new Promise(resolve => setTimeout(resolve, 300));

    return next.handle().pipe(
      map(data => {
    
        if(Array.isArray(data)){
          return {
            data,
            count: data.length
          };
        }
          return data;
      }),
    );
  }
} 