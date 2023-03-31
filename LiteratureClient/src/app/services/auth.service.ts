import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BaseUrl:string = "http://localhost:5000/";

  constructor() { }

  registerUSer(email: string, password: string, username: string) {
    console.log(email)
    console.log(password)
    console.log(username)

  }
}
