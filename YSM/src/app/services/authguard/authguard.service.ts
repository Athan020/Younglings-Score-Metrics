import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, CanActivate } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/Auth';

@Injectable()
export class AuthguardService implements CanActivate {

    constructor(private afAuth: AngularFireAuth, private router: Router) { }

    canActivate(): boolean {
        if (this.afAuth.auth === null) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      }

}
