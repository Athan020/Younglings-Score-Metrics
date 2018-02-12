import { AuthenticationService } from './../../../services/authentication/authentication.service';
import { DatabaseService } from './../../../services/database/database.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  info = 'Team information';

  constructor(protected readonly db: DatabaseService, protected readonly authentication: AuthenticationService) {
    this.db.users.subscribe(response => {
      console.log(response);
  });
  }

  ngOnInit() {
  }

}
