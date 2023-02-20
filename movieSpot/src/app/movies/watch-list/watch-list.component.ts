import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.css']
})
export class WatchListComponent implements OnInit {
  watchlist:any=[];
  successmsg:any;
  emsg:any;
  // msg:any
  mediaType:any;
  movieortvName:any
  currentUser:any
  constructor(private api:ApiService,private router:Router, private ds:DataService) { }

  ngOnInit(): void {
    if (!localStorage.getItem('currentUser')) {
      this.emsg = 'Login'
    }
    else{
      this.currentUser=JSON.parse(localStorage.getItem('currentUser')|| '');
      this.getWatchlist();
    }

  
  }



   // to give the movie id to the api for movie-details-page
  movieId(movie:any){
    localStorage.setItem("movieID",movie.id);
    localStorage.setItem("mediaType",movie.media_type)

  // this.api.getmovieId(movie.id, movie.media_type)     
  // this.router.navigateByUrl('movie-details') ;
}

//to get watchlist from backend(database)
  getWatchlist(){
    let uname=this.currentUser;       //getting uname from dataservice
    this.ds.getWatchlist(uname).subscribe(
      (data:any)=>{
        console.log(data,'watchlistdata#');
        
       this.watchlist= data.watchlists;
       console.log(this.watchlist,'watchlist#');
       if(this.watchlist.length===0){
        this.emsg = 'Get Started!';
       }
      },
      (data:any)=>{
        this.emsg = data.error.message
        }
    )
  }

  onDelete(movie:any){
    localStorage.setItem("MovieorTV_ID",movie.id);
    movie.media_type=='tv'? this.mediaType='TV Show' : this.mediaType='Movie'
    movie.media_type=='tv'? this.movieortvName= movie.name : this.movieortvName= movie.title

  }


deleteWatch(){
  let movie_ID=localStorage.getItem("MovieorTV_ID")
  let uname=this.currentUser;       //getting uname from dataservice
  this.ds.deleteFromWatchList(uname,movie_ID).subscribe(
      (result:any)=>{
        this.successmsg= result.message;   

        // alert(result.message)
        this.router.navigateByUrl('watch-list');
        this.watchlist=result.watchlists;
       console.log(this.watchlist,'watchlist After removing#');
        if(this.watchlist.length==0){
          this.emsg='Empty Wishlist'
        }
        window.location.reload();
      },
      (result:any)=>{

        // alert(result.error.message)
      }

    )

  }

  emptyWatchlist(){

    let uname=this.currentUser;       
    this.ds.emptyWatchlist(uname).subscribe(
        (result:any)=>{
          this.successmsg= result.message;   
          // alert(result.message)
          // this.router.navigateByUrl('watch-list');
          this.watchlist=result.watchlists;
         console.log(this.watchlist,'watchlist after delete all#');
          window.location.reload();
        },
        (result:any)=>{
  
          // alert(result.error.message)
        }
  
      )
  

  }


}
