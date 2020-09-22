import { ShopService } from './shop.service';
import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/models/product';

// tslint:disable-next-line: jsdoc-format
/**Purpose of this Component is to handle Sorting, Pagination, Search functionality*/
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products: IProduct[];

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.shopService.getProducts().subscribe(res => {
      this.products = res.data;
    }, error => {
      console.log(error);
    });
  }

}
