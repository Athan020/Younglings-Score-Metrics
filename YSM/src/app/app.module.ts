import { DatabaseService } from './services/database/database.service';
import { AuthguardService } from './services/authguard/authguard.service';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AuthenticationService } from './services/authentication/authentication.service';
import { AngularFirestore } from 'angularfire2/firestore';

export const firebaseConfig = {
  apiKey: 'AIzaSyAMd8N_5k9klj1df29Lr_xihZKXYagcvbI',
  authDomain: 'younglings-score-metrics.firebaseapp.com',
  databaseURL: 'https://younglings-score-metrics.firebaseio.com',
  projectId: 'younglings-score-metrics',
  storageBucket: 'younglings-score-metrics.appspot.com',
  messagingSenderId: '352622976784'
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
  ],
  providers: [AngularFireAuth, AuthguardService, AuthenticationService, AngularFirestore, DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
