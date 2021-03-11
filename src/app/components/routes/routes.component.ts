import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
})

//Componente de un modulo que se cargara con lazy loading
export class RoutesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
