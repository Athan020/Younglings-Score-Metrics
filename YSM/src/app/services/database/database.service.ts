import { AngularFireAuth } from 'angularfire2/Auth';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class DatabaseService {
    teamHighestSprint: number;
    users: Observable<any>;
    teams: Observable<any>;
    sprints: Observable<any>;
    currentSprint: Observable<any>;
    poAverageHappiness;
    role;
    highestSprintNum;
    poComment: string;
    currentLatestSprintObject;

    constructor(private afStore: AngularFirestore, private afAuth: AngularFireAuth) {
        this.users = afStore.collection('users').valueChanges();
        this.teams = afStore.collection('teams').valueChanges();
        this.sprints = afStore.collection('sprints', ref => ref.orderBy('score', 'desc')).snapshotChanges().map(actions => {
            return actions.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
            });
        });
        this.getNumSprints();
        // this.checkSprints();
    }

    createSprint(teamName, sprintNum, points, startDate, endDate) {
        // tslint:disable-next-line:max-line-length
        this.afStore.collection('sprints').doc(teamName + '-' + sprintNum)
            .set({ 'endDate': endDate, 'points': points, 'score': 0, 'startDate': startDate, 'poComment': '', 'burnDownChart': [{ 'date': startDate, 'points': points }], 'open': false, 'ratingsReceived': 0 });
        if (sprintNum > 1) {
            this.afStore.collection('sprints').doc(teamName + '-' + (sprintNum - 1)).update({ 'open': true });
        }
        if (sprintNum > 2) {
            this.afStore.collection('sprints').doc(teamName + '-' + (sprintNum - 2)).update({ 'open': false });
        }
        this.teamHighestSprint++;
    }

    createNewUser(uid: string, role: string, team: string, newTeam: boolean, name: string) {
        if (role === 'manager') {
            this.afStore.firestore.collection('users').add({ 'user': uid, 'role': role, 'name': name });
        } else if (role === 'po') {
            this.afStore.firestore
                .collection('users')
                .add({ 'user': uid, 'role': role, 'team': team, 'name': name });
            this.pushToTeams(team, uid, role);
        } else {
            // tslint:disable-next-line:max-line-length
            this.afStore.firestore
                .collection('users')
                .add({
                    'user': uid,
                    'role': role,
                    'team': team,
                    'name': name
                });
            if (role === 'leader' && newTeam) {
                // tslint:disable-next-line:max-line-length
                this.afStore.firestore
                    .collection('teams')
                    .add({
                        'name': team,
                        'leaders': [uid],
                        'velocity': 0,
                        'totalSprints': 0
                    });
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
        const teams: Observable<any> = this.afStore
            .collection('teams')
            .snapshotChanges()
            .map(actions => {
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


    setCurrentSprint(sprintNum) {
        this.sprints.subscribe(response => {
            response.map(element => {
                if (element.id.contains(sprintNum)) {
                    this.currentSprint += element;
                }
            });
        });
        console.log(this.currentSprint);
    }

    updateRatings(rating, total) {
        const teams: Observable<any> = this.afStore
            .collection('teams')
            .snapshotChanges()
            .map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return { id, ...data };
                });
            });

        let flag = true;
        teams.subscribe(response => {
            response.map(element => {
                if (element.pos.includes(this.afAuth.auth.currentUser.uid) && flag) {
                    const teamRating = element.rating + total;
                    this.afStore.collection('teams').doc(element.id).update({ 'rating': teamRating, 'previousRating': rating });
                    flag = false;
                }
            });
        });
    }
    getNumSprints() {
        const teams = this.afStore.collection('teams', ref => ref.orderBy('totalSprints', 'desc')).valueChanges();
        let flag = true;
        teams.subscribe(response => {
            response.map(element => {
                if (flag) {
                    this.highestSprintNum = element['totalSprints'];
                    flag = false;
                }
            });
        });
    }

    updateRole(uid) {
        const users = this.afStore.collection('users').valueChanges();
        users.subscribe(response => {
            response.map(element => {
                if (element['user'] === uid) {
                    this.role = element['role'];
                }
            });
        });
    }

    calcPoAverageHappiness(uid) {
        this.sprints.subscribe(response => {
            let total = 0;
            let sprints = 0;
            response.map(element => {
                if (element.po === uid) {
                    total += element.poHappiness;
                    sprints++;
                }
            });
            this.poAverageHappiness = Math.round((total / sprints) * 10) / 10;
        });
    }

    editVelocity(velocity: number, teamName: string) {
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
                if (element.name === teamName && flag) {
                    const key = element.id;
                    this.afStore.collection('teams').doc(key).update({ 'velocity': velocity });
                    flag = false;
                }
            });
        });
    }

    editEndDate(endDate: string, teamName: string) {
        const sprints: Observable<any> = this.afStore.collection('sprints').snapshotChanges().map(actions => {
            return actions.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
            });
        });

        let flag = true;
        const teamId = teamName + '-' + (this.teamHighestSprint + 1);
        const prevSprintId = teamName + '-' + this.teamHighestSprint;

        sprints.subscribe(response => {
            response.map(element => {
                if (element.id === teamId && flag) {
                    const key = element.id;
                    this.afStore.collection('sprints').doc(key).update({ 'endDate': endDate, 'open': true });
                    this.afStore.collection('sprints').doc(prevSprintId).update({ 'open': false });
                    flag = false;
                }
            });
        });


        const teams: Observable<any> = this.afStore.collection('teams').snapshotChanges().map(actions => {
            return actions.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
            });
        });

        let newFlag = true;
        let totalSprints = 0;
        teams.subscribe(response => {
            response.map(element => {
                if (element.name === teamName && newFlag) {
                    totalSprints = element.totalSprints;
                    totalSprints++;
                    this.afStore.collection('teams').doc(element.id).update({ 'totalSprints': totalSprints });
                    this.removeTeamFromUsers(teamName);
                    newFlag = false;
                }
            });
        });
    }

    getTeamSprint(teamName) {
        const teams = this.afStore.collection('teams', ref => ref.orderBy('totalSprints', 'desc')).valueChanges();
        this.teamHighestSprint = 0;
        teams.subscribe(response => {
            response.map(element => {
                if (element['name'] === teamName) {
                    this.teamHighestSprint = element['totalSprints'];
                }
            });
        });
    }

    getLatestPoComment(team: string) {
        const teams = this.afStore.collection('teams', ref => ref.orderBy('totalSprints', 'desc')).valueChanges();
        this.teamHighestSprint = 0;
        teams.subscribe(response => {
            response.map(element => {
                if (element['name'] === team) {
                    this.teamHighestSprint = element['totalSprints'];
                    const sprint = this.afStore.collection('sprints').doc(team + '-' + this.teamHighestSprint).valueChanges();
                    sprint.subscribe(res => {
                        if (res['poComment'] !== null) {
                            this.poComment = res['poComment'];
                        }
                    });
                }
            });
        });
    }

    rateTeam(name: string, rating: number) {
        this.getTeamSprint(name);
        const teams: Observable<any> = this.afStore.collection('teams').snapshotChanges().map(actions => {
            return actions.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
            });
        });
        const users: Observable<any> = this.afStore.collection('users').snapshotChanges().map(actions => {
            return actions.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
            });
        });
        const sprints: Observable<any> = this.afStore.collection('sprints').snapshotChanges().map(actions => {
            return actions.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
            });
        });

        let flag = true;
        teams.subscribe(response => {
            response.map(element => {
                if (element.name === name) {
                    sprints.subscribe(r => {
                        r.map(el => {
                            if (el.id === (element.name + '-' + this.teamHighestSprint) && flag) {
                                const updatedRating = el.score + rating;
                                const totalRatings = el.ratingsReceived + 1;
                                // tslint:disable-next-line:max-line-length
                                this.afStore.collection('sprints').doc(element.name + '-' + this.teamHighestSprint).update({ 'score': updatedRating, 'ratingsReceived': totalRatings });
                                flag = false;
                            }
                        });
                    });
                    let innerFlag = true;
                    users.subscribe(res => {
                        res.map(e => {
                            if (e.user === this.afAuth.auth.currentUser.uid && innerFlag) {
                                const ratedTeams = e.teamsRated;
                                ratedTeams.push(element.name);
                                this.afStore.collection('users').doc(e.id).update({ teamsRated: ratedTeams });
                                innerFlag = false;
                            }
                        });
                    });
                }
            });
        });
    }

    removeTeamFromUsers(teamName) {
        const users: Observable<any> = this.afStore.collection('users').snapshotChanges().map(actions => {
            return actions.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
            });
        });
        users.subscribe(response => {
            response.map(element => {
                if (element.teamsRated !== undefined) {
                    const arr = [];
                    element.teamsRated.forEach(el => {
                        if (el !== teamName) {
                            arr.push(el);
                        }
                    });
                    this.afStore.collection('users').doc(element.id).update({ teamsRated: arr });
                }
            });
        });

    }

    getLatestSprintObject(teamName, sprints: number) {
        const teamId = teamName + '-' + (sprints + 1);
        return this.afStore.collection('sprints').doc(teamId).valueChanges();
    }

    pushPointsToDB(teamName, burnedDownArray) {
        const teamId = teamName + '-' + (this.teamHighestSprint + 1);
        this.afStore.collection('sprints').doc(teamId)
            // .collection('burn-down-chart').doc('day' + (this.teamHighestSprint + 1))
            .update({ 'burnDownChart': burnedDownArray });
    }
}
