import { Component, OnInit, NgZone  } from '@angular/core';
import { GoogleProfile } from '../../business/UserProfile/GoogleProfile';
import { UserProfileService } from '../../business/UserProfile/UserProfile.service';
import { UnknownProfile } from '../../business/UserProfile/UnknownProfile';
declare var gapi: any;

@Component({
    selector: 'app-google-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [ UserProfileService ]
  })
  export class LoginComponent implements OnInit {
    profile: GoogleProfile;
    logged = false;

    constructor(private zone: NgZone, private userProfileService: UserProfileService) { }

    ngOnInit(): void {
        gapi.signin2.render('my-signin2', {
            'onsuccess': param => this.onSignIn(param),
            'theme': 'dark'
        });
    }
    onSignIn(googleUser) {
        this.zone.run(() => {
            const basic_profile = googleUser.getBasicProfile();
            const id_token = googleUser.getAuthResponse().id_token;
            this.profile = new GoogleProfile(basic_profile, id_token);
            this.userProfileService.Set(this.profile);
            this.logged = true;
        });
    }

    signOut() {
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut();
        this.userProfileService.Set(new UnknownProfile());
        this.logged = false;
    }
  }
