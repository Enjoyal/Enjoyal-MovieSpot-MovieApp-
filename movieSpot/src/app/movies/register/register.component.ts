import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private ds:DataService, private router:Router, private fb:FormBuilder) { }

  ngOnInit(): void {
  }


  uname='';
  pswd='';
  pswd2='';

  //register model
  registerForm=this.fb.group({
    fullname:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]], //array
    uname:['',[Validators.required,Validators.email]], //array
    pswd:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]],
    pswd2:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]]

  })



  register(){
    // alert('Clicked register')
    console.log(this.registerForm); //value:
    
    var uname=this.registerForm.value.uname;
    var fullName=this.registerForm.value.fullname;
    var pswd=this.registerForm.value.pswd;
    var pswd2=this.registerForm.value.pswd2;

  if(this.registerForm.valid && pswd2==pswd){
    // console.log(this.registerForm.get('uname')?.errors);
    // const result= this.ds.register(acno,username,password);
    this.ds.register(uname,fullName,pswd)
    .subscribe((result:any)=>{
      alert('Register successful');
      this.router.navigateByUrl('/login');
    },
    result=>{
      alert(result.error.message)
    })
    // else{
    //   alert('register failed');
    //   this.router.navigateByUrl('')

    // }
  }
  
  else{
    alert('Invalid form');
  }

  }


}
