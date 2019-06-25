import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../../services/books.service';
import { Book } from '../../models/book.model';
import { fadeAnimation } from 'src/app/animations/fadeIntRoute';


@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
  animations: [fadeAnimation]
})
export class BookDetailComponent implements OnInit, OnDestroy {

  public isbn: string;
  public book: Book;
  private sub: any;
  
  constructor(
    private route: ActivatedRoute,
    public booksService: BooksService
  ) {
    console.log('BookDetailComponent - constructor');
  }

  ngOnInit() {    
    console.log('BookDetailComponent - ngOnInit');
    
    this.isbn = this.route.snapshot.params['isbn'];
    console.log('isbn : ', this.isbn);
    this.book = this.booksService.getBookByIsbn(this.isbn);

    // this.sub = this.route.params.subscribe(params => {
    //   console.log('params : ', params);
    //   this.isbn = params['isbn'];
    //   console.log('isbn : ', this.isbn);
    //   this.book = this.booksService.getBookByIsbn(this.isbn);
    // });
    
    // this.route.paramMap.subscribe(params => {
    //   this.isbn = params.get("isbn")
    // });

    // this.route.paramMap.pipe(
    //   switchMap((params) => {
    //     this.isbn = params.get("isbn")
    //   })
    // );

    // this.sub = this.route.params.subscribe(params => {
    //   console.log('Fetching book', params);
    //   console.log('Fetching book', this.route.snapshot.params.isbn);
    //   this.book = this.booksService.getBook(this.route.snapshot.params.isbn);
    // });
  }

  ngOnDestroy() {
    // this.sub.unsubscribe();
  }

}
