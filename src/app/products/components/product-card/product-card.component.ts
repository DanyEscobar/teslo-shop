import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@products/interfaces/products.interface';
import { ProductsService } from '../../services/products.service';
import { SlicePipe } from '@angular/common';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';

@Component({
  selector: 'app-product-card',
  imports: [
    RouterLink,
    SlicePipe,
    ProductImagePipe,
  ],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {

  public product = input.required<Product>();
  public productsService = inject(ProductsService);
  // public imageUrl = computed(() => `${this.productsService.baseUrl}/files/product/${this.product().images[0]}`);
}
