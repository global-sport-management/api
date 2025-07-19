import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment } from './schemas/payment.schema';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { StripeService } from './providers/stripe/stripe.service';
import { MomoService } from './providers/momo/momo.service';
import { PaypalService } from './providers/paypal/paypal.service';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name)
    private paymentModel: Model<Payment>,
    private stripe: StripeService,
    private momo: MomoService,
    private paypal: PaypalService,
  ) {}

  async createPayment(provider: 'stripe' | 'momo' | 'paypal', dto: CreatePaymentDto) {
    const payment = new this.paymentModel({
      provider,
      amount: dto.amount,
      description: dto.description,
      status: 'pending',
      metadata: dto?.metadata|| {},
    });
    await payment.save();

    let result: any;
    if (provider === 'stripe') result = await this.stripe.createPayment(dto);
    else if (provider === 'momo') result = await this.momo.createPayment(dto);
    else if (provider === 'paypal') result = await this.paypal.createPayment(dto);

    payment.externalId = result?.id || result?.orderId;
    await payment.save();

    return result;
  }

  async handleWebhook(provider: 'stripe' | 'momo' | 'paypal', payload: any, sig?: string) {
    let event;
    if (provider === 'stripe') event = await this.stripe.verifyWebhook(payload, sig as string);
    else if (provider === 'momo') event = await this.momo.verifyWebhook(payload);
    else if (provider === 'paypal') event = await this.paypal.verifyWebhook(payload);

    const externalId = event?.id;
    const status = event?.status || 'success';

    if (externalId) {
      await this.paymentModel.updateOne({ externalId }, { status });
    }
    return { received: true };
  }

  async capturePaypal(orderId: string) {
    const data = await this.paypal.captureOrder(orderId);
    await this.paymentModel.updateOne({ externalId: orderId }, { status: 'success' });
    return data;
  }
}