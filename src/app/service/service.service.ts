import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.module';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly apiUrl = 'https://fakestoreapi.com/products';
  private shoppingCart: Product[] = [];

  constructor(private http: HttpClient) { }

 
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<Product> {
  return this.http.get<Product>(`${this.apiUrl}/${id}`);
}

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/category/${category}`);
  }

  addToCart(product: Product): void {
    this.shoppingCart.push(product);
    alert("O produto " +product.title + " foi adicionado com sucesso!")
  }

  removeFromCart(id: number): void {
    this.shoppingCart = this.shoppingCart.filter(item => item.id !== id);
  }


  getCartItems(): Product[] {
    return [...this.shoppingCart];
  }

  getCartTotal(): number {
    return this.shoppingCart.reduce((total, product) => total + product.price, 0);
  }
}