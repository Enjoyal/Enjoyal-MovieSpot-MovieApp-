import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  uname='';
  pswd='';
  imageVideoUrl:any
  backDrop:any


  loginForm=this.fb.group({
    uname:['',[Validators.required,Validators.email]],
    pswd:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]]
  })


  constructor(private ds:DataService,private api:ApiService, private router:Router, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.getBackdrop()
    this.imageVideoUrl='https://image.tmdb.org/t/p/original/'

  // this.getcurrentUser(this.uname);

  }

  //get trending movies data
  getBackdrop(){
    this.api.getBackgroundImage().subscribe(
      (data:any)=>{
        confirm
        console.log(data,'backDropDetails#');
        
        this.backDrop=data.result[0].results[
          Math.floor(Math.random()*data.result[0].results.length)
        ];
        console.log(this.backDrop,'backdrop#');
        
      })
  
   }




login(){
  // alert('Login clicked')
  var uname=this.loginForm.value.uname;  //1000
  var pswd=this.loginForm.value.pswd;  //1000

  if(this.loginForm.valid){
    this.ds.login(uname, pswd)
      .subscribe((result:any)=>{
      localStorage.setItem('fullName', JSON.stringify(result.fullName));
      localStorage.setItem('currentUser', JSON.stringify(result.currentUser));
      localStorage.setItem('token', JSON.stringify(result.token));

      alert(result.message);
      this.router.navigateByUrl('')
    },
    result=>{
      alert(result.error.message);
    }
    )
     
  }
}




}