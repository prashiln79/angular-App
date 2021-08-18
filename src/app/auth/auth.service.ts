import { Injectable } from '@angular/core';
import { GoogleApiService, GoogleAuthService } from 'ng-gapi';
import GoogleUser = gapi.auth2.GoogleUser;


@Injectable()
export class AuthService {


    loggedIn: boolean;
    token:string;
    public static SESSION_STORAGE_KEY: string = 'accessToken';
    public static USER: string = 'user';
    public user;

    constructor(private googleAuth: GoogleAuthService,gapiService: GoogleApiService) {
        this.user = JSON.parse(localStorage.getItem(AuthService.USER)) || null;
        if(this.user){
            this.loggedIn = (this.user != null);
            this.token = this.user.authToken;
        }
        gapiService.onLoad().subscribe(()=> {
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
        localStorage.setItem( AuthService.SESSION_STORAGE_KEY, res.getAuthResponse().access_token);
        localStorage.setItem( AuthService.USER, JSON.stringify(res.getBasicProfile()));
        this.user       = res.getBasicProfile();
        this.loggedIn   = (this.user != null);
    }


    signOut(): void {
        this.googleAuth.getAuth().subscribe((auth) => {
            try {
                auth.signOut();
            } catch (e) {
                console.error(e);
            }
            this.clearAuthDetails();
        });
    }

    clearAuthDetails(){
        localStorage.clear();
        this.user = null;
        this.loggedIn  = false;
    }

}