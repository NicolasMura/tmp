import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Book } from 'src/app/models/book.model';
import { environment } from 'src/environments/environment';
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
  ) {}

  updateBooksList(newBookList: Book[]): void {
    this.state.next(newBookList);
  }

  /** GET books from the server */
  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(API_URL)
    .pipe(
      tap((books: Book[]) => {
        this.updateBooksList(books);
      }),
      catchError(this.handleError<Book[]>('getAllBooks', []))
    );
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
