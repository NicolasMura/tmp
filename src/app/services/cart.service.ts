import { Injectable } from '@angular/core';
import { Cart } from 'src/app/models/cart.model';
import { Book } from 'src/app/models/book.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { Offer } from 'src/app/models/offer.model';
const API_URL = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: Cart;
  constructor(
    private http: HttpClient
  ) {}

  /** GET commercial offers from the server */
  // getCommercialOffers(): Observable<any> { 
  // // getCommercialOffers(books: Book[]): Observable<Book[]> { 
  //   let url = encodeURI(API_URL + '/c8fabf68-8374-48fe-a7ea-a00ccd07afff,a460afed-e5e7-4e39-a39d-c885c05db861/commercialOffers');
  //   console.log(url);
  //   return this.http.get<any>(url)
  //   .pipe(
  //     map(res => res.json())
  //   );
  // }
  getCommercialOffers(): Observable<any> {
    let url = encodeURI(API_URL + '/c8fabf68-8374-48fe-a7ea-a00ccd07afff,a460afed-e5e7-4e39-a39d-c885c05db861/commercialOffers');
    return this.http.get<any>(url)
    .pipe(
      catchError(this.handleError<any>('getAllBooks', []))
    );
  }
  // getCommercialOffers() { 
  //   let url = API_URL + '/c8fabf68-8374-48fe-a7ea-a00ccd07afff,a460afed-e5e7-4e39-a39d-c885c05db861/commercialOffers';
  //   return this.http.get(url)
  //     .toPromise()  
  //     // .then(
  //     //   res => { // Success
  //     //     console.log(res.json());
  //     //   }
  //     // )
  //     .then(response => response)
  //     .catch(this.handleError);;
  // }
  
  getCartItems() {
    return this.cart.items;
  }
  
  addToCard(book) {
    this.cart.items.push(book);
  }

  removeFromCard(book) {
    // todo...
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
