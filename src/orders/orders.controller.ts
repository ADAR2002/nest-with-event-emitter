import { Body, Controller, Get, HttpException, Param, Patch, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @Post()
    async newOrder(@Body() body: CreateOrderDto): Promise<string> {
        try {
            return await this.ordersService.newOrder(body);
        } catch (error) {
            throw new HttpException("Failed to create a new order", 500);
        }
    }
    @Get()
    async getAllOrders(): Promise<CreateOrderDto[]> {
        try {
            return await this.ordersService.getAllOrders();
        } catch (error) {
            throw new HttpException("Failed to fetch orders", 500);
        }
    }
    @Get(':id')
    async getOrder(@Param('id') id:string): Promise<CreateOrderDto> {
        try {
            return await this.ordersService.getOrder(id);
        } catch (error) {
            throw new HttpException("Failed to fetch the order", 500);
        }
    }
    @Patch(':id')
    updateStatusOrder(): string {
        try {
            return this.ordersService.updateStatusOrder();
        } catch (error) {
            throw new HttpException("Failed to update order status", 500);
        }
    }
}
