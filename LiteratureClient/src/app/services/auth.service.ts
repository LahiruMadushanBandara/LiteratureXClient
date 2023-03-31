import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  registerUSer(email: string, password: string, username: string) {
    console.log(email)
    console.log(password)
    console.log(username)

  }
}
