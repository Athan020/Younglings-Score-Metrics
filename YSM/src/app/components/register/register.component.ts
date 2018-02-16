import { ReviewComponent } from '../review/review.component';
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
  newTeam = true;
  pristine = true;
  // teamsList;

  // tslint:disable-next-line:max-line-length
  constructor(protected readonly authentication: AuthenticationService, protected readonly router: Router, protected readonly db: DatabaseService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    this.authentication.signUp(this.email, this.password, this.name, this.role, this.team, this.newTeam);
    this.router.navigate(['/register']);
  }

  setNewTeam(newTeam) {
    this.newTeam = newTeam;
    this.pristine = false;
  }

}
