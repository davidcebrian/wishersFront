import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer, Wish } from 'src/app/interfaces/interfaces';
import { AlertsService } from 'src/app/services/alerts.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { WishService } from 'src/app/services/wish.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  customers: Customer[];
  wishes: Wish[];
  public pages: number;
  constructor( private userService: UserServiceService, private router: Router, private alerts: AlertsService, private wishService: WishService) { }

  ngOnInit(): void {
    if(!this.userService.compruebaJwt()){
      this.router.navigate(['/notLogged'])
    }
    this.userService.cambiosEnCustomers.subscribe(customers => {
      this.customers = customers;
    })
    this.userService.getAllCustomer().subscribe();
  }

  wishesFromCustomer(username: string) {
    this.wishService.getWishesFromCustomer(username).subscribe( wishes => {
      this.wishes = wishes;
    })
  }

  addWish(wish: Wish){ 
    wish.completed = false;
    this.wishService.addWishToCustomer(localStorage.getItem("username"),wish).subscribe( r => {
      this.alerts.added();
    }, error => {
      if(error.status == 400){
        this.alerts.tienesWish();
      }else{
        this.alerts.errorInesperado();
      }
    });
    
  }

}
