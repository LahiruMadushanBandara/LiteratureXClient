import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BaseUrl:string = "https://localhost:5000/";

  constructor(private http: HttpClient, private router:Router) { }

  registerUSer(user:any) {
    console.log(user)
    return this.http.post<any>(`${this.BaseUrl}Users/register`, user );
  }

  login(loginObj:any) {
    return this.http.post<any>(`${this.BaseUrl}Users/authenticate`, loginObj );
  }

  signOut(){
    localStorage.removeItem('token');
    this.router.navigate(['login'])
  }

  setToken(token:string){
    localStorage.setItem('token', token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  isLoggedIn() : boolean {
    return !localStorage.getItem('token');
  }
}
