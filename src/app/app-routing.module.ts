import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutesComponent } from './components/routes/routes.component';


const routes: Routes = [ 
  {path: '', component: RoutesComponent, 
  loadChildren: () => import("./components/routes/routes.module").then( m => m.RoutesModule )},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
