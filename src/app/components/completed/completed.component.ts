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

  //Lista de deseos de un customer
  wishes: Wish[];


  constructor( private userService: UserServiceService, private router: Router, private wishService: WishService,
                private alerts: AlertsService) { }

  //Al iniciar cargamos los datos de los deseos del customer
  ngOnInit(): void {
    this.wishService.cambiosEnWishes.subscribe(wishes => {
      this.wishes = wishes;
    })
    this.wishService.getWishes(localStorage.getItem("username")).subscribe();
  }

  //Funcion para descompletar un deseo.
  complete(title:string){
      let newWish: Wish = {title: title};
      //hacemos la petición para cambiar el estado del deseo y mostramos la información con una alerta.
      //Si hay errores mostramos la alerta de error
      this.wishService.completeWish(localStorage.getItem("username"),newWish).subscribe( r => {
        this.alerts.uncompleted();
        this.wishService.getWishes(localStorage.getItem("username")).subscribe();
      }, error => {
        this.alerts.errorInesperado();
      });
      
  }

  //Funcion para borrar un deseo
  delete(title:string){
    let newWish: Wish = {title: title};
    //Peticion para borrar el deseo y al hacerlo mostramos la alerta de que esta borrado
    //Si hay algun error se muestra la alerta del mismo
    this.wishService.deleteWish(localStorage.getItem("username"),newWish).subscribe( r => {
      this.alerts.deleted();
      this.wishService.getWishes(localStorage.getItem("username")).subscribe();
    }, error => {
      this.alerts.errorInesperado();
    });
}
  

}
