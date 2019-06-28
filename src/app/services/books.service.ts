import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Book } from 'src/app/models/book.model';
const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  public books: Book[] = [];
  private state = new BehaviorSubject([]);
  public eventStream$ = this.state.asObservable();

  constructor(
    private http: HttpClient
  ) {
    // console.log('BooksService - constructor');
    // console.log('books : ', this.books.length);
    // this.getAllBooks().subscribe((books) => this.books = books);
  }

  updateBooksList(newBookList: Book[]): void {
    this.state.next(newBookList);
  }

  /** GET books from the server */
  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(API_URL)
    .pipe(
      tap((books: Book[]) => {
        console.log('tap');
        console.log(books);
        this.updateBooksList(books);
      }),
      catchError(this.handleError<Book[]>('getAllBooks', []))
    );
  }

  // /** GET book by id. Will 404 if id not found */
  // getBookByIsbn(isbn: string):Book {
  //   // console.log('books (BooksService) : ', this.books);
  //   // console.log('isbn (BooksService) : ', isbn);
  //   // if already fetch
  //   // if (this.books.length != 0) {
  //     // console.log("already fetch !");
  //     return this.books.find(book => book.isbn == isbn);
  //   // } else {
  //     // console.log("NOT already fetch !");
  //     // return this.getBook(isbn);
  //   // }
  // }

  /** GET book by id. Will 404 if id not found */
  // getBook(isbn: string):Observable<Book> {
  //   // const url = `${API_URL}/${isbn}`;
  //   // return this.http.get<Book>(url).pipe(
  //   //   catchError(this.handleError<Book>(`getBook isbn=${isbn}`))
  //   // );
  //   // return this.http.get<Book>(`${API_URL}/${isbn}`).pipe(
  //   //   catchError(this.handleError<Book>(`getBook isbn=${isbn}`))
  //   // );

  //   return this.http.get<Book>(`${API_URL}/${isbn}`).pipe(
  //     catchError(this.handleError<Book>(`getBook isbn=${isbn}`))
  //   );
  // }
  
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
