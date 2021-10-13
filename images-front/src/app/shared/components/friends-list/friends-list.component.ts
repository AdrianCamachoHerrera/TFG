import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Friend } from '../../model/Friend';
import { FunctionsService } from '../../services/functions.service';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css'],
})
export class FriendsListComponent implements OnInit, OnDestroy{
  friends: Friend[];
  userid: string;
  selectedFriend: string;
  private sub: any;
  img: string;

  constructor(private functionsService: FunctionsService,  private activeroute: ActivatedRoute, private route: Router) {}

  ngOnInit(): void {

    this.sub = this.activeroute.params.subscribe((params) => {
      this.selectedFriend = params['id'];
    });

    this.img = 'https://openfaas.adriancamachofaas.ml/function/download-image/';

    this.userid = localStorage.getItem('userid');
    const user = this.userid;
    this.functionsService.getFriends({ user }).subscribe((data) => {
      this.friends = data;
    });
  }

  addFriends(): void {
    console.log("hey")
    this.route.navigate(['/users-search']);
  }

  unfollowFriend(): void{
    
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
