import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Customer, User } from '../interfaces/interfaces';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private endPoint = '/user';
  private customerEndPoint = '/customer'
  public loginStatusSubject = new Subject<boolean>();
  public loginStatus$ = this.loginStatusSubject.asObservable();

  customers: Customer[];

  @Output()
  cambiosEnCustomers = new EventEmitter<Customer[]>();  

  constructor( private http: HttpClient ) { }


  getAllCustomer(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customerEndPoint).pipe(
      tap( r => {
        this.customers = r;
        this.emitirCambiosEnCustomers()
      })
    );
  }

  emitirCambiosEnCustomers() {
    this.cambiosEnCustomers.emit(this.customers);
  }

  getCustomer(username: string): Observable<Customer> {
    return this.http.get<Customer>(this.customerEndPoint + '/' + username);
  }


  compruebaJwt(): boolean {
    if(localStorage.getItem("jwt") != null ||localStorage.getItem("jwt") != undefined) return true;
    else return false;
  }

  login(user: User) {
    this.loginStatusSubject.next(true);
    return this.http.post(this.endPoint + '/login',user, { observe: 'response' })
  }

  logout(){
    localStorage.clear();
    this.loginStatusSubject.next(false);
  }

  register(user: User) {
    return this.http.post(this.endPoint + '/sign-up', user);
  }


}
