import { Component } from '@angular/core';
import { fadeAnimation } from './shared/animations/fadeIntRoute';
import { BooksService } from './services/books.service';
import { CartService } from './services/cart.service';
import { MatSnackBar, MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation]
})
export class AppComponent {
  title: string = 'Bienvenue dans la bibliothèque de H.P.';

  constructor(
    public booksService: BooksService,
    public cartService: CartService,
    private _snackBar: MatSnackBar,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/github-circle-white-transparent.svg'));
  }

  ngOnInit() {
    this.getAllBooks();

    // TESTS
    let price = 99;
    let sliceValue = 100;
    let quotient = Math.floor(price / sliceValue);
    console.log('nb : ', quotient);
  }

  getAllBooks() {
    // console.log('BooksListComponent - getAllBooks');
    // console.log('books : ', this.books.length);
    this.booksService.getAllBooks().subscribe((books) => {
      this.booksService.books = books;
      console.log('books : ', this.booksService.books);
    }, err => {
      console.log(err);
      this.showError('Une erreur est survenue lors de la récupération des livres...')
    });
  }

  showError(errorMessage) {
    this._snackBar.open(errorMessage, 'action');
  }
  
}
