import { Basket, IBasketItem, IBasketTotals } from './../shared/models/basket';
import { IProduct } from './../shared/models/product';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBasket } from '../shared/models/basket';

@Injectable({
  providedIn: 'root'
})
export class BasketCartService {
  baseUrl = environment.apiUrl;
  private cartSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.cartSource.asObservable();
  private cartTotalSource = new BehaviorSubject<IBasketTotals>(null);
  cartTotal$ = this.cartTotalSource.asObservable();

  constructor(private http: HttpClient) { }

  getBasket(id: string) {
    return this.http.get(this.baseUrl + 'basket?id=' + id)
      .pipe(
        map((basket: IBasket) => {
          this.cartSource.next(basket);
          this.calculateCartTotals();
        })
      )
  }

  setBasket(basket: IBasket) {
    return this.http.post(this.baseUrl + 'basket', basket).subscribe((res: IBasket) => {
      this.cartSource.next(res);
      this.calculateCartTotals();
    }, error => {
      console.log(error);
    })
  }

  getCurrentBasketValue() {
    return this.cartSource.value;
  }

  addItemToBasket(item: IProduct, quantity = 1) {
    const itemToAdd: IBasketItem = this.mapProductItemToBasketItem(item, quantity);
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
  }

  incrementItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex(x => x.id === item.id);
    basket.items[foundItemIndex].quantity++;
    this.setBasket(basket);
  }

  decrementItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex(x => x.id === item.id);
    if (basket.items[foundItemIndex].quantity > 1) {
      basket.items[foundItemIndex].quantity--;
      this.setBasket(basket);
    } else {
      this.removeItemFromCart(item);
    }

  }
  removeItemFromCart(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    if (basket.items.some(x => x.id === item.id)) {
      basket.items = basket.items.filter(i => i.id !== item.id);
      if (basket.items.length > 0) {
        this.setBasket(basket);
      } else {
        this.deleteCart(basket);
      }
    }
  }
  deleteCart(basket: IBasket) {
    return this.http.delete(this.baseUrl + 'basket?id=' + basket.id).subscribe(() => {
      this.cartSource.next(null);
      this.cartTotalSource.next(null);
      localStorage.removeItem('basket_id');
    }, error => {
      console.log(error);
    })
  }

  private calculateCartTotals () {
    const basket = this.getCurrentBasketValue();
    const shipping = 0;
    // Using 'reduce' array method to add up all the subtotals of each product in shopping cart
    const subtotal = basket.items.reduce((result, item) => (item.price * item.quantity) + result, 0);
    const total = subtotal + shipping;

    this.cartTotalSource.next({shipping, total, subtotal});

  }

  // Helper private function to Add or Update current items in Shopping Cart
  // Will check to see if the same item exists in the cart, if true, it will increase the quantity
  // If false (meaning a new item is being added), it will simply add the new item to Shopping Cart
  private addOrUpdateItem(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
    const index = items.findIndex(i => i.id === itemToAdd.id);
    if (index === -1) {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    } else {
      items[index].quantity += quantity;
    }
    return items;
  }

  // Helper private function to create a new Basket Item
  private createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  // Helper private function to map properties from IProduct to IBasketItem
  private mapProductItemToBasketItem(item: IProduct, quantity: number): IBasketItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      pictureUrl: item.pictureUrl,
      quantity,
      brand: item.productBrand,
      type: item.productType
    }
  }
}
