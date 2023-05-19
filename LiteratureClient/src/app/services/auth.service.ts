import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BaseUrl:string = "https://localhost:5000/";
  private userPayload:any;

  constructor(private http: HttpClient, private router:Router) { 
    this.userPayload = this.decodeUserToken();
  }

  private userName$ = new BehaviorSubject<string>(""); 
  private userId$ = new BehaviorSubject<number>(0); 


  registerUSer(user:any) {
    return this.http.post<any>(`${this.BaseUrl}Users/register`, user);
  }

  login(loginObj:any) {
    return this.http.post<any>(`${this.BaseUrl}Users/authenticate`, loginObj);
  }

  signOut(){
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  setToken(token:string){
    localStorage.setItem('token', token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  isNotLoggedIn() : boolean {
    return !localStorage.getItem('token');
  }

  decodeUserToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken();
    console.log(jwtHelper.decodeToken(token!))
    return jwtHelper.decodeToken(token!);
  }

  getLoggedInUserName(){
    if(this.userPayload.username)
    return this.userPayload.username;
  }

  getLoggedInUserId(){
    if(this.userPayload === null){
      window.location.reload();
    }
    if(this.userPayload.id)
    return this.userPayload.id;
  }


  getUserNameFromStore(){
      return this.userName$.asObservable();
  }
  setUserNameFromStore(username:string){
     this.userName$.next(username);
  }

  getUserIdFromStore(){
      return this.userId$.asObservable();
  }
  setUserIdFromStore(userId:number){
      this.userId$.next(userId);
  }
}
