import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Wish } from 'src/app/interfaces/interfaces';
import { UserServiceService } from 'src/app/services/user-service.service';
import { WishService } from 'src/app/services/wish.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.scss']
})
export class MylistComponent implements OnInit {

  wishes: Wish[];
  wishForm = new FormGroup({
    title: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    value: new FormControl('',[]),
    })


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

  addWish(){ 
    let newWish: Wish = this.wishForm.value;
    newWish.completed = false;
    newWish.customers = [localStorage.getItem("username")]
    this.wishService.addWish(localStorage.getItem("username"),newWish).subscribe( r => {
      this.alerts.added();
      this.wishService.getWishes(localStorage.getItem("username")).subscribe();
    }, error => {
      this.alerts.errorInesperado();
    });
    
  }

  complete(title:string){
      let newWish: Wish = {title: title};
      this.wishService.completeWish(localStorage.getItem("username"),newWish).subscribe( r => {
        this.alerts.completed();
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
