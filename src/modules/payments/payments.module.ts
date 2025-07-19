import { Module } from '@nestjs/common';
import { PaymentService } from './payments.service';
import { PaymentController } from './payments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentDocumentSchema } from './schemas/payment.schema';
import { PaypalService } from './providers/paypal/paypal.service';
import { MomoService } from './providers/momo/momo.service';
import { StripeService } from './providers/stripe/stripe.service';

@Module({
  imports: [
      MongooseModule.forFeature(
        [
          { name: Payment.name, schema: PaymentDocumentSchema },
        ],
      ),
    ],
 providers: [PaymentService, MomoService, PaypalService,StripeService],
  controllers: [PaymentController],
  // exports: [PaymentService],
})
export class PaymentsModule {}
