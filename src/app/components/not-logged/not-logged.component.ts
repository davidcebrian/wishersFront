import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-logged',
  templateUrl: './not-logged.component.html',
  styleUrls: ['./not-logged.component.scss']
})

//SE UTILIZABA PARA MOSTRAR UNA PAGINA DE NO LOGEADO EN CASO DE
//INTENTAR ENTRAR EN ALGUNA FUNCIONALIDAD QUE NO FUESE EL LOG IN 
//AL AÑADIR EL CAN ACTIVATE YA NO ES NECESARIO Y NO SE UTILIZA.

export class NotLoggedComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
