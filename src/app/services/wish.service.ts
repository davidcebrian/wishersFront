import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Customer, User, Wish } from '../interfaces/interfaces';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WishService {

  private customerEndPoint = '/customer'

  wishes: Wish[];

  @Output()
  cambiosEnWishes = new EventEmitter<Wish[]>();

  constructor( private http: HttpClient) { }

  emitirCambiosWishes(): void {
    this.cambiosEnWishes.emit(this.wishes);
  }


  getWishes(username: string): Observable<Wish[]> {
    return this.http.get<Wish[]>(this.customerEndPoint + '/' + username + '/wish').pipe(
      tap(r => {
        this.wishes = r;
        this.emitirCambiosWishes();
      })
    )
  }

  getWishesFromCustomer(username: string){
    return this.http.get<Wish[]>(this.customerEndPoint + '/' + username + '/wish');
  }

  addWish(username: string, wish: Wish): any {
    return this.http.post(this.customerEndPoint + '/' + username + '/wish', wish);
  }

  addWishToCustomer(username: string, wish: Wish): any {
    return this.http.post(this.customerEndPoint + '/' + username + '/wish/customer', wish);
  }


  completeWish(username: string, wish: Wish): any {
    return this.http.put(this.customerEndPoint + '/' + username + '/wish', wish);
  }

  deleteWish(username: string, wish: Wish): any {
    return this.http.request('delete',this.customerEndPoint + '/' + username + '/wish',{body: wish});
  }



}
