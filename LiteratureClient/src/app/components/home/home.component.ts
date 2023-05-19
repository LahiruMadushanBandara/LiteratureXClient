import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public userName:string = "";
  public userId:number = 0;
  public recommendedList:any;
  public IsLoggedIn:boolean = false;

  constructor(private authService:AuthService, private apiService:ApiService) { }

  ngOnInit(): void {
    this.IsLoggedIn = !this.authService.isNotLoggedIn();

    this.authService.getUserIdFromStore()
    .subscribe((val:any)=>{
      let userIdFromToken = this.authService.getLoggedInUserId();
      this.userId = val || userIdFromToken;

      this.apiService.GetRecommendedLiteratures(this.userId).subscribe({
        next:(res:any) => {
          debugger
          this.recommendedList = res.ratings;
          console.log(res);
        }
      })
    })
  }

  signOut(){
    debugger
    this.authService.signOut();
  }

}
