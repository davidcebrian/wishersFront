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

  //lista de todos los customer que hay en la aplicación
  customers: Customer[];
  //lista de deseos de un customer
  wishes: Wish[];
  //numero controlador de la paginacion
  public pages: number;

  constructor( private userService: UserServiceService,
              private router: Router,
              private alerts: AlertsService, 
              private wishService: WishService) { }

  //Al iniciar el componente, y al haber algun cambio en los customers
  // guardo todos sus datos al subscribirme al eventemmiter
  ngOnInit(): void {
    this.userService.cambiosEnCustomers.subscribe(customers => {
      this.customers = customers;
    })
    this.userService.getAllCustomer().subscribe();
  }

  //Función para recoger todos los deseos de un customer
  wishesFromCustomer(username: string) {
    this.wishService.getWishesFromCustomer(username).subscribe( wishes => {
      this.wishes = wishes;
    })
  }

  //funcion para añadir un deseo a la lista de deseos del usuario logeado
  //Si hay algun error mostramos sus alertas, si no mostramos la informacion de que 
  //salio bien
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
