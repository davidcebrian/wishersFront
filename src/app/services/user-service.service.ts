import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Customer, User } from '../interfaces/interfaces';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

//Servicio usado para controlar el usuario y el customer
export class UserServiceService {

  private endPoint = '/user';
  private customerEndPoint = '/customer'
  //Guardamos el estado del usuario en un observable como boolean
  public loginStatusSubject = new Subject<boolean>();
  public loginStatus$ = this.loginStatusSubject.asObservable();

  customers: Customer[];

  //Event emiiter con output para enviar los cambios del customer
  @Output()
  cambiosEnCustomers = new EventEmitter<Customer[]>();  

  constructor( private http: HttpClient ) { }

  //trae todos los customers de la app
  getAllCustomer(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customerEndPoint).pipe(
      tap( r => {
        this.customers = r;
        this.emitirCambiosEnCustomers()
      })
    );
  }
  //Emite los cambios mediante el event emmiter
  emitirCambiosEnCustomers() {
    this.cambiosEnCustomers.emit(this.customers);
  }

    //get de 1 customer
  getCustomer(username: string): Observable<Customer> {
    return this.http.get<Customer>(this.customerEndPoint + '/' + username);
  }

//Comprueba el valor del jwt guardado
  compruebaJwt(): boolean {
    if(localStorage.getItem("jwt") != null ||localStorage.getItem("jwt") != undefined) return true;
    else return false;
  }

  //logea y guarda el estado logeado en el observab le
  login(user: User) {
    this.loginStatusSubject.next(true);
    return this.http.post(this.endPoint + '/login',user, { observe: 'response' })
  }

  ///Deslogea y guarda el estado nologeado en el observable
  logout(){
    localStorage.clear();
    this.loginStatusSubject.next(false);
  }

  //peticion de registro
  register(user: User) {
    return this.http.post(this.endPoint + '/sign-up', user);
  }


}
