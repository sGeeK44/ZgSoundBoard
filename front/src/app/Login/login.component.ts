import { Component, OnInit, NgZone  } from '@angular/core';
import { AuthService as GoogleAuthService, AppGlobals } from 'angular2-google-login';


@Component({
    selector: 'google-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [GoogleAuthService]
  })
  export class LoginComponent implements OnInit {
    imageURL: string;
    email: string;
    name: string;
    token: string;
  
    constructor(private googleAuthService: GoogleAuthService, private zone: NgZone) { }
  
    ngOnInit(): void {
      AppGlobals.GOOGLE_CLIENT_ID = '862875253512-ets86drnkdbcc8v6ho7478basm0cvap1.apps.googleusercontent.com';
      //Fake authent to counter issue in login plugin
      this.googleAuthenticate()
    }
    /**
     * Calling Google Authentication service
     */
    googleAuthenticate() {
      this.googleAuthService.authenticateUser((result) => {
        //Using Angular2 Zone dependency to manage the scope of variables
        this.zone.run(() => {
          this.getData();
        });
      });
    }
  
    /**
     * Getting data from browser's local storage
     */
    getData() {
      this.token = localStorage.getItem('token');
      this.imageURL = localStorage.getItem('image');
      this.name = localStorage.getItem('name');
      this.email = localStorage.getItem('email');
    }
  
    /**
     * Logout user and calls function to clear the localstorage
     */
    logout() {
      let scopeReference = this;
      this.googleAuthService.userLogout(function () {
        scopeReference.clearLocalStorage();
      });
    }
  
    /**
     * Clearing Localstorage of browser
     */
    clearLocalStorage() {
      localStorage.removeItem('token');
      localStorage.removeItem('image');
      localStorage.removeItem('name');
      localStorage.removeItem('email');
    }
  }