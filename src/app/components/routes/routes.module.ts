import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompletedComponent } from '../completed/completed.component';
import { ExploreComponent } from '../explore/explore.component';
import { HomeComponent } from '../static/home/home.component';
import { LoginComponent } from '../login/login.component';
import { MylistComponent } from '../mylist/mylist.component';
import { NotLoggedComponent } from '../not-logged/not-logged.component';
import { LogGuard } from '../../guards/logGuard';
import { BestsComponent } from '../bests/bests.component';

//Modulo con todas las rutas de los componentes que sera cargado mediante lazy loading en el modulo principal APp module
//Tiene los canActivate con el guard que comprueba si estamos logeados o no
const childRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'mylist', component: MylistComponent, canActivate: [LogGuard]},
  {path: 'explore', component: ExploreComponent, canActivate: [LogGuard]},
  {path: 'completed', component: CompletedComponent, canActivate: [LogGuard]},
  {path: 'best', component: BestsComponent, canActivate: [LogGuard]},
  {path: 'notLogged', component: NotLoggedComponent}
]

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class RoutesModule { }
