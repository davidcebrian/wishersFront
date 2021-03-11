import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/interfaces';
import { AlertsService } from 'src/app/services/alerts.service';
import { JwtauthService } from 'src/app/services/jwtauth.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //Usuario para login / registro
  userLogin: User;

  //Formulario de registro con validadores de requerido y de longitud minima
  registerForm = new FormGroup({
    name: new FormControl('',[Validators.required, Validators.minLength(3)]),
    surname: new FormControl('',[Validators.required, Validators.minLength(3)]),
    edad: new FormControl('',[]),
    username: new FormControl('',[Validators.required, Validators.minLength(3)]),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(3)])
    })

  constructor( private userService: UserServiceService, private jwtService: JwtauthService, private alerts: AlertsService, private router: Router) { }

  ngOnInit(): void {
  }

  //funcion para logearse
  logIn( userLogin:User){
    this.userService.login(userLogin).subscribe( r => {
      //Muestra el spinner de carga al hacer la peticion
      this.alerts.loading();
      if( r != undefined && r != null) {
        //si la respuesta es correcta guardamos el jwt en localstorage
        // y navegamos hacia la lista de sus deseos
        //Y mostramos siempre la informacion de lo ocurrido con alertas
        this.jwtService.guardarJwt(r.headers.get('Authorization').split(' ')[1].trim())
        this.router.navigate(['/mylist'])
        this.alerts.logged();
      }else{
        this.alerts.loginIncorrecto();
      }
    },
    //Si hay algun error mostramos las alertas correspondientes
    error => {
      if(error.status == 403){
        this.alerts.loginIncorrecto();
      }else{
        this.alerts.errorInesperado();
      }
    }
    )
  }

  //Funcion para registrarnos en la aplicacion
  register(){
    let user: User;
    user = this.registerForm.value;
    //Hacemos la peticion del registro y mostramos 
    //la informacion si todo ha salido bien o los errores en caso de que no.
    this.userService.register(user).subscribe(r => {
        if(r != null && r != undefined) {
          this.alerts.registroCorrecto();
        }
      },
      error => {
        if(error.status == 406){
          this.alerts.registroIncorrecto();
        }else{
          this.alerts.errorInesperado()
        }
      }
    )
  }
  

}
