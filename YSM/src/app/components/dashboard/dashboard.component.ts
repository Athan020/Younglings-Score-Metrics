import { Router } from '@angular/router';
import { DatabaseService } from './../../services/database/database.service';
import { AuthenticationService } from './../../services/authentication/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor(protected readonly authentication: AuthenticationService, protected readonly db: DatabaseService, protected router: Router) { }

  ngOnInit() {
    if (this.db.role === '') {
      this.router.navigate(['/register']);
    }
  }

}
