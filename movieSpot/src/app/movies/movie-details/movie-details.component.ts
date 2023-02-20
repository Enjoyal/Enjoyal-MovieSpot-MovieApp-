import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { DataService } from '../data.service';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  currenmovieId:any;
  movieDetails:any=[];
  tvShowDetails:any=[];
  extraMovieDetails:any=[];
  movieVideoKey:any;
  tvShowVideoKey:any;
  youtubelink:any
  movieCast:any=[];
  tvShowCast:any=[];
  movieReview:any=[]
  tvReview:any=[];
  mediaType:any;
  currentmovieId:any
  Reviews:any
  emsg='';
  successmsg='';
  rating:any;
  comment:any;
  currentUsername:any;
  fullname:any
  edited:any



  // genre:any;
  //deposit model
reviewForm=this.fb.group({
  rating:['',[Validators.required,Validators.pattern('[0-9.]*'),Validators.min(1),Validators.max(10)]],
  review:['',[Validators.required,Validators.minLength(1),Validators.maxLength(40)]],
})

  constructor( private api:ApiService,private ds:DataService, private fb:FormBuilder, private router:Router) { }

  ngOnInit(): void {

    if (localStorage.getItem('currentUser')) {
      this.currentUsername=JSON.parse(localStorage.getItem('currentUser') || '')
      this.fullname=JSON.parse(localStorage.getItem('fullName') || '')

    }

  this.getmovieId();
  // this.getTvShowId();
  // this.genre=this.tvShowDetails.genre.filter((i:any)=>i.name);
  // console.log(this.genre,"genre#");  
  }

  

  //getting movie id from api service
  getmovieId(){
     this.currentmovieId =localStorage.getItem("movieID");
    this.mediaType =localStorage.getItem("mediaType");


    // let currentmovieId= this.api.currentMovieId;
    //  this.mediaType=this.api.mediaType;
    console.log(this.currentmovieId);
    if(this.mediaType=='movie'){
    this.getMovieDetails(this.currentmovieId);
    this.getMovieVideo(this.currentmovieId);
    this.getMovieCast(this.currentmovieId);
    this.getmovieReview(this.currentmovieId);
    this.getReviews(this.currentmovieId);

    }
    else if(this.mediaType=='tv'){
      this.getTvShowsDetails(this.currentmovieId);
        this.getTvShowVideo(this.currentmovieId);
        this.getTvShowCast(this.currentmovieId);
        this.getTvReview(this.currentmovieId);
        this.getReviews(this.currentmovieId);
        
    }
  }

  //getting tv id from api service
  // getTvShowId(){
  //   let currentTvId= this.api.currentMovieId;
  //   console.log(currentTvId);
  //   this.getTvShowsDetails(currentTvId)
  //   this.getMovieVideo(currentTvId);
  //   this.getMovieCast(currentTvId);
  // }



  //get movie details from api service
  getMovieDetails(id:any){    
    this.api.getmovieDetails(id).subscribe(
      (data:any)=>{
        console.log(data, 'moviedetails#');
        this.movieDetails=data;
        this.getExtraMovieDetails(this.movieDetails);

      })
  }

  getTvShowsDetails(id:any){
    this.api.getTvDetails(id).subscribe(
      (data:any)=>{
        console.log(data, 'tvdetails#');
        this.tvShowDetails=data;
      })
  }

  //get extra movie details from api service
  getExtraMovieDetails(movieDetails:any){   
    console.log(movieDetails.imdb_id, 'imdbId#');
    this.api.getExtramovieDetails(movieDetails.imdb_id).subscribe(
      (data:any)=>{
        console.log(data, 'Extradetails#');
        this.extraMovieDetails=data;

      })
  }

//to get movie videolink
  getMovieVideo(id:any){
    this.api.getMovieVideo(id).subscribe(
      (data:any)=>{
        console.log(data,'movieVideo#');
        
        data.results.forEach((element:any)=> {
          if (element.type=="Trailer" && element.name.toLowerCase() =="official trailer") {
             this.movieVideoKey= element.key;
             console.log(this.movieVideoKey, 'movievideoLink#');   
             this.youtubelink='https://youtube.com/embed/'+ this.movieVideoKey
             console.log(this.youtubelink);
             
          }
        });
        
      });
  }
  


  //to get tv videolink
  getTvShowVideo(id:any){
    this.api.getTvShowVideo(id).subscribe(
      (data:any)=>{
        console.log(data,'tvVideo#');
        
        data.results.forEach((element:any)=> {
          if (element.type=="Trailer" && element.name.toLowerCase() =="official trailer") {
             this.tvShowVideoKey= element.key;
             console.log(this.tvShowVideoKey, 'TVvideoLink#');
          }
        });
        
      });
  }

