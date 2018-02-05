import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class DatabaseService {

    users: Observable<any>;
    teams = [];

    constructor(private afStore: AngularFirestore) {
        this.users = afStore.collection('users').valueChanges();
    }

    createNewUser(uid, role, team) {
        if (team !== undefined) {
            // tslint:disable-next-line:max-line-length
            this.afStore.firestore.collection('users').add({ 'user': uid, 'role': role, 'team': team, 'previous rating': 0, 'rating': 0, 'velocity': 0 });
        } else {
            this.afStore.firestore.collection('users').add({ 'user': uid, 'role': role, 'previous rating': 0, 'rating': 0, 'velocity': 0 });
        }
    }

    getTeams() {
        this.users.subscribe(response => {
            response.map(element => {
                if (!this.teams.includes(element.team)) {
                    this.teams.push(element.team);
                }
            });
        });
        return this.teams;
    }

}
