import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.scss']
})
export class MylistComponent implements OnInit {

  constructor( private userService: UserServiceService, private router: Router) { }

  ngOnInit(): void {
    if(!this.userService.compruebaJwt()){
      this.router.navigate(['/notLogged'])
    }
  }

}
