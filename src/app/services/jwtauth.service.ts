import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtauthService {

  constructor() { }

  /**Comprueba JWT y recoge cambios de usuario. */
  /**Guarda el token en el localStorage */
  guardarJwt(token: string){
    const response: any = jwt_decode(token)
    console.log(response);
    localStorage.setItem("jwt", token);
    localStorage.setItem("username", response.sub);
  }
  /**Recupera el token del localStorage */
  recuperarJwt() {
    return localStorage.getItem("jwt");
  }
  /**Borra el token del localStorage */
  borrarJwt() {
    localStorage.clear();
  }
}
