import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutesComponent } from './components/routes/routes.component';

//contiene la ruta principal de RoutesComponent y tiene cargado mediante lazy loading el modulo de las rutas
const routes: Routes = [ 
  {path: '', component: RoutesComponent, 
  loadChildren: () => import("./components/routes/routes.module").then( m => m.RoutesModule )},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
