/**
 * Interface for checkout form information
 */
export interface CheckoutInfo {
  name: string;
  country: string;
  city: string;
  card: string;
  month: string;
  year: string;
}

/**
 * Interface for checkout data structure
 */
export interface CheckoutData {
  customer1: CheckoutInfo;
  [key: string]: CheckoutInfo;
}
