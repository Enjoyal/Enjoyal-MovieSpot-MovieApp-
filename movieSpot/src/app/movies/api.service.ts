import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // searchkey= new BehaviorSubject('');
  // idList = new BehaviorSubject([])    
  

  constructor(private http:HttpClient) { }

  baseurl= 'https://api.themoviedb.org/3';
  apikey='71c33401b817d68cb98921a5518c7687';

 

  //banner api
  getBanner(){
    return this.http.get(`${this.baseurl}/trending/all/week?api_key=${this.apikey}&language=en-US`)

  }
  getTrendingData() {
    return this.http.get(`${this.baseurl}/trending/movie/day?api_key=${this.apikey}&language=en-US`)
    // return this.http.get('http://localhost:3000/home')

  }

  // to get popular movies data
  getTrendingTvshows(){
    return this.http.get(`${this.baseurl}/discover/tv?api_key=${this.apikey}&with_networks=213`);
  }

  // to get popular movies data
  getPopularData(){
    return this.http.get(`${this.baseurl}/movie/popular?api_key=${this.apikey}`);
  }

  // to get Toprated movies data
  getTopratedData(){
    return this.http.get(`${this.baseurl}/movie/top_rated?api_key=${this.apikey}`);
  }

  // to get Upcomming movies data
  getUpcomingData(){
    return this.http.get(`${this.baseurl}/movie/upcoming?api_key=${this.apikey}`);
  }

  getBackdrop(){
    return this.http.get(`${this.baseurl}/discover/movie?api_key=${this.apikey}&with_genres=28`);
  }
  //get backdrop for login page
  getBackgroundImage() {
    return this.http.get('http://localhost:3000/getTrending')

  }


  // to search movie
  getSearchData(data:any){
    return this.http.get(`${this.baseurl}/search/movie?api_key=71c33401b817d68cb98921a5518c7687&query=${data}`)
  }

  //to search tvshows
  getSearchTv(data:any){
    return this.http.get(`${this.baseurl}/search/tv?api_key=71c33401b817d68cb98921a5518c7687&query=${data}`)
  }

  //to get moviedetails
  getmovieDetails(data:any){
    return this.http.get(`${this.baseurl}/movie/${data}?api_key=${this.apikey}`)                 // passing id(data)
  }
  //to get tv details
  getTvDetails(id:any){
    return this.http.get(`${this.baseurl}/tv/${id}?api_key=${this.apikey}`)

  }

  //to get extra moviedetails
  getExtramovieDetails(data:any){
    return this.http.get(`https://www.omdbapi.com/?i=${data}&apikey=5cc4677d`)

  }

// to get movie id
// currentMovieId="";   
// mediaType="";                //declaringcurrentMovieid
//   getmovieId(id:any, media_type:any){                 //t is from home
//     // this.movieidarray.push(t);
//     // this.idList.next(this.movieidarray)
//     this.currentMovieId=id;
//     this.mediaType=media_type;
//     console.log(this.currentMovieId);
//   }


   // getMovieVideo
   getMovieVideo(data:any){
    return this.http.get(`${this.baseurl}/movie/${data}/videos?api_key=${this.apikey}`)
  }

  //get tv video
  getTvShowVideo(data:any){
    return this.http.get(`${this.baseurl}/tv/${data}/videos?api_key=${this.apikey}`)
  }

  // getMovieCast
  getMovieCast(data:any){
    return this.http.get(`${this.baseurl}/movie/${data}/credits?api_key=${this.apikey}`)
  }

  
  // get  tv Cast
  getTvShowCast(data:any){
    return this.http.get(`${this.baseurl}/tv/${data}/credits?api_key=${this.apikey}`)
  }

  //get movie review
  getMovieReview(data:any){
    return this.http.get(`${this.baseurl}/movie/${data}/reviews?api_key=${this.apikey}`)

  }


  //get Tv review
  getTvReview(data:any){
    return this.http.get(`${this.baseurl}/tv/${data}/reviews?api_key=${this.apikey}`)

  }




  //to get Movies only
  // getMovies(){
  //   return this.http.get(`${this.baseurl}/discover/movie?api_key=${this.apikey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`)
  // }

  getMovies(){
    return this.http.get('http://localhost:3000/getMovies')
  }

  getTvShows(){
    return this.http.get('http://localhost:3000/getMovies')
  }


  //to add data to Watchlist
  // addtoWatchlist(movie:any){
  //   const body={
  //     id: movie.id,
  //     original_title: movie.original_title,
  //     overview: movie.overview,
  //     poster_path: movie.poster_path,
  //     media_type: movie.media_type,
  //     vote_average:movie.vote_average,
  //     release_date:movie.release_date      
      
  //   }
  // return this.http.post('http://localhost:3000/addtoWatchlist', body)

  // }

//get Watchlist
// getWatchlist(){
//   return this.http.get('http://localhost:3000/getWatchlist')
//   }

  //
// deleteFromWatchList(id:any){
//   return this.http.delete('http://localhost:3000/deleteWatch/'+ id)
// }




}
