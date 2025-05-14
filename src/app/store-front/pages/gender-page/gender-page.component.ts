import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductCardComponent } from '@products/components/product-card/product-card.component';
import { ProductsService } from '@products/services/products.service';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { PaginationService } from '@shared/components/pagination/pagination.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-gender-page',
  imports: [
    ProductCardComponent,
    PaginationComponent,
  ],
  templateUrl: './gender-page.component.html',
})
export class GenderPageComponent {

  public route = inject(ActivatedRoute);
  public productsService = inject(ProductsService);
  public paginationService = inject(PaginationService);

  public gender = toSignal(
    this.route.params.pipe(
      map(({ gender }) => gender),
    )
  );

  public productsResource = rxResource({
    request: () => ({
      gender: this.gender(),
      page: this.paginationService.currentpage() - 1,
    }),
    loader: ({ request }) => {
      return this.productsService.getProducts({
        gender: request.gender,
        offset: request.page * 9,
      });
    }
  });
}
