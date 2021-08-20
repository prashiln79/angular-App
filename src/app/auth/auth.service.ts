import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleApiService, GoogleAuthService } from 'ng-gapi';
import { Observable, Subject } from 'rxjs';
import GoogleUser = gapi.auth2.GoogleUser;


@Injectable({
    providedIn: 'root'
})
export class AuthService {


    loggedIn: boolean = false;
    token: string;
    public static SESSION_STORAGE_KEY: string = 'accessToken';
    public static USER: string = 'user';
    public user;
    public login = new Subject<string>();


    constructor(private googleAuth: GoogleAuthService, gapiService: GoogleApiService) {
        this.user = JSON.parse(localStorage.getItem(AuthService.USER)) || null;
        if (this.user) {
            this.loggedIn = (this.user != null);
            this.token = this.user.authToken;
        }
        gapiService.onLoad().subscribe(() => {
            console.log('enter');
        });
    }

    public getToken(): string {
        let token: string = localStorage.getItem(AuthService.SESSION_STORAGE_KEY);
        if (!token) {
            throw new Error("no token set , authentication required");
        }
        return localStorage.getItem(AuthService.SESSION_STORAGE_KEY);
    }

    public isloggedIn(): boolean {
        return this.loggedIn;
    }

    public getUser(): any {
        return this.user;
    }

    signInWithGoogle(): void {
        this.googleAuth.getAuth().subscribe((auth) => {
            auth.signIn().then(res => this.signInSuccessHandler(res), err => this.signInErrorHandler(err));
        });
    }

    private signInErrorHandler(err) {
        console.warn(err);
    }

    private signInSuccessHandler(res: GoogleUser) {
        if (res['Ts']['RT'] != 'Prashil') {
            this.signOut();
            return;
        }
        localStorage.setItem(AuthService.SESSION_STORAGE_KEY, res.getAuthResponse().access_token);
        localStorage.setItem(AuthService.USER, JSON.stringify(res.getBasicProfile()));
        this.user = res.getBasicProfile();
        this.loggedIn = (this.user != null);
        this.login.next('sign-In');
        window.location.reload();
    }


    signOut(): void {
        this.googleAuth.getAuth().subscribe((auth) => {
            try {
                auth.signOut();
            } catch (e) {
                console.error(e);
            }
            this.clearAuthDetails();
            this.login.next('sign-out');
            window.location.reload();
        });
    }

    clearAuthDetails() {
        localStorage.clear();
        this.user = null;
        this.loggedIn = false;
    }

}


