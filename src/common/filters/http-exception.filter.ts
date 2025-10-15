import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";

@Catch()
export class HttpExceptionFilter  implements ExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        const message = exception.message || 'Internal server error';
        response.status(status).json({
            success: false,
            message: message,   
        });
    }
}