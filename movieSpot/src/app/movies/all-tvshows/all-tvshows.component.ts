import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-all-tvshows',
  templateUrl: './all-tvshows.component.html',
  styleUrls: ['./all-tvshows.component.css']
})
export class AllTvshowsComponent implements OnInit {
  tvShowsResult:any=[];
  successmsg:any;
  emsg:any
  currentUser:any
  genre='';

  constructor(private api:ApiService, private ds:DataService) { }

  ngOnInit(): void {

    if (localStorage.getItem('currentUser')) {
      this.currentUser=JSON.parse(localStorage.getItem('currentUser')|| '');
    }

    this.getTvShows('Genre');
  }

  getTvShows(genre:any){
    
    this.api.getTvShows().subscribe(
      (data:any)=>{
        console.log(data,'#allmovies&tvshows');
        this.tvShowsResult=data.movies[1].results;
        console.log(this.tvShowsResult,'tvShowsResult#');
        this.genre=genre;
      })

  }

  actionTvShows(genre:any){
    this.api.getTvShows().subscribe(
      (data:any)=>{
        // console.log(data,"allMovies#");
        this.tvShowsResult=data.movies[1].results;
        this.tvShowsResult= this.tvShowsResult.filter((item:any)=> item.genre_ids[0]==10759 || item.genre_ids[1]==10759 || item.genre_ids[2]==10759 || item.genre_ids[1]==10759 || item.genre_ids[2]==10759 )
        this.genre=genre;

      })
  }

  animeTvShows(genre:any){
    this.api.getTvShows().subscribe(
      (data:any)=>{
        // console.log(data,"allMovies#");
        this.tvShowsResult=data.movies[1].results;
        this.tvShowsResult= this.tvShowsResult.filter((item:any)=> item.genre_ids[0]==16 || item.genre_ids[1]==16 || item.genre_ids[2]==16 || item.genre_ids[1]==16 || item.genre_ids[2]==16  )
        this.genre=genre;

      })
  }

  familyTvShows(genre:any){
    this.api.getTvShows().subscribe(
      (data:any)=>{
        // console.log(data,"allMovies#");
        this.tvShowsResult=data.movies[1].results;
        this.tvShowsResult= this.tvShowsResult.filter((item:any)=> item.genre_ids[0]==10751 || item.genre_ids[1]==10751 || item.genre_ids[2]==10751 || item.genre_ids[1]==10751 || item.genre_ids[2]==10751 )
        this.genre=genre;

      })
  }


  comedyTvShows(genre:any){
    this.api.getTvShows().subscribe(
      (data:any)=>{
        // console.log(data,"allMovies#");
        this.tvShowsResult=data.movies[1].results;
        this.tvShowsResult= this.tvShowsResult.filter((item:any)=> item.genre_ids[0]==35 || item.genre_ids[1]==35 || item.genre_ids[2]==35 || item.genre_ids[1]==35 || item.genre_ids[2]==35 )
        this.genre=genre;

      })
  }

  dramaTvShows(genre:any){
    this.api.getTvShows().subscribe(
      (data:any)=>{
        // console.log(data,"allMovies#");
        this.tvShowsResult=data.movies[1].results;
        this.tvShowsResult= this.tvShowsResult.filter((item:any)=> item.genre_ids[0]==18 || item.genre_ids[1]==18 || item.genre_ids[2]==18 || item.genre_ids[1]==18 || item.genre_ids[2]==18 )
        this.genre=genre;

      })
  }

  fantasyTvShows(genre:any){
    this.api.getTvShows().subscribe(
      (data:any)=>{
        // console.log(data,"allMovies#");
        this.tvShowsResult=data.movies[1].results;
        this.tvShowsResult= this.tvShowsResult.filter((item:any)=> item.genre_ids[0]==14 || item.genre_ids[1]==14 || item.genre_ids[2]==14 || item.genre_ids[1]==14 || item.genre_ids[2]==14 )
        this.genre=genre;

      })
  }

  romanceTvShows(genre:any){
    this.api.getTvShows().subscribe(
      (data:any)=>{
        // console.log(data,"allMovies#");
        this.tvShowsResult=data.movies[1].results;
        this.tvShowsResult= this.tvShowsResult.filter((item:any)=> item.genre_ids[0]==10749 || item.genre_ids[1]==10749 || item.genre_ids[2]==10749 || item.genre_ids[1]==10749 || item.genre_ids[2]==10749 )
        this.genre=genre;

      })
  }

  horrorTvShows(genre:any){
    this.api.getTvShows().subscribe(
      (data:any)=>{
        // console.log(data,"allMovies#");
        this.tvShowsResult=data.movies[1].results;
        this.tvShowsResult= this.tvShowsResult.filter((item:any)=> item.genre_ids[0]==27 || item.genre_ids[1]==27 || item.genre_ids[2]==27 || item.genre_ids[1]==27 || item.genre_ids[2]==27 )
        this.genre=genre;

      })
  }

  documentaryTvShows(genre:any){
    this.api.getTvShows().subscribe(
      (data:any)=>{
        // console.log(data,"allMovies#");
        this.tvShowsResult=data.movies[1].results;
        this.tvShowsResult= this.tvShowsResult.filter((item:any)=> item.genre_ids[0]==99 || item.genre_ids[1]==99 || item.genre_ids[2]==99 || item.genre_ids[1]==99 || item.genre_ids[2]==99 )
        this.genre=genre;

      })
  }


  
 // to give the movie id to the api for movie-details-page
 movieId(tv:any){
  localStorage.setItem("movieID",tv.id);
  localStorage.setItem("mediaType",'tv')
  // this.api.getmovieId(tv.id, 'tv')      
}

// tvShowId(t:any){
//   this.api.getTvShowId(t.id)      
// }


  addtoWatchlist(tv:any){
    let uname=this.currentUser; 
    if(uname){      
    console.log(uname,'uname#');
              
    this.ds.addtoWatchlist(uname,tv,'tv').subscribe(
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
