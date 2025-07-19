
import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { PaymentService } from './payments.service'
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('/api/v1/payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create/:provider')
  create(@Param('provider') provider: 'stripe' | 'momo' | 'paypal', @Body() dto: CreatePaymentDto) {
    return this.paymentService.createPayment(provider, dto);
  }

  @Post('webhook/:provider')
  webhook(@Param('provider') provider: 'stripe' | 'momo' | 'paypal', @Body() payload: any) {
    return this.paymentService.handleWebhook(provider, payload);
  }

  @Get('paypal/capture/:orderId')
  capturePaypal(@Param('orderId') orderId: string) {
    return this.paymentService.capturePaypal(orderId);
  }
}
