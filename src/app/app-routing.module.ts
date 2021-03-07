import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../app/components/static/home/home.component';
import { CompletedComponent } from './components/completed/completed.component';
import { ExploreComponent } from './components/explore/explore.component';
import { LoginComponent } from './components/login/login.component';
import { MylistComponent } from './components/mylist/mylist.component';
import { NotLoggedComponent } from './components/not-logged/not-logged.component';
import { LogGuard } from './guards/logGuard';

const routes: Routes = [
  {path: 'home', redirectTo: '', pathMatch: 'full'},
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'mylist', component: MylistComponent, canActivate: [LogGuard]},
  {path: 'explore', component: ExploreComponent, canActivate: [LogGuard]},
  {path: 'completed', component: CompletedComponent, canActivate: [LogGuard]},
  {path: 'notLogged', component: NotLoggedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
