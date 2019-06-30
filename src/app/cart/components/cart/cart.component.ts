import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Offer } from 'src/app/models/offer.model';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  offers: Offer[];
  private sub: Subscription;

  constructor(
    public cartService: CartService,
    private _snackBar: MatSnackBar
  ) { 
    // Fake data pour les tests :
    // this.cartService.offers = [
    //   {
    //     "type": "percentage",
    //     "value": 4
    //   },
    //   {
    //     "type": "minus",
    //     "value": 15
    //   },
    //   {
    //     "type": "slice",
    //     "sliceValue": 100,
    //     "value": 12
    //   }
    // ];
    // console.log('Offers : ' , this.cartService.offers);
  }

  ngOnInit() {
    let itemsInCart = this.cartService.getAllCartItems();

    // On ne récupère les offres que si le panier contient au moins 1 item
    if (itemsInCart.length > 0) {
      // calcul et affichage du prix total non remisé
      this.cartService.computeTotalPrice();

      this.cartService.getCommercialOffers(itemsInCart).subscribe((offers) => {
        console.log(offers.offers);
        this.cartService.offers = offers.offers;
      }, (err) => {
        console.log(err);
        this.showError('Une erreur est survenue lors de la récupération des offres...');
      });
    }

    // Souscription à l'observable eventStream$ (liste des offres commerciales) pour pouvoir récupérer une offre
    // dans le cas où on arrive directement sur le panier (@TODO : à coupler avec une gestion des données en localstorage)
    this.sub = this.cartService.eventStream$.subscribe((offers: any) => {
      this.cartService.offers = offers;
    });
  }

  showError(errorMessage) {
    this._snackBar.open(errorMessage);
  }

  ngOnDestroy() {
    if (!this.sub.closed) {
      this.sub.unsubscribe();
    }
  }

}
