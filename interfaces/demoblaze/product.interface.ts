/**
 * Interface for product information
 */
export interface Product {
  name: string;
  price: number;
  description?: string;
  category?: 'Phones' | 'Laptops' | 'Monitors';
}

/**
 * Interface for products data structure organized by category
 */
export interface ProductsData {
  phones: {
    [key: string]: Product;
  };
  laptops: {
    [key: string]: Product;
  };
  monitors: {
    [key: string]: Product;
  };
}
