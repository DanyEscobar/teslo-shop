import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'productImage'
})

export class ProductImagePipe implements PipeTransform {

  public baseUrl = environment.baseUrl;
  transform(value: string | string[]): string {
    if ( typeof value === 'string') {
      return `${this.baseUrl}/files/product/${value}`;
    }

    const image = value.at(0);

    if ( !image ){
      return './assets/images/no-image.jpg';
    }

    return `${this.baseUrl}/files/product/${image}`
  }
}
