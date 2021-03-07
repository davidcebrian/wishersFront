import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/interfaces/interfaces';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  customer: Customer;

    searchForm = new FormGroup({
      username: new FormControl('',[]),
      })
      
  constructor( private userService: UserServiceService, private router: Router) { }

  ngOnInit(): void {}

  compruebaJWT(): boolean {
    return this.userService.compruebaJwt();
  }  

  desLogear(){
    this.customer = null;
    this.userService.logout();
    localStorage.clear();
    this.router.navigate(['']);
  }

}
