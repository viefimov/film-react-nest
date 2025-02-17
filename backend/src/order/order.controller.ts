import { Controller, Post, Body } from '@nestjs/common';
import { OrderInfoDTO } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(@Body() orderData: OrderInfoDTO) {
    return this.orderService.createOrder(orderData);
  }
}