//to get movie cast
  getMovieCast(id:any){
    this.api.getMovieCast(id).subscribe(
      (data:any)=>{
        console.log(data);
        this.movieCast=data.cast;
      })
  }

  // to get tv cast
  getTvShowCast(id:any){
    this.api.getTvShowCast(id).subscribe(
      (data:any)=>{
        console.log(data);
        this.tvShowCast=data.cast;
        console.log(this.tvShowCast,'cast#');
        
      })
  }

  //get movie review
  getmovieReview(id:any){
    this.api.getMovieReview(id).subscribe(
      (data:any)=>{
        console.log(data);
        this.movieReview=data.results;
        console.log(this.movieReview,'movieReview#');
      }
    )

  }

    //get tv review
    getTvReview(id:any){
      this.api.getTvReview(id).subscribe(
        (data:any)=>{
          console.log(data);
          this.tvReview=data.results;
          console.log(this.tvReview,'tvReview#');
        }
      )
  
    }



  addtoWatchlist(movie:any){
    let uname=this.currentUsername;       //getting uname from dataservice

    if(uname) {
    console.log(uname,'uname#');
    if(movie.media_type){
    this.ds.addtoWatchlist(uname,movie,movie.media_type).subscribe(
      (result:any)=>{
        //(server to client)
        // alert(result.message)  //added successfully
        this.successmsg=result.message
        console.log(this.successmsg,'successmsg#');
        
      },
      (result:any)=>{
        alert(result.error.message)  //error message
    });
  }
  else{
    this.ds.addtoWatchlist(uname,movie,this.mediaType).subscribe(
      (result:any)=>{
        //(server to client)
        // alert(result.message)  //added successfully
        this.successmsg=result.message
        console.log(this.successmsg,'successmsg#');

      },
      (result:any)=>{
        alert(result.error.message)  //error message
       
    });

  }
  }else{
    this.emsg='Please login first!';
  }
  
  }

  reviewAdd(){
    if (!this.currentUsername) {
    this.emsg='Please login first!';
    }

  }

  addReview(){
    // var uname=this.ds.currentUser;    
    var uname=this.currentUsername;
    var author=this.fullname;
    if (uname) {

    var movieId=this.currentmovieId
    var rating=this.reviewForm.value.rating;
    var comment=this.reviewForm.value.review;
    var reviewTime= new Date();
    console.log(reviewTime,'date&time#');
    
    
    if (this.reviewForm.valid) {
      this.ds.addReview(uname,author,movieId,rating,comment,reviewTime).subscribe(
        (result:any)=>{
            alert(result.message)
            console.log(result,'addedReview#');
            window.location.reload();
            // this.router.navigateByUrl('movie-details')
        },
        (result:any)=>{
          alert(result.error.message)  
    
      })
    }else{
      alert('Invalid Format')
    }

  }else{
    this.emsg='Please login first!';
    // alert('Please login first!')
    
  }

}

  getReviews(id:any){
    console.log(id,'movieID#');
    this.ds.getReviews(id).subscribe(
      (result:any)=>{
        this.Reviews=result.reviews
        console.log(this.Reviews,'getReviews#');
      },
      (result:any)=>{
        // alert(result.error.message)  
  
    }
    )}

    deleteReview(id:any){
      console.log(id,'movieID#');
    var uname=this.currentUsername

    if (uname) {
      this.ds.deleteReview(uname,id).subscribe(
        (result:any)=>{
          this.Reviews=result.reviews;
        console.log(this.Reviews,'getReviews#');
        alert(result.message);
        window.location.reload();

        },(result:any)=>{
        alert(result.error.message);

        }
      )
    }

    }

    editReview(rating:any,comment:any){
      this.edited=1;
      this.rating=rating;
      this.comment=comment;
      console.log(this.rating,'editrating#');
      console.log(this.comment,'editreview#');

    }

    UpdatedReview(id:any){
      var uname=this.currentUsername;
      var rating=this.reviewForm.value.rating;
      var comment=this.reviewForm.value.review;
      var reviewTime= new Date();
      this.ds.getEditedReview(uname,id,rating,comment,reviewTime).subscribe(
        (result:any)=>{
          // this.Reviews=result.reviews;
          window.location.reload();
          console.log(this.Reviews,'EditedReviews#');
          alert(result.message)

          
        },(result:any)=>{
          alert(result.error.message);
  
          }
      )


    }
    

}
