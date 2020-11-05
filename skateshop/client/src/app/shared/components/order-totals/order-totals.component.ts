import { BasketCartService } from './../../../basket/basket-cart.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IBasketTotals } from '../../models/basket';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.scss']
})
export class OrderTotalsComponent implements OnInit {
  cartTotals$: Observable<IBasketTotals>;

  constructor(private basketService: BasketCartService) { }

  ngOnInit(): void {
    this.cartTotals$ = this.basketService.cartTotal$;
  }



}
