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

  userLogin: User;

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

  logIn( userLogin:User){
  
    

    this.userService.login(userLogin).subscribe( r => {
      this.alerts.loading();
      if( r != undefined && r != null) {
        this.jwtService.guardarJwt(r.headers.get('Authorization').split(' ')[1].trim())
        this.router.navigate(['/mylist'])
        this.alerts.logged();
      }else{
        this.alerts.loginIncorrecto();
      }
    },
    error => {
      if(error.status == 403){
        this.alerts.loginIncorrecto();
      }else{
        this.alerts.errorInesperado();
      }
    }
    )
  }

  register(){
    let user: User;
    user = this.registerForm.value;

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
