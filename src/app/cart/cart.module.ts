import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './components/cart/cart.component';
import { CartService } from '../services/cart.service';
import { RouterModule } from '@angular/router';
import { MatListModule, MatDividerModule, MatIconModule } from '@angular/material';

@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatDividerModule,
    MatIconModule
  ],
  providers: [
    CartService
  ],
})
export class CartModule { }
