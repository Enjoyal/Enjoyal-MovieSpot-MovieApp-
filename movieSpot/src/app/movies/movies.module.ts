import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies.component';
import { AllMoviesComponent } from './all-movies/all-movies.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WatchListComponent } from './watch-list/watch-list.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AllTvshowsComponent } from './all-tvshows/all-tvshows.component';


@NgModule({
  declarations: [
    MoviesComponent,
    AllMoviesComponent,
    MovieDetailsComponent,
    HomeComponent,
    SearchComponent,
    WatchListComponent,
    RegisterComponent,
    LoginComponent,
    AllTvshowsComponent,
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    HttpClientModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class MoviesModule { }
