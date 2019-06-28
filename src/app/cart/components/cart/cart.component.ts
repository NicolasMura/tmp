import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Offer } from 'src/app/models/offer.model';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  offers: Offer[];

  constructor(
    public cartService: CartService
  ) { }

  ngOnInit() {
    // this.cartService.getCommercialOffers().subscribe((offers) => {
    //   console.log(offers);
    // });
    // Pour tests :
    this.offers = [
      {
        "type": "percentage",
        "value": 4
      },
      {
        "type": "minus",
        "value": 15
      },
      {
        "type": "slice",
        "sliceValue": 100,
        "value": 12
      }
    ];
  }

}
