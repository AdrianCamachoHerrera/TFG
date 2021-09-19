import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnOneComponent } from './layouts/column-one/column-one.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { SharedRoutingModule } from './shared-routing.module';
import { UserModule } from '../user/user.module';
import { NewImageComponent } from './components/new-image/new-image.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FriendsListComponent } from './components/friends-list/friends-list.component';



@NgModule({
  declarations: [
    ColumnOneComponent,
    HeaderComponent,
    HomeComponent,
    NewImageComponent,
    FriendsListComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    UserModule,
    ReactiveFormsModule
  ],
  exports:[
    ColumnOneComponent
  ]
})
export class SharedModule { }
