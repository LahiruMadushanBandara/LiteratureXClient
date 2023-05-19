import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BaseUrl:string = "https://localhost:5000/";
  constructor( private http: HttpClient, private router:Router ) { }

  GetRecommendedLiteratures(userId:number) {
    return this.http.get<any>(`${this.BaseUrl}Literature/${userId}`);
  }
}
