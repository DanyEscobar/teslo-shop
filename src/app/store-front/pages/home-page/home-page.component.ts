import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductCardComponent } from '@products/components/product-card/product-card.component';
import { ProductsService } from '@products/services/products.service';
import { PaginationComponent } from "@shared/components/pagination/pagination.component";
import { PaginationService } from '@shared/components/pagination/pagination.service';

@Component({
  selector: 'app-home-page',
  imports: [
    ProductCardComponent,
    PaginationComponent,
  ],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

  public productsService = inject(ProductsService);
  public paginationService = inject(PaginationService);
  // public activedRoute = inject(ActivatedRoute);
  // public currentpage = toSignal(
  //   this.activedRoute.queryParamMap.pipe(
  //     map( (params) => (params.get('page') ? +params.get('page')! : 1) ),
  //     map( (page) => (isNaN(page) ? 1 : page) ),
  //   ),
  //   {
  //     initialValue: 1
  //   }
  // );

  public productsResource = rxResource({
    request: () => ({ page: this.paginationService.currentpage() - 1 }),
    loader: ({ request }) => {
      return this.productsService.getProducts({
        offset: request.page * 9,
      });
    }
  });
}
