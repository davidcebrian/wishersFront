import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    searchForm = new FormGroup({
      username: new FormControl('',[]),
      })
      
  constructor() { }

  ngOnInit(): void {
  }

}
