import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './components/cart/cart.component';
import { CartService } from '../services/cart.service';
import { RouterModule } from '@angular/router';
import { MatListModule, MatDividerModule } from '@angular/material';

@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatDividerModule
  ],
  providers: [
    CartService
  ],
})
export class CartModule { }
