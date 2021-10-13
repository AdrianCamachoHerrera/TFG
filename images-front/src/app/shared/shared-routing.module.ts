import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UsersSearchComponent } from './components/users-search/users-search.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'users-search', component: UsersSearchComponent},
  {path: 'profile/:id', component: ProfileComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }