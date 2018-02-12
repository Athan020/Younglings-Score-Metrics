import { DatabaseService } from './../../services/database/database.service';
import { AuthenticationService } from './../../services/authentication/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(protected readonly authentication: AuthenticationService, protected readonly db: DatabaseService) { }

  ngOnInit() {
  }

}
