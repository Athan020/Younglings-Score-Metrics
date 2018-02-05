import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email;
  password;
  submitted = false;

  constructor(protected readonly authentication: AuthenticationService, protected readonly router: Router) { }

  ngOnInit() {
    this.authentication.logout();
  }

  onSubmit() {
    this.submitted = true;
    const loggedIn = this.authentication.signIn(this.email, this.password);
    if (loggedIn) {
      this.router.navigate(['/dashboard']);
    } else {
      this.submitted = false;
      alert('Login unsuccessful, please try again or register.');
    }
  }

}
