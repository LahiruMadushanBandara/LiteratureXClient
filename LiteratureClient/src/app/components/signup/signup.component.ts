import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;

  constructor(private formBuilder:FormBuilder, private authService:AuthService, private router: Router) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      username:['',Validators.required],
      password:['',Validators.required],
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      email:['',Validators.required]
    })
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      this.authService.registerUSer(this.signUpForm.value)
        .subscribe({
          next: (res: any) => {
            console.log(res)
            alert(res.message)
            this.signUpForm.reset();
            this.router.navigate(['login']);
          },
          error: (err: any) => {
            alert(err.error.message)
          }
        });
    }
    else {
      this.validateAllFormFields(this.signUpForm)
    }
  }

  private validateAllFormFields(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(fied => {
      const control = formGroup.get(fied);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf: true});
      }
      else if(control instanceof FormGroup){
        this.validateAllFormFields(control);
      }
    })
  }

}
