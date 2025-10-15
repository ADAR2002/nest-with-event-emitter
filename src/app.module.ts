import { HttpException, Module, Res } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './common/guards/api-key.guard';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

@Module({
  imports: [
     ConfigModule.forRoot({ isGlobal: true ,envFilePath: '.env'}),
     OrdersModule,
     MongooseModule.forRoot(process.env.MONGO_URI!),],
     providers: [
      {
        provide: APP_GUARD,
        useClass: ApiKeyGuard,
      },
      {
        provide: 'APP_INTERCEPTOR',
        useClass: ResponseInterceptor,
      },
      {
        provide: 'APP_FILTER',
        useClass: HttpExceptionFilter,
      }
    ],
})
export class AppModule { }
