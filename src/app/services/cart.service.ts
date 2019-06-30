import { Injectable } from '@angular/core';
import { Cart } from 'src/app/models/cart.model';
import { Book } from 'src/app/models/book.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Offer } from 'src/app/models/offer.model';
import { environment } from 'src/environments/environment';
const API_URL = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cart: Cart = {
    items: [],
    totalPrice: 0
  };
  public offers: Offer[] = [];
  public bestOffer: Offer;
  public bestPrice: number = 0;
  private state = new BehaviorSubject([]);
  public eventStream$ = this.state.asObservable();

  constructor(
    private http: HttpClient
  ) {}

  updateOffersList(newOffer: any): void {
    this.state.next(newOffer);
  }

  /** GET commercial offers from the server */
  getCommercialOffers(books: Book[]): Observable<any> { 
    // let url = encodeURI(API_URL + '/c8fabf68-8374-48fe-a7ea-a00ccd07afff,a460afed-e5e7-4e39-a39d-c885c05db861/commercialOffers');
    let url = API_URL + '/';
    books.forEach((book, index) => {
      url += book.isbn;
      if (index !== books.length - 1) {
        url += ',';
      }
    });
    url += '/commercialOffers';
    console.log('URL : ', url);

    return this.http.get<any>(url)
      .pipe(
        tap((offers: any) => {
          this.updateOffersList(offers.offers);
          // on calcule la meilleure offre
          this.bestOffer = this.computeBestOffer(offers.offers);
        }),
        catchError(this.handleError<Offer[]>('getCommercialOffers', []))
      );
  }
  
  getAllCartItems(): Book[] {
    return this.cart.items;
  }
  
  addItemToCart(book: Book): void {
    this.cart.items.push(book);
    this.computeTotalPrice();
  }

  removeItemFromCart(book: Book): void {
    const index: number = this.cart.items.indexOf(book);
    if (index !== -1) {
      this.cart.items.splice(index, 1);
    }
  }

  computeTotalPrice() {
    this.cart.totalPrice = 0;
    this.cart.items.forEach(item => {
      this.cart.totalPrice += item.price;
    });
  }

  computeBestOffer(offers: Offer[]): Offer {
    let computedPrices: number[] = [];
    let computedPrice;
    offers.forEach(offer => {
      switch (offer.type) {
        case 'percentage':
          let computedPricePercentage = this.cart.totalPrice * (1 - offer.value/100);
          computedPrices.push(computedPricePercentage);
          offer.humanType = offer.value.toString() + '%';
          offer.offerAmount = this.cart.totalPrice - computedPricePercentage;
          offer.newCartPrice = computedPricePercentage;
          // console.log('Nouveau prix (pourcentage de ' + offer.value + '%) : ');
          // console.log(computedPricePercentage);
          break;

        case 'minus':
          let computedPriceMinus = this.cart.totalPrice - offer.value;
          computedPrices.push(computedPriceMinus);
          offer.humanType = 'réduction';
          offer.offerAmount = this.cart.totalPrice - computedPriceMinus;
          offer.newCartPrice = computedPriceMinus;
          // console.log('Nouveau prix (réduction de ' + offer.value + '€) : ');
          // console.log(computedPriceMinus);
          break;

        case 'slice':
          // let sliceValue = offer.sliceValue;
          let sliceValue = 60;
          let quotient = Math.floor(this.cart.totalPrice / sliceValue);
          let computedPriceSlice = this.cart.totalPrice - quotient * offer.value;
          computedPrices.push(computedPriceSlice);
          offer.humanType = quotient.toString() + ' tranche(s) de ' + sliceValue.toString() + '€';
          offer.offerAmount = this.cart.totalPrice - computedPriceSlice;
          offer.newCartPrice = computedPriceSlice;
          // console.log('Nouveau prix (réduction de ' + quotient * offer.value + '€) : ');
          // console.log(computedPriceSlice);
          break;
      
        default:
          break;
      }
    });

    let bestPrice: number = Math.min(...computedPrices);
    let bestOffer = offers.find(offer => offer.newCartPrice === bestPrice);
    // console.log('Meilleure offre = ', bestOffer);

    return bestOffer;
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
