import { BasketCartService } from './basket-cart.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IBasket } from '../shared/models/basket';

@Component({
  selector: 'app-basket-cart',
  templateUrl: './basket-cart.component.html',
  styleUrls: ['./basket-cart.component.scss']
})
export class BasketCartComponent implements OnInit {
  basket$: Observable<IBasket>;

  constructor(private basketService: BasketCartService) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

}
