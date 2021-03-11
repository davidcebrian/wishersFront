import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Customer, User, Wish } from '../interfaces/interfaces';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

//Servicios de los deseos
export class WishService {

  private customerEndPoint = '/customer'

  wishes: Wish[];

  @Output()
  cambiosEnWishes = new EventEmitter<Wish[]>();

  constructor( private http: HttpClient) { }

  //emite los cambios en los deseos
  emitirCambiosWishes(): void {
    this.cambiosEnWishes.emit(this.wishes);
  }

  //Trae todos los deseos de un usuario y emitelso
  getWishes(username: string): Observable<Wish[]> {
    return this.http.get<Wish[]>(this.customerEndPoint + '/' + username + '/wish').pipe(
      tap(r => {
        this.wishes = r;
        this.emitirCambiosWishes();
      })
    )
  }
  //Trae los datos e los deseos de un usario pero no los emite
  getWishesFromCustomer(username: string){
    return this.http.get<Wish[]>(this.customerEndPoint + '/' + username + '/wish');
  } 
  //Añade un deseo
  addWish(username: string, wish: Wish): any {
    return this.http.post(this.customerEndPoint + '/' + username + '/wish', wish);
  }
  //Añade un deseo a un customer 
  addWishToCustomer(username: string, wish: Wish): any {
    return this.http.post(this.customerEndPoint + '/' + username + '/wish/customer', wish);
  }

  //Completa un deseo
  completeWish(username: string, wish: Wish): any {
    return this.http.put(this.customerEndPoint + '/' + username + '/wish', wish);
  }
  //Borra un deseo
  deleteWish(username: string, wish: Wish): any {
    return this.http.request('delete',this.customerEndPoint + '/' + username + '/wish',{body: wish});
  }



}
