import { Product } from './product.module';

export interface CartItem {
  product: Product;
  quantity: number;
}