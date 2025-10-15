import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private configService:ConfigService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean{
    console.log("API Key Guard is working");
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];
    const validApiKey = this.configService.get<string>('API_KEY');
    if (!apiKey || apiKey !== validApiKey) {
      return false;
    } 
    return true;
  }
}
