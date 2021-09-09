import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from 'src/app/shared/services/users.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm){
    const { username, password } = f.value;

    this.usersService.login(username, password).subscribe(
      data => {
        localStorage.setItem('userid', data.id)
      },
      err => {
        console.log("ERROR");
      }
    );
  }

}
