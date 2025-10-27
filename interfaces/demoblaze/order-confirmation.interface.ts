/**
 * Interface for order confirmation details
 */
export interface OrderConfirmation {
  orderId: string;
  amount: number;
  cardNumber: string;
  name: string;
  date: string;
}
