import { DatabaseService } from './../database/database.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, CanActivate } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/Auth';

@Injectable()
export class AuthguardService implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private router: Router, private db: DatabaseService) {
  }

  canActivate(): boolean {
    let flag = true;
    this.afAuth.authState.subscribe(response => {
      if (response === null) {
        flag = false;
        this.router.navigate(['/login']);
      } else {
        this.db.updateRole(response.uid);
      }
    });
    return flag;
  }

}
