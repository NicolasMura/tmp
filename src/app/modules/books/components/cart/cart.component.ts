import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(
    public cartService: CartService
  ) { }

  ngOnInit() {
    // this.cartService.getCommercialOffers().subscribe((offers) => console.log(offers));
    // this.cartService.getCommercialOffers().then((offers) => console.log(offers));
  }

}
