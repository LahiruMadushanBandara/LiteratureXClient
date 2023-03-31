import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      username:['',Validators.required],
      password:['',Validators.required],
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      email:['',Validators.required]
    })
  }

  onSubmit(){
    if(this.signUpForm.valid){
      console.log(this.signUpForm.value)
    }
    else{
      console.log("invalid")
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
