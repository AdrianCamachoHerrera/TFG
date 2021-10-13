import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/model/User';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-friend-detail',
  templateUrl: './friend-detail.component.html',
  styleUrls: ['./friend-detail.component.css'],
})
export class FriendDetailComponent implements OnInit, OnDestroy {
  user!: User;
  img: string;
  private userid: string;
  private sub: any;
  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.userid = params['id'];
      this.usersService.find(this.userid).subscribe((data) => {
        this.user = data;
        this.img =
          'https://openfaas.adriancamachofaas.ml/function/download-image/' +
          this.user.avatar;
      });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
