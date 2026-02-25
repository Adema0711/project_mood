import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../models/product.model';
import { CommonModule } from '@angular/common';
import { ProductItem } from '../product-item/product-item';
@Component({
  selector: 'app-product-list',
  imports: [CommonModule, ProductItem],
  templateUrl:'./product-list.html',
  styleUrls: ['./product-list.css'],
  standalone:true,
})
export class ProductList {
  @Input() products: Product[] = [];       
  @Output() delete = new EventEmitter<number>();
}
