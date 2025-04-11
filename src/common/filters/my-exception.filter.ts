import type { ArgumentsHost, BadRequestException, ExceptionFilter } from "@nestjs/common";

export class MyExceptionFilter<T extends BadRequestException>
 implements ExceptionFilter{
  catch(exception: T, host: ArgumentsHost) {
      const context = host.switchToHttp();
      const response = context.getResponse();

      const statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();
    
      response.status(404).json({
        messagem: "deu erro",
      })
    }
}
