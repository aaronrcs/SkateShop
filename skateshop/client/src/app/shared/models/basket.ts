import { v4 as uuidv4 } from 'uuid';

export interface IBasket {
  id: string;
  items: IBasketItem[];
}

export interface IBasketItem {
  id: number;
  productName: string;
  price: number;
  quantity: number;
  pictureUrl: string;
  brand: string;
  type: string;
}

// uuid - it will create a unique identifier for each item in the shopping cart
export class Basket implements IBasket {
    id = uuidv4();
    items: IBasketItem[];

}
