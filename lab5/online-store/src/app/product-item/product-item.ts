import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../models/product.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-product-item',
  imports: [CommonModule],
  templateUrl: './product-item.html',
  styleUrls: ['./product-item.css'],
  standalone:true,
})
export class ProductItem {
  @Input() product!:Product;
  @Output() delete = new EventEmitter<number>();
  onLike() {
    this.product.likes++;
  }
  onDelete() {
    this.delete.emit(this.product.id);  
  }
shareWhatsApp(product: Product) {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      product.name + ' - ' + product.link
    )}`;
    window.open(url, '_blank');
  }

  shareTelegram(product: Product) {
    const url = `https://t.me/share/url?url=${encodeURIComponent(
      product.link
    )}&text=${encodeURIComponent(product.name)}`;
    window.open(url, '_blank');
  }

}
