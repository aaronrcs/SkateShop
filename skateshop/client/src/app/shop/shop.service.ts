import { ShopParams } from './../shared/models/shopParams';
import { IType } from './../shared/models/productType';
import { IBrand } from './../shared/models/brand';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPagination } from '../shared/models/pagination';
import { map } from 'rxjs/operators';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/'

  constructor(private http: HttpClient) { }

  // getProducts: retrieves a list of all available products
  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();

    // Appending HttpParams back to our API for various filtering/sorting options
    if (shopParams.brandId !== 0) {
      params = params.append('brandId', shopParams.brandId.toString());
    }

    if (shopParams.typeId !== 0) {
      params = params.append('typeId', shopParams.typeId.toString());
    }

    if (shopParams.search) {
      params = params.append('search', shopParams.search);
    }

      params = params.append('sortingQuery', shopParams.sort);

      params = params.append('pageIndex', shopParams.pageNumber.toString());
      params = params.append('pageIndex', shopParams.pageSize.toString());

    // Sending params back to API as an 'object'
    // Returning the a filtered or sorted list of products back to user
    return this.http.get<IPagination>(this.baseUrl + 'products', {observe: 'response', params})
      .pipe(
        map(response => {
          return response.body;
        })
      )
  }

  // getProduct: retrieves info for an individual product
  getProduct(id: number) {
    return this.http.get<IProduct>(this.baseUrl + 'products/' + id);
  }

  // getBrands: retrieves a list of available brands
  getBrands() {
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }

  // getTypes: retrieves a list of available types
  getTypes() {
    return this.http.get<IType[]>(this.baseUrl + 'products/types');
  }
}
