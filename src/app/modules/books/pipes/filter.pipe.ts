import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../models/book.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: Book[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();

    return items.filter( it => {
      return (it.title.toLowerCase().includes(searchText));
      // tentative rapide de recherche en incluant le synopsis
      // return (it.title.toLowerCase().includes(searchText) || 
      //   (it.synopsis[0] ? it.synopsis[0] : '').toLowerCase().includes(searchText) || 
      //   (it.synopsis[1] ? it.synopsis[1] : '').toLowerCase().includes(searchText) || 
      //   (it.synopsis[2] ? it.synopsis[2] : '').toLowerCase().includes(searchText));
    });
   }

}
