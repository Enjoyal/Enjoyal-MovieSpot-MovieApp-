import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-all-movies',
  templateUrl: './all-movies.component.html',
  styleUrls: ['./all-movies.component.css']
})
export class AllMoviesComponent implements OnInit {
  moviesResult:any=[];
  genre='';
  currentUser:any
  successmsg:any
  emsg:any

  constructor(private api:ApiService, private ds:DataService) { }

  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      this.currentUser=JSON.parse(localStorage.getItem('currentUser')|| '');
    }
    this.getMovies('Genre');

  }


  getMovies(genre:any){
    
    this.api.getMovies().subscribe(
      (data:any)=>{
        console.log(data,"allMovies#");
        this.moviesResult=data.movies[0].results;
        console.log(this.moviesResult, 'movies#');
        this.genre=genre;
        
      })

  }

  thrillerMovies(genre:any){
    this.api.getMovies().subscribe(
      (data:any)=>{
        // console.log(data,"allMovies#");
        this.moviesResult=data.movies[0].results;
        this.moviesResult= this.moviesResult.filter((item:any)=> item.genre_ids[0]==53 || item.genre_ids[1]==53 || item.genre_ids[2]==53  )
        this.genre=genre;
      })

  }

  actionMovies(genre:any){
    this.api.getMovies().subscribe(
      (data:any)=>{
        // console.log(data,"allMovies#");
        this.moviesResult=data.movies[0].results;
        this.moviesResult= this.moviesResult.filter((item:any)=> item.genre_ids[0]==28 || item.genre_ids[1]==28 || item.genre_ids[2]==28 || item.genre_ids[1]==28 || item.genre_ids[2]==28 )
        this.genre=genre;

      })
  }

  adventureMovies(genre:any){
    this.api.getMovies().subscribe(
      (data:any)=>{
        // console.log(data,"allMovies#");
        this.moviesResult=data.movies[0].results;
        this.moviesResult= this.moviesResult.filter((item:any)=> item.genre_ids[0]==12 || item.genre_ids[1]==12 || item.genre_ids[2]==12 || item.genre_ids[1]==12 || item.genre_ids[2]==12  )
        this.genre=genre;

      })
  }

  animeMovies(genre:any){
    this.api.getMovies().subscribe(
      (data:any)=>{
        // console.log(data,"allMovies#");
        this.moviesResult=data.movies[0].results;
        this.moviesResult= this.moviesResult.filter((item:any)=> item.genre_ids[0]==16 || item.genre_ids[1]==16 || item.genre_ids[2]==16 || item.genre_ids[1]==16 || item.genre_ids[2]==16  )
        this.genre=genre;

      })
  }

  familyMovies(genre:any){
    this.api.getMovies().subscribe(
      (data:any)=>{
        // console.log(data,"allMovies#");
        this.moviesResult=data.movies[0].results;
        this.moviesResult= this.moviesResult.filter((item:any)=> item.genre_ids[0]==10751 || item.genre_ids[1]==10751 || item.genre_ids[2]==10751 || item.genre_ids[1]==10751 || item.genre_ids[2]==10751 )
        this.genre=genre;

      })
  }


  comedyMovies(genre:any){
    this.api.getMovies().subscribe(
      (data:any)=>{
        // console.log(data,"allMovies#");
        this.moviesResult=data.movies[0].results;
        this.moviesResult= this.moviesResult.filter((item:any)=> item.genre_ids[0]==35 || item.genre_ids[1]==35 || item.genre_ids[2]==35 || item.genre_ids[1]==35 || item.genre_ids[2]==35 )
        this.genre=genre;

      })
  }

  dramaMovies(genre:any){
    this.api.getMovies().subscribe(
      (data:any)=>{
        // console.log(data,"allMovies#");
        this.moviesResult=data.movies[0].results;
        this.moviesResult= this.moviesResult.filter((item:any)=> item.genre_ids[0]==18 || item.genre_ids[1]==18 || item.genre_ids[2]==18 || item.genre_ids[1]==18 || item.genre_ids[2]==18 )
        this.genre=genre;

      })
  }

  fantasyMovies(genre:any){
    this.api.getMovies().subscribe(
      (data:any)=>{
        // console.log(data,"allMovies#");
        this.moviesResult=data.movies[0].results;
        this.moviesResult= this.moviesResult.filter((item:any)=> item.genre_ids[0]==14 || item.genre_ids[1]==14 || item.genre_ids[2]==14 || item.genre_ids[1]==14 || item.genre_ids[2]==14 )
        this.genre=genre;

      })
  }

  romanceMovies(genre:any){
    this.api.getMovies().subscribe(
      (data:any)=>{
        // console.log(data,"allMovies#");
        this.moviesResult=data.movies[0].results;
        this.moviesResult= this.moviesResult.filter((item:any)=> item.genre_ids[0]==10749 || item.genre_ids[1]==10749 || item.genre_ids[2]==10749 || item.genre_ids[1]==10749 || item.genre_ids[2]==10749 )
        this.genre=genre;

      })
  }

  horrorMovies(genre:any){
    this.api.getMovies().subscribe(
      (data:any)=>{
        // console.log(data,"allMovies#");
        this.moviesResult=data.movies[0].results;
        this.moviesResult= this.moviesResult.filter((item:any)=> item.genre_ids[0]==27 || item.genre_ids[1]==27 || item.genre_ids[2]==27 || item.genre_ids[1]==27 || item.genre_ids[2]==27 )
        this.genre=genre;

      })
  }

  documentaryMovies(genre:any){
    this.api.getMovies().subscribe(
      (data:any)=>{
        // console.log(data,"allMovies#");
        this.moviesResult=data.movies[0].results;
        this.moviesResult= this.moviesResult.filter((item:any)=> item.genre_ids[0]==99 || item.genre_ids[1]==99 || item.genre_ids[2]==99 || item.genre_ids[1]==99 || item.genre_ids[2]==99 )
        this.genre=genre;

      })
  }




 // to give the movie id to the api for movie-details-page
 movieId(t:any){
  localStorage.setItem("movieID",t.id);
  localStorage.setItem("mediaType",'movie');

  // this.api.getmovieId(t.id, 'movie')      
}


  addtoWatchlist(movie:any){
    let uname=this.currentUser;  
    if (uname) {
    console.log(uname,'uname#');
              
    this.ds.addtoWatchlist(uname,movie,'movie').subscribe(
      (result:any)=>{
        this.successmsg= result.message;   
        // alert(result.message)  //added successfully
      },
      (result:any)=>{
        alert(result.error.message)  //error message
  
    });
  }else{
    this.emsg='Please login first!';
  }
  
  }








}
