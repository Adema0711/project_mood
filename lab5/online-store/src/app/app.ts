import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductList } from './product-list/product-list';
import { ProductService } from './services/product';
import { Category } from './models/category.model';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: true,
  imports: [CommonModule, ProductList]
})
export class AppComponent implements OnInit {
  categories: Category[] = [];
  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedCategoryId: number | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.categories = this.productService.getCategories();
    this.products = this.productService.getProducts();
  }

  selectCategory(categoryId: number) {
    this.selectedCategoryId = categoryId;
    this.filteredProducts = this.products.filter(
      product => product.categoryId === categoryId
    );
  }

  deleteProduct(productId: number) {
    this.products = this.products.filter(p => p.id !== productId);
    this.filteredProducts = this.filteredProducts.filter(p => p.id !== productId);
  }
}
