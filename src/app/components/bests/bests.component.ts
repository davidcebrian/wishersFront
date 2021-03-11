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

  //Lista de customers(usuarios de la aplicación)
  customers: Customer[];

  //Number para el control de la paginación
  public pa: number;

  constructor( private userService: UserServiceService, private router: Router, private alerts: AlertsService, ) { }

  //Nos subscribimos al eventemmiter y al recoger datos de customers 
  //los guardamos y los ordenamos segun los puntos que tengan.
  ngOnInit(): void {
    this.userService.cambiosEnCustomers.subscribe(customers => {
      this.customers = customers;
      this.customers.sort((a , b) => {
        return b.points - a.points;
      });
    })
    this.userService.getAllCustomer().subscribe();
    
  }

}
