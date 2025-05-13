import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, ProductsResponse } from '@products/interfaces/products.interface';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';


interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}

@Injectable({providedIn: 'root'})
export class ProductsService {

  public baseUrl = environment.baseUrl;
  private readonly httpClient = inject(HttpClient);

  getProducts( options: Options ): Observable<ProductsResponse> {
    const { limit = 9, offset = 0, gender = '' } = options;
    return this.httpClient.get<ProductsResponse>(`${this.baseUrl}/products`, {
      params: {
        limit,
        offset,
        gender
      }
    }).pipe(
      tap( resp => console.log(resp) )
    )
  }

  getProductByIdSlug( idSlug: string ): Observable<Product> {
    return this.httpClient.get<Product>(`${this.baseUrl}/products/${idSlug}`);
  }

}
