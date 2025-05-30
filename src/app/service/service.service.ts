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

  /**
   * Obtém todos os produtos da API
   * @returns Observable com array de produtos
   */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  /**
   * Obtém um produto específico por ID
   * @param id ID do produto
   * @returns Observable com o produto
   */
  getProductById(id: number): Observable<Product> {
  return this.http.get<Product>(`${this.apiUrl}/${id}`);
}

  /**
   * Obtém produtos por categoria
   * @param category Categoria dos produtos
   * @returns Observable com array de produtos
   */
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/category/${category}`);
  }

  /**
   * Adiciona um produto ao carrinho
   * @param product Produto a ser adicionado
   */
  addToCart(product: Product): void {
    this.shoppingCart.push(product);
    alert("O produto " +product.title + " foi adicionado com sucesso!")
  }

  /**
   * Remove um produto do carrinho por ID
   * @param id ID do produto a ser removido
   */
  removeFromCart(id: number): void {
    this.shoppingCart = this.shoppingCart.filter(item => item.id !== id);
  }

  /**
   * Obtém todos os itens do carrinho
   * @returns Array de produtos no carrinho
   */
  getCartItems(): Product[] {
    return [...this.shoppingCart];
  }

  /**
   * Calcula o total do carrinho
   * @returns Valor total dos itens no carrinho
   */
  getCartTotal(): number {
    return this.shoppingCart.reduce((total, product) => total + product.price, 0);
  }

  /**
   * Limpa todos os itens do carrinho
   */
  clearCart(): void {
    this.shoppingCart = [];
  }
}