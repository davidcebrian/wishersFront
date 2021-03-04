import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Customer, User } from '../interfaces/interfaces';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private endPoint = '/user';
  private customerEndPoint = '/customer'

  customerAutenticado: Customer;

  @Output()
  cambiosEnCustomer = new EventEmitter<Customer>();  

  constructor( private http: HttpClient ) { }

  getCustomerAutenticado(): Observable<Customer> {
    return this.http.get<Customer>(this.customerEndPoint + '/' + localStorage.getItem('username')).pipe(
      tap(customerAutenticado => {
        if ((this.customerAutenticado == null && customerAutenticado != null) ||
        (this.customerAutenticado != null && customerAutenticado == null) ||
        (this.customerAutenticado != null && customerAutenticado != null && this.customerAutenticado.username != customerAutenticado.username)) {
        this.customerAutenticado = customerAutenticado;
        this.emitirCambiosEnCustomer();
      }
      })
    )
  }

  emitirCambiosEnCustomer() {
    this.cambiosEnCustomer.emit(this.customerAutenticado);
  }

  getCustomer(username: string): Observable<Customer> {
    return this.http.get<Customer>(this.customerEndPoint + '/' + username);
  }

  compruebaJwt(): boolean {
    if(localStorage.getItem("jwt") != null) return true;
    else return false;
  }

  login(user: User) {
    return this.http.post(this.endPoint + '/login',user, { observe: 'response' })
  }

  logout(){
    this.customerAutenticado = null;
    localStorage.clear();
    this.emitirCambiosEnCustomer()
  }

  register(user: User) {
    return this.http.post(this.endPoint + '/sign-up', user);
  }


}
