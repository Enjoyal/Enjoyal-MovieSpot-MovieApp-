import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
  searchData:any=[];   
  searchTv:any=[];
  searchkey='';  
  mediaType:any;

  constructor( private api:ApiService ) { }

  ngOnInit(): void {
  this.getmediaType('Movie');
  }

  getmediaType(media:any){
    this.mediaType=media;
    console.log(this.mediaType,'mediatype#');
    
  }
 

  search(event:any){
     this.searchkey = event.target.value
    console.log(this.searchkey);
    if (this.searchkey) {
      if (this.mediaType=='Movie') {
          this.api.getSearchData(this.searchkey).subscribe(
          (data:any)=>{
                console.log(data, 'searchData#');
                this.searchData=data.results            //it is the search result
          })
      }
      else if(this.mediaType=='Tv Shows'){
          this.api.getSearchTv(this.searchkey).subscribe(
          (data:any)=>{
                console.log(data, 'searchTv#');
                this.searchTv=data.results;
          })
      }
    }
    else{
      this.searchData=[];
      this.searchTv=[];
    }
  }


        
 // to give the movie id to the api for movie-details-page
 movieId(movie:any,media:any){
  localStorage.setItem("movieID",movie.id);
  localStorage.setItem("mediaType",media)

  // this.api.getmovieId(movie.id, media)
}

}
