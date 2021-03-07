import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Wish } from 'src/app/interfaces/interfaces';
import { UserServiceService } from 'src/app/services/user-service.service';
import { WishService } from 'src/app/services/wish.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss']
})
export class CompletedComponent implements OnInit {

  wishes: Wish[];


  constructor( private userService: UserServiceService, private router: Router, private wishService: WishService,
                private alerts: AlertsService) { }

  ngOnInit(): void {
    if(!this.userService.compruebaJwt()){
      this.router.navigate(['/notLogged'])
    }
    this.wishService.cambiosEnWishes.subscribe(wishes => {
      this.wishes = wishes;
    })
    this.wishService.getWishes(localStorage.getItem("username")).subscribe();
  }

  complete(title:string){
      let newWish: Wish = {title: title};
      this.wishService.completeWish(localStorage.getItem("username"),newWish).subscribe( r => {
        this.alerts.uncompleted();
        this.wishService.getWishes(localStorage.getItem("username")).subscribe();
      }, error => {
        this.alerts.errorInesperado();
      });
      
  }

  delete(title:string){
    let newWish: Wish = {title: title};
    this.wishService.deleteWish(localStorage.getItem("username"),newWish).subscribe( r => {
      this.alerts.deleted();
      this.wishService.getWishes(localStorage.getItem("username")).subscribe();
    }, error => {
      this.alerts.errorInesperado();
    });
}
  

}
