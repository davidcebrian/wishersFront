import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { UserServiceService } from '../services/user-service.service';

@Injectable({
    providedIn: 'root',
})
export class LogGuard implements CanActivate {
    // constructor con las inyecciones
    constructor(private userService:UserServiceService, private router: Router) {}

    canActivate () {
      // verifica si está logeado preguntando al servicio
        if (this.userService.compruebaJwt()) {
            return true;
        }else{
            Swal.fire({
                title: 'Usted no está logeado',
                text: 'Logueese para utilizar la aplicación.',
                icon: 'error',
            });
            
            // redireciono a home
            this.router.navigate(['home']);
            
            return false;
        }
    }
}