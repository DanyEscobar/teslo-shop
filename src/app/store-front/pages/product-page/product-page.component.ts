import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductCarouselComponent } from '@products/components/product-carousel/product-carousel.component';
import { ProductsService } from '@products/services/products.service';

@Component({
  selector: 'app-product-page',
  imports: [
    ProductCarouselComponent,
  ],
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent {

  public productsService = inject(ProductsService);
  public productIdSlug: string = inject(ActivatedRoute).snapshot.params['idSlug'];
  // public productId: string = inject(ActivatedRoute).snapshot.paramMap.get('idSlug');
  public productResource = rxResource({
    request: () => ({ idSlug: this.productIdSlug }),
    loader: ({ request }) => this.productsService.getProductByIdSlug(request.idSlug),
  });
}
