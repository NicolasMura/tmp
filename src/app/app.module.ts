import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { BooksModule } from './books/books.module';
import { MatIconModule, MatButtonModule, MatBadgeModule, MatSnackBarModule } from '@angular/material';
import { CartModule } from './cart/cart.module';
// import { RouteReuseStrategy } from '@angular/router';
// import { CacheRouteReuseStrategy } from './modules/books/cache-route-reuse.strategy';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    BooksModule,
    CartModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatSnackBarModule
  ],
  providers: [
    HttpClient,
    // Si besoin de gérer une stratégie de mise en cache
    // {
    //   provide: RouteReuseStrategy,
    //   useClass: CacheRouteReuseStrategy
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
