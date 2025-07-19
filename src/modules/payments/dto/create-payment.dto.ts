export class CreatePaymentDto {
  amount: number;
  description: string;
  returnUrl: string; // cho paypal, momo
  cancelUrl?: string;
  notifyUrl?: string;
  metadata?: any;
}
