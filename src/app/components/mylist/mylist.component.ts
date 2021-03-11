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

  //Lista de deseos de un customer
  wishes: Wish[];
  //Formulario Reactivo para añadir un deseo
  wishForm = new FormGroup({
    title: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    value: new FormControl('',[]),
    })


  constructor( private userService: UserServiceService, private router: Router, private wishService: WishService,
                private alerts: AlertsService) { }

    //Carga los datos de los deseos de un usuario al iniciar el componente
  ngOnInit(): void {
    this.wishService.cambiosEnWishes.subscribe(wishes => {
      this.wishes = wishes;
    })
    this.wishService.getWishes(localStorage.getItem("username")).subscribe();
  }

  //Funcion para añadir un deseo
  addWish(){ 
    let newWish: Wish = this.wishForm.value;
    newWish.completed = false;
    newWish.customers = [localStorage.getItem("username")]
    //Realiza la peticion para añadir el deseo al usuario logeado
    this.wishService.addWish(localStorage.getItem("username"),newWish).subscribe( r => {
      this.alerts.added();
      this.wishService.getWishes(localStorage.getItem("username")).subscribe();
    }, error => {
      if(error.status == 302){
        this.alerts.existeWish();
      }else{
        this.alerts.errorInesperado();
      }
    });
    
  }
 //Funcion para descompletar un deseo.
  complete(title:string){
      let newWish: Wish = {title: title};
      //hacemos la petición para cambiar el estado del deseo y mostramos la información con una alerta.
      //Si hay errores mostramos la alerta de error
      this.wishService.completeWish(localStorage.getItem("username"),newWish).subscribe( r => {
        this.alerts.completed();
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
