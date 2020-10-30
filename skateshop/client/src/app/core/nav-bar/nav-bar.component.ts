import { Observable } from 'rxjs';
import { BasketCartService } from './../../basket/basket-cart.service';
import { Component, OnInit } from '@angular/core';
import { IBasket } from 'src/app/shared/models/basket';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  basket$: Observable<IBasket>;

  constructor(private basketService: BasketCartService) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

}
