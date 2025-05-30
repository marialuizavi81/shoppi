import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../service/service.service';
import { Product } from '../../models/product.module';
import { CartItem } from '../../models/cart-item.module';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loja',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './loja.component.html',
  styleUrls: ['./loja.component.css']
})
export class LojaComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  cartItems: CartItem[] = [];
  selectedProduct: Product | null = null;
  isDetailsVisible = false;
  detailsButtonText = 'Exibir detalhes';
  searchTerm = '';
  selectedCategory = 'all';
  isLoading = true;
  errorMessage = '';

 constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCartItems();
  }

  private loadProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = [...products];
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erro ao carregar produtos. Tente novamente mais tarde.';
        this.isLoading = false;
        console.error('Error loading products:', err);
      }
    });
  }

  private loadCartItems(): void {
    this.cartItems = this.productService.getCartItems().map(item => ({
      product: item,
      quantity: 1
    }));
  }

  viewProductDetails(productId: number) {
  this.router.navigate(['/products', productId]);
}

  addToCart(product: Product): void {
    this.productService.addToCart(product);
    this.loadCartItems();
  }

  removeFromCart(productId: number): void {
    this.productService.removeFromCart(productId);
    this.loadCartItems(); 
  }

  getCartTotal(): number {
    return this.productService.getCartTotal();
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = this.selectedCategory === 'all' || 
                            product.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = 'all';
    this.filteredProducts = [...this.products];
  }

  getCategories(): string[] {
    const categories = this.products.map(p => p.category);
    return ['all', ...new Set(categories)]; 
  }
}