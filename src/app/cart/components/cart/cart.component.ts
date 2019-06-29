import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Offer } from 'src/app/models/offer.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  offers: Offer[];
  private sub: Subscription;

  constructor(
    public cartService: CartService
  ) { 
    // Pour les tests en localhost :
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

  ngOnInit() {
    let itemsInCart = this.cartService.getAllCartItems();

    // On ne récupère les offres que si le panier contient au moins 1 item
    if (itemsInCart.length > 0) {
      // calcul et affichage du prix total non remisé
      this.cartService.computeTotalPrice();

      this.cartService.getCommercialOffers(itemsInCart).subscribe((offers) => {
        console.log(offers.offers);
        this.offers = offers.offers;
      }, (err) => {
        console.log(err);
      });
    }

    this.sub = this.cartService.eventStream$.subscribe((offers: any) => {
      console.log('Offers : ' , offers.offers);
      this.offers = offers;
    });
    
  }

  ngOnDestroy() {
    if (!this.sub.closed) {
      this.sub.unsubscribe();
    }
  }

}
