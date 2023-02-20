import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { AllMoviesComponent } from './all-movies/all-movies.component';
import { AllTvshowsComponent } from './all-tvshows/all-tvshows.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MoviesComponent } from './movies.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { WatchListComponent } from './watch-list/watch-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component:LoginComponent  },
  { path: 'all-movies', component: AllMoviesComponent },
  { path: 'all-tvshows', component: AllTvshowsComponent },
  { path: 'movie-details', component: MovieDetailsComponent },
  { path: 'watch-list', component: WatchListComponent },
  { path: 'search', component: SearchComponent },
  { path: '**', component: PageNotFoundComponent }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
