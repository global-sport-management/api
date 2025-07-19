// providers/momo/momo.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PaymentProvider } from '../../interfaces/payment-provider.interface';
import { CreatePaymentDto } from '../../dto/create-payment.dto';

@Injectable()
export class MomoService implements PaymentProvider {
  async createPayment(data: CreatePaymentDto) {
    const body = {
      partnerCode: process.env.MOMO_PARTNER_CODE,
      accessKey: process.env.MOMO_ACCESS_KEY,
      secretKey: process.env.MOMO_SECRET_KEY,
      requestId: `${Date.now()}`,
      amount: data.amount,
      orderId: `order-${Date.now()}`,
      orderInfo: data.description,
      redirectUrl: data.returnUrl,
      ipnUrl: data.notifyUrl,
      requestType: 'captureWallet',
      extraData: '',
    };

    // Sign and send request
    const signature = this.generateSignature(body);
    const response = await axios.post('https://test-payment.momo.vn/v2/gateway/api/create', {
      ...body,
      signature,
    });

    return response.data;
  }

  private generateSignature(body: any): string {
    // Tạo chữ ký theo hướng dẫn của MoMo
    return ''; // logic tạo chữ ký SHA256
  }

  async verifyWebhook(payload: any) {
    // Kiểm tra chữ ký, trạng thái giao dịch, cập nhật DB
    return payload;
  }
}
