import { IType } from './../shared/models/productType';
import { IBrand } from './../shared/models/brand';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPagination } from '../shared/models/pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/'

  constructor(private http: HttpClient) { }

  // getProducts: retrieves a list of available products
  getProducts(brandId?: number, typeId?: number, sort?: string) {
    let params = new HttpParams();

    if (brandId) {
      params = params.append('brandId', brandId.toString());
    }

    if (typeId) {
      params = params.append('typeId', typeId.toString());
    }

    if (sort) {
      params = params.append('sortingQuery', sort);
    }

    return this.http.get<IPagination>(this.baseUrl + 'products', {observe: 'response', params})
      .pipe(
        map(response => {
          return response.body;
        })
      )
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
