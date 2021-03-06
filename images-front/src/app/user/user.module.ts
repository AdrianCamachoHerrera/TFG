import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { DetailComponent } from './components/detail/detail.component';
import { EditComponent } from './components/edit/edit.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangueAvatarComponent } from './components/changue-avatar/changue-avatar.component';
import { FriendDetailComponent } from './components/friend-detail/friend-detail.component';


@NgModule({
  declarations: [
    DetailComponent,
    EditComponent,
    ChangePasswordComponent,
    ChangueAvatarComponent,
    FriendDetailComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ], 
  exports: [
    ChangePasswordComponent,
    DetailComponent,
    FriendDetailComponent,
    EditComponent
  ]
})
export class UserModule { }
