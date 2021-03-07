import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer, Wish } from 'src/app/interfaces/interfaces';
import { AlertsService } from 'src/app/services/alerts.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { WishService } from 'src/app/services/wish.service';

@Component({
  selector: 'app-bests',
  templateUrl: './bests.component.html',
  styleUrls: ['./bests.component.scss']
})
export class BestsComponent implements OnInit {

  customers: Customer[];

  constructor( private userService: UserServiceService, private router: Router, private alerts: AlertsService, ) { }

  ngOnInit(): void {
    if(!this.userService.compruebaJwt()){
      this.router.navigate(['/notLogged'])
    }
    this.userService.cambiosEnCustomers.subscribe(customers => {
      this.customers = customers;
      this.customers.sort((a , b) => {
        return b.points - a.points;
      });
    })
    this.userService.getAllCustomer().subscribe();
    
  }

}
