import { DatabaseService } from './../../services/database/database.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  submitted = false;
  name;
  email;
  password;
  role;
  team;
  teamsList;

  // tslint:disable-next-line:max-line-length
  constructor(protected readonly authentication: AuthenticationService, protected readonly router: Router, protected readonly db: DatabaseService) { }

  ngOnInit() {
    this.teamsList = this.db.getTeams();
  }

  onSubmit() {
    this.submitted = true;
    // if (this.password.length() >= 8) {
      this.authentication.signUp(this.email, this.password, this.name, this.role, this.team);
    // } else {
    //   alert('Password needs to be atleast 8 characters long');
    // }
  }

}
