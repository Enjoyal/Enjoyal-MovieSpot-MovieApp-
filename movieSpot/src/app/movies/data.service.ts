import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


//global http header object
const options={            // to overload header
  headers:new HttpHeaders(),
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }


currentUser="";

saveDetails(){
  if(this.userDetails){
    localStorage.setItem('DataBase',JSON.stringify(this.userDetails))
  }
  if(this.currentUser){
    localStorage.setItem('currentUser',JSON.stringify(this.currentUser))
    
  }

}


  //database
  userDetails:any={
    'enjoyal':{uname:'enjoyal', pswd:'abcd',pswd2:'abcd', watchlist:[]},
    'basil':{uname:'basil',pswd:'1234',pswd2:'1234',watchlist:[]},
    'joyal':{uname:'joyal',pswd:'ABCD',pswd2:'ABCD', watchlist:[]},
  }


  register(uname:any,fullName:any, pswd:any){

    const data={
      uname,
      fullName,
      pswd,
    }

    return this.http.post('http://localhost:3000/register', data)

  }



login(uname:any, pswd:any){
  // alert('Login clicked')
  const data={
    uname,
    pswd,
  }
  // this.getCurrentUser(uname);    //calling get currentuser to give current uname
  return this.http.post('http://localhost:3000/login', data)

}

getToken(){
  // fetch token from localstorage
  const token =JSON.parse(localStorage.getItem('token') || '')
  //append token inside the header
  let headers = new HttpHeaders()

  if(token){
    options.headers=headers.append('x-access-token',token)
  }
  return options  //to get token
}


//to get current username       
  getCurrentUser(){            
    this.currentUser=JSON.parse(localStorage.getItem('currentUser')|| '');
    return this.currentUser
    // console.log(this.currentUser,'currentUsername#');
  }

  
//to add watchlist to the specified user  
  addtoWatchlist(uname:any,movie:any,mediaType:any){
    const data={
      uname,
      id: movie.id,
      title:movie.title,
      name:movie.name,
      original_title: movie.original_title,
      original_name:movie.original_name,
      overview: movie.overview,
      poster_path: movie.poster_path,
      media_type: mediaType,
      vote_average:movie.vote_average,
      release_date:movie.release_date,
      first_air_date:movie.first_air_date    
    }
    return this.http.post('http://localhost:3000/addtoWatchlist', data, this.getToken())

  }

 //to get watchlist for the specified user
 getWatchlist(uname:any){
  const data={
    uname
  }
  return this.http.post('http://localhost:3000/getWatchlist', data, this.getToken())
  }
 


  deleteFromWatchList(uname:any,id:any){
    // const data={
    //   id,
    //   uname
    // }
    return this.http.delete('http://localhost:3000/deleteWatch/'+uname+'/'+ id)
  }

  emptyWatchlist(uname:any){
    return this.http.delete('http://localhost:3000/emptyWatchlist/'+uname)
  }

// to add review
  addReview(uname:any,author:any,id:any,rating:any,comment:any,reviewTime:any){
    const data={
      uname,
      author,
      id,
      rating,
      comment,
      reviewTime,
    }
    return this.http.post('http://localhost:3000/addReview', data)

  }

  getReviews(id:any){
    
    return this.http.get('http://localhost:3000/getReviews/'+id)
    
  }

  getEditedReview(uname:any,id:any,rating:any,comment:any,reviewTime:any){
    const data={
      uname,
      id,
      rating,
      comment,
      reviewTime
    }

    return this.http.post('http://localhost:3000/getEditedReview',data)

  }

  deleteReview(uname:any,id:any){
   
    return this.http.delete('http://localhost:3000/deleteReview/'+uname+'/'+ id)
  }



  deleteAcc(uname:any){
    return this.http.delete('http://localhost:3000/deleteAcc/'+uname)
  }

}
