import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import { Book } from '../../../models/book.model';
import { fadeAnimation } from 'src/app/shared/animations/fadeIntRoute';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
  animations: [fadeAnimation]
})
export class BookDetailComponent implements OnInit, OnDestroy {

  public isbn: string;
  public book: Book;
  private sub: Subscription;
  
  constructor(
    private route: ActivatedRoute,
    public booksService: BooksService
  ) {}

  ngOnInit() {    
    this.isbn = this.route.snapshot.params['isbn'];
    console.log('isbn : ', this.isbn);

    // Souscription à l'observable eventStream$ (liste des livres) pour pouvoir récupérer un livre
    // dans le cas où on arrive directement sur la page détail
    this.sub = this.booksService.eventStream$.subscribe((books: Book[]) => {
      this.book = books.find(book => book.isbn == this.isbn);
    })
  }

  ngOnDestroy() {
    if (!this.sub.closed) {
      this.sub.unsubscribe();
    }
  }

}
