import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from 'src/app/shared/services/users.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm){
    const { username, name, password } = f.value;

    this.usersService.register(username, name, password).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log("ERROR");
      }
    );
  }

}
