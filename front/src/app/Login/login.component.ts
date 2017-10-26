import { Component, OnInit, NgZone  } from '@angular/core';
import { GoogleProfile } from './GoogleProfile'
declare var gapi: any;

@Component({
    selector: 'google-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: []
  })
  export class LoginComponent implements OnInit {
    profile: GoogleProfile
    fShowInfo = false;

    constructor(private zone: NgZone) { }
  
    ngOnInit(): void {
        gapi.signin2.render('my-signin2', {    
            'onsuccess': param => this.onSignIn(param),
            'scope': 'profile email',
            'width': 240,
            'height': 50,
            'longtitle': false,
            'theme': 'dark'
        });
    }

    onSignIn(googleUser) {
        this.fShowInfo = true;
        const basic_profile = googleUser.getBasicProfile();
        this.zone.run(() => {
            let id_token = googleUser.getAuthResponse().id_token;
            this.profile = new GoogleProfile(basic_profile);
            
            //How use this token server side https://developers.google.com/identity/sign-in/web/backend-auth
            this.profile.token_id = id_token
        })   
      };

    signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut();
    this.fShowInfo = false;
    }
  }