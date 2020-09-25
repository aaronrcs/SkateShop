import { IType } from './../shared/models/productType';
import { IBrand } from './../shared/models/brand';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPagination } from '../shared/models/pagination';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/'

  constructor(private http: HttpClient) { }

  // getProducts: retrieves a list of available products
  getProducts() {
    return this.http.get<IPagination>(this.baseUrl + 'products?pageSize=50');
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
