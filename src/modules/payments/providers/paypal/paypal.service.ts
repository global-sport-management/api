// providers/paypal/paypal.service.ts
import { Injectable } from '@nestjs/common';
import { PaymentProvider } from '../../interfaces/payment-provider.interface';
import { CreatePaymentDto } from '../../dto/create-payment.dto';
import axios from 'axios';
import * as qs from 'qs';

@Injectable()
export class PaypalService implements PaymentProvider {
  private clientId = process.env.PAYPAL_CLIENT_ID;
  private clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  private baseUrl = 'https://api-m.sandbox.paypal.com';

  private async getAccessToken(): Promise<string> {
    const res = await axios.post(
      `${this.baseUrl}/v1/oauth2/token`,
      qs.stringify({ grant_type: 'client_credentials' }),
      {
        auth: { username: this.clientId, password: this.clientSecret },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    );
    return res.data.access_token;
  }

  async createPayment(dto: CreatePaymentDto) {
    const accessToken = await this.getAccessToken();
    const res = await axios.post(
      `${this.baseUrl}/v2/checkout/orders`,
      {
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: { currency_code: 'USD', value: dto.amount.toString() },
            description: dto.description,
          },
        ],
        application_context: {
          return_url: dto.returnUrl,
          cancel_url: dto.cancelUrl || dto.returnUrl,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return res.data;
  }

  async captureOrder(orderId: string) {
    const accessToken = await this.getAccessToken();
    const res = await axios.post(
      `${this.baseUrl}/v2/checkout/orders/${orderId}/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return res.data;
  }

  async verifyWebhook(payload: any) {
    return payload;
  }
}
