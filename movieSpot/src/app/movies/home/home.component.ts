import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { DataService } from '../data.service';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  bannerData:any=[];
  trendingData:any=[];
  trendingTvShows:any=[];
  popularMovies:any=[];
  topratedMovies:any=[];
  upcomingMovies:any=[];
  backDropImage:any=[];
  movieVideoKey:any
  currentUser:any
  fullname:any
  uname=''
  emsg:any
  successmsg:any
  // movieVideoKey:any


  constructor(private api:ApiService, private router:Router, private ds:DataService) {
   }

  ngOnInit(): void {
   
    this.getBanner();
    this.getTrendingMovies();
    this.getTrendingTvshows()
    this.getTopratedMovies();
    this.getPopularMovies()
    this.getUpcomingMovies();
    this.getBackdrop();

    if (localStorage.getItem('currentUser')) {
      this.currentUser=JSON.parse(localStorage.getItem('currentUser')|| '');
      console.log(this.currentUser,'currentuser#');
      
    }
    if (localStorage.getItem('fullName')) {
      this.fullname=JSON.parse(localStorage.getItem('fullName')|| '');
      console.log(this.fullname,'fullname#');
      
    }
    
  }

  //get bannerdata
 getBanner(){
  this.api.getBanner().subscribe(
    (data:any)=>{
      // console.log(data);
      this.bannerData=data.results;
      
    })
 }

 //get trending movies data
 getTrendingMovies(){
  this.api.getTrendingData().subscribe(
    (data:any)=>{
      console.log(data, 'trending#');
      this.trendingData=data.results;
      // console.log(this.trendingData);
      
    })

 }

  //get trending tv data
  getTrendingTvshows(){
    this.api.getTrendingTvshows().subscribe(
      (data:any)=>{
        console.log(data, 'trendingTv#');
        this.trendingTvShows=data.results;
        // console.log(this.trendingData);
        
      })
  
   }

 //get Popular movies data
 getPopularMovies(){

  this.api.getPopularData().subscribe(
    (data:any)=>{
      console.log(data, 'popular#');
      this.popularMovies=data.results;
      // console.log(this.trendingData);
      
    })

 }


 //get Toprated movies data
 getTopratedMovies(){

  this.api.getTopratedData().subscribe(
    (data:any)=>{
      console.log(data, 'toprated#');
      this.topratedMovies=data.results;
      // console.log(this.trendingData);
      
    })

 }


  //get Upcomming movies data
  getUpcomingMovies(){

    this.api.getUpcomingData().subscribe(
      (data:any)=>{
        console.log(data, 'upcoming#');
        this.upcomingMovies=data.results;
        // console.log(this.trendingData);
        
      })
  
   }

   getBackdrop(){
    this.api.getBackgroundImage().subscribe(
      (data:any)=>{
        confirm
        console.log(data,'backDropDetails#');
        
        this.backDropImage=data.result[0].results[
          Math.floor(Math.random()*data.result[0].results.length)
        ];
        console.log(this.backDropImage,'backdrop#');
      })

   }





 // to give the movie id to the api for movie-details-page
  movieId(t:any){
    localStorage.setItem("movieID",t.id);
    t.release_date? localStorage.setItem("mediaType",'movie') : localStorage.setItem("mediaType",'tv')        //   tvshow have no releasedate
    // t.media_type? this.api.getmovieId(t.id,t.media_type) : this.api.getmovieId(t.id,'movie');
}


// to get movie videolink
// getMovieVideo(t:any){
//   this.api.getMovieVideo(t.id).subscribe(
//     (data:any)=>{
//       console.log(data,'movieVideo#');
      
//       data.results.forEach((element:any)=> {
//         if (element.type=="Trailer" && element.name.toLowerCase() =="official trailer") {
//            this.movieVideoKey= element.key;
//            console.log(this.movieVideoKey, 'movievideoLink#');         

//         }
//       });
      
//     });
// }

getMovieVideo(t:any,media_type:any){

  if (media_type=='movie') {
  this.api.getMovieVideo(t.id).subscribe(
    (data:any)=>{
      console.log(data,'movieVideoData#');
      data.results.forEach((element:any)=> {
        if (element.type=="Trailer" && element.name.toLowerCase() =="official trailer") {
           this.movieVideoKey= element.key;
           console.log(this.movieVideoKey, 'movievideoLink#');
           
        }
      })

      
    });
  }else{

    this.api.getTvShowVideo(t.id).subscribe(
      (data:any)=>{
        console.log(data,'movieVideoData#');
        data.results.forEach((element:any)=> {
          if (element.type=="Trailer" && element.name.toLowerCase() =="official trailer") {
             this.movieVideoKey= element.key;
             console.log(this.movieVideoKey, 'movievideoLink#');
             
          }
        });



  })

  }

}





//add to watch list
addtoWatchlist(movie:any){
  let uname=this.currentUser;   
  if (uname) {  
  console.log(uname,'uname#');

  if(movie.media_type){
    this.ds.addtoWatchlist(uname,movie,movie.media_type).subscribe(
      (result:any)=>{
        // alert(result.message)  //added successfully
        this.successmsg=result.message
        
  
      },
      (result:any)=>{
        alert(result.error.message)  //error message
  
    });
  }
  else{
    this.ds.addtoWatchlist(uname,movie,'movie').subscribe(
      (result:any)=>{
        this.successmsg=result.message

        // alert(result.message)  //added successfully
        
      },
      (result:any)=>{
        alert(result.error.message)  //error message
  
    });
  }
}else{
  this.emsg='Please login first!';
  // alert('Please login first!')

}
  

}


logout(){
  //remove username and acno
  // localStorage.removeItem('currentAcno');
  localStorage.removeItem('currentUser');
  localStorage.removeItem('token');
  window.location.reload()
  this.router.navigateByUrl('');
}

DeleteUser(){
  // alert('Clicked')
  this.uname=JSON.parse(localStorage.getItem('currentUser')|| '');
  
}

onCancel(){
  this.uname="";
}



onDelete(){
  // alert (event);
  this.ds.deleteAcc(this.uname).subscribe(
    (result:any)=>{
    alert(result.message)
    this.router.navigateByUrl('')
    this.logout();
  },
  // result=>{
  //   alert(result.error.message)
  // }
  )
}





}
