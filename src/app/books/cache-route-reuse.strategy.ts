import { RouteReuseStrategy } from '@angular/router/';
import { ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';


export class CacheRouteReuseStrategy implements RouteReuseStrategy {
  
  storedRouteHandles = new Map<string, DetachedRouteHandle>();
  allowRetriveCache = {
    'books': true
  };

  shouldReuseRoute(before: ActivatedRouteSnapshot, curr:  ActivatedRouteSnapshot): boolean {
    console.log(this.getPath(before));
    console.log(this.getPath(curr));
    if (this.getPath(before) === 'books/:isbn' && this.getPath(curr) === 'books') {    
      this.allowRetriveCache['books'] = true;
    } else {
      this.allowRetriveCache['books'] = false;
    }
    return before.routeConfig === curr.routeConfig;
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return this.storedRouteHandles.get(this.getPath(route)) as DetachedRouteHandle;
  }
  
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const path = this.getPath(route);
    if (this.allowRetriveCache[path]) {
      return this.storedRouteHandles.has(this.getPath(route));
    }
    
    return false;
  }
  
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    const path = this.getPath(route);
    if (this.allowRetriveCache.hasOwnProperty(path)) {
      return true;
    }
    return false;
  }
  
  store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {
    this.storedRouteHandles.set(this.getPath(route), detachedTree);
  }
  
  private getPath(route: ActivatedRouteSnapshot): string {
    if (route.routeConfig !== null && route.routeConfig.path !== null) {
      return route.routeConfig.path;
    }
    return '';
  }
}