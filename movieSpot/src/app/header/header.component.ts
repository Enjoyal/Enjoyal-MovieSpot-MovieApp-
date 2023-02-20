import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../movies/api.service';
import { DataService } from '../movies/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private api:ApiService, private ds:DataService, private router:Router ) {
   }

  ngOnInit(): void {

  }






  


}
