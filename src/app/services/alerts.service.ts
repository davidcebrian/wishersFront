import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor() { }



  loading(){
    Swal.fire({
      title: 'Espere',
      text: 'Iniciando Sesión',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();
  }

  logged(){
    Swal.fire({
      title: 'Log-In completo!',
      text: 'Estás dentro',
      icon: "success"
    })
  }

  added(){
    Swal.fire({
      title: 'Wish Añadido!',
      text: '¡A completarlo!',
      icon: "success"
    })
  }

  completed(){
    Swal.fire({
      title: 'Wish Completado!',
      text: '¡Disfrutalo!',
      icon: "success"
    })
  }

  deleted(){
    Swal.fire({
      title: 'Wish Borrado!',
      text: '¡Adiós a este deseo!',
      icon: "success"
    })
  }

  loginIncorrecto(){
    Swal.fire({
      title: 'ERROR!',
      text: 'Username o password incorrecta, pruebe otra vez!',
      icon: 'error',
      confirmButtonText: 'OK'
    })
  }

  errorInesperado(): any {
    Swal.fire({
      title: 'ERROR!',
      text: 'Ha ocurrido algo inesperado!',
      icon: 'error',
      confirmButtonText: 'OK'
    })
  }

  registroCorrecto() {
    Swal.fire({
      title: 'INFO!',
      text: 'Registro completo.',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'OK',
    })
  }

  registroIncorrecto(): any {
    Swal.fire({
      title: 'ERROR!',
      text: 'Ese username o email ya existe!',
      icon: 'error',
      confirmButtonText: 'OK'
    })
  }
}
