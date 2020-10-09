import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ProductInfoComponent } from './product-info/product-info.component';

const routes: Routes = [
  {path: '', component: ShopComponent},
  {path: ':id', component: ProductInfoComponent, data: {breadcrumb: {alias: 'productInfo'}}},
];

// forChild: routes are only available in shop module, not in app module

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
