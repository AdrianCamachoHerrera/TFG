import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnOneComponent } from './layouts/column-one/column-one.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { SharedRoutingModule } from './shared-routing.module';
import { UserModule } from '../user/user.module';
import { NewImageComponent } from './components/new-image/new-image.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FriendsListComponent } from './components/friends-list/friends-list.component';
import { UsersSearchComponent } from './components/users-search/users-search.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PublicationDetailComponent } from './components/publication-detail/publication-detail.component';

@NgModule({
  declarations: [
    ColumnOneComponent,
    HeaderComponent,
    HomeComponent,
    NewImageComponent,
    FriendsListComponent,
    UsersSearchComponent,
    ProfileComponent,
    PublicationDetailComponent,
  ],
  imports: [CommonModule, SharedRoutingModule, UserModule, ReactiveFormsModule, FormsModule],
  exports: [ColumnOneComponent],
})
export class SharedModule {}
