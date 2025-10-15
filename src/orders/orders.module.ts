import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';
import { OrderListenersService } from './listeners/order-listeners.service';
import { OrderServiceEvent } from './event/order.service.event';
import { OrdersGateway } from './gateway/orders.gateway';
import { AppModule } from 'src/app.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    ],
  providers: [OrdersService, OrderServiceEvent, OrderListenersService, OrdersGateway],
  controllers: [OrdersController]
})
export class OrdersModule { }
