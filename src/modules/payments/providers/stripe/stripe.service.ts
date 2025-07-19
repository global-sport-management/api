import { Injectable } from "@nestjs/common";
import { CreatePaymentDto } from "../../dto/create-payment.dto";
import { PaymentProvider } from "../../interfaces/payment-provider.interface";
import Stripe from "stripe";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class StripeService implements PaymentProvider {
  public stripe: Stripe;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('STRIPE_SECRET_KEY');
    if (!apiKey) {
      throw new Error('STRIPE_SECRET_KEY is not defined in environment variables.');
    }

    this.stripe = new Stripe(apiKey, {
      apiVersion: '2025-06-30.basil',
    });
  }

  async createPayment(data: CreatePaymentDto) {
    return this.stripe.checkout.sessions.create({
      // add your Stripe checkout configuration here
    });
  }

  async verifyWebhook(payload: Buffer, sig: string) {
    const secret = this.configService.get<string>('STRIPE_WEBHOOK_SECRET');
    if (!secret) {
      throw new Error('STRIPE_WEBHOOK_SECRET is not defined.');
    }

    return this.stripe.webhooks.constructEvent(payload, sig, secret);
  }
}
