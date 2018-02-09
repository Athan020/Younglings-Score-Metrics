import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class DatabaseService {

    users: Observable<any>;
    teams: Observable<any>;
    sprints: Observable<any>;
    currentSprint: Observable<any>;

    constructor(private afStore: AngularFirestore) {
        this.users = afStore.collection('users').valueChanges();
        this.teams = afStore.collection('teams').valueChanges();
        this.sprints = afStore.collection('sprints').valueChanges();
    }

    createNewUser(uid: string, role: string, team: string, newTeam: boolean) {
        if (role === 'manager') {
            this.afStore.firestore.collection('users').add({ 'user': uid, 'role': role });
        } else if (role === 'po') {
            this.afStore.firestore.collection('users').add({ 'user': uid, 'role': role, 'team': team });
            this.pushToTeams(team, uid, role);
        } else {
            // tslint:disable-next-line:max-line-length
            this.afStore.firestore.collection('users').add({ 'user': uid, 'role': role, 'team': team, 'previousRating': 0, 'rating': 0 });
            if (role === 'leader' && newTeam) {
                // tslint:disable-next-line:max-line-length
                this.afStore.firestore.collection('teams').add({ 'name': team, 'leaders': [uid], 'velocity': 0, 'previousRating': 0, 'rating': 0 });
            } else {
                this.pushToTeams(team, uid, role);
            }
        }
    }

    pushToTeams(team: string, uid: string, chosenRole: string) {
        let role = chosenRole;
        if (role === 'leader') {
            role += 's';
        }
        const teams: Observable<any> = this.afStore.collection('teams').snapshotChanges().map(actions => {
            return actions.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
            });
        });

        let flag = true;
        teams.subscribe(response => {
            response.map(element => {
                if (element.name === team && flag) {
                    const key = element.id;
                    const users = element[role];
                    if (users === undefined) {
                        const temp = [uid];
                        const obj = {};
                        obj[role] = temp;
                        this.afStore.collection('teams').doc(key).update(obj);
                    } else {
                        if (!users.includes(uid)) {
                            users.push(uid);
                        } else {
                            alert('This user is already registered as part of this team.');
                        }
                        const obj = {};
                        obj[role] = users;
                        this.afStore.collection('teams').doc(key).update(obj);
                    }
                    flag = false;
                }
            });
        });
    }

    getNumSprints(): number {
        const sprints: Observable<any> = this.afStore.collection('sprints').snapshotChanges().map(actions => {
            return actions.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
            });
        });

        let highest = 1;

        sprints.subscribe(response => {
            response.map(element => {
                if (element.id.substring(-1).parseInt() > highest) {
                    highest = element.id.substring(-1).parseInt();
                }
            });
        });
        console.log(highest);
        return highest;
    }

    setCurrentSprint(sprintNum) {
        const sprints: Observable<any> = this.afStore.collection('sprints').snapshotChanges().map(actions => {
            return actions.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
            });
        });

        sprints.subscribe(response => {
            response.map(element => {
                if (element.id.contains(sprintNum)) {
                    this.currentSprint += element;
                }
            });
        });
        console.log(this.currentSprint);
    }

}
