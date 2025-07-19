export interface PaymentProvider {
  createPayment(data: any): Promise<any>;
  verifyWebhook?(payload: any, signature?: string): Promise<any>;
  refund?(transactionId: string): Promise<any>;
}