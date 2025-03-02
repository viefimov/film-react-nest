import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderInfoDTO } from './dto/order.dto';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue({
        createOrder: jest.fn().mockResolvedValue({
          items: [
            {
              film: 'filmId',
              session: 'sessionId',
              daytime: JSON.stringify(new Date('2025-02-02T10:00:00Z')),
              day: JSON.stringify(new Date('2025-02-02')),
              time: JSON.stringify(new Date('T10:00:00Z')),
              row: 4,
              seat: 5,
              price: 500,
            },
          ],
          total: 1,
        }),
      })
      .compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  it('.createOrder() ', async () => {
    const orderData: OrderInfoDTO = {
      tickets: [
        {
          film: 'filmId',
          session: 'sessionId',
          daytime: JSON.stringify(new Date('2025-02-02T10:00:00Z')),
          day: JSON.stringify(new Date('2025-02-02')),
          time: JSON.stringify(new Date('T10:00:00Z')),
          row: 4,
          seat: 5,
          price: 500,
        },
      ],
      email: 'test@mail.com',
      phone: '+79528545478',
    };
    const orderComplete = await controller.createOrder(orderData);
    const result = {
      items: orderData.tickets,
      total: orderData.tickets.length,
    };
    expect(orderComplete).toEqual(result);
    expect(service.createOrder).toHaveBeenCalledWith(orderData);
  });
});
