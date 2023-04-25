import { Component, AfterViewInit, OnInit} from '@angular/core';
import { AuthUserService } from './auth-user.service';
import { IsComponentLoadedService } from 'src/app/services/is-component-loaded.service';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements AfterViewInit {

form: FormGroup;

isSignUp:boolean =  false;
isLogIn:boolean =  true;
errorMessage: boolean;

constructor(public authService: AuthUserService, public isComponentLoaded: IsComponentLoadedService, private afAuth: AngularFireAuth) {
  this.form = new FormGroup({
    email: new FormControl ('', [Validators.required, Validators.email]),
    pass: new FormControl('', [Validators.required, this.passValidator]),
    confirmPass: new FormControl('', [this.confirmPass.bind(this)])
  })
  this.errorMessage = false;
}

passValidator(control: AbstractControl): ValidationErrors | null {
  const password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return password.test(control.value) ? null : { invalidPassword: true };
}

confirmPass(control: AbstractControl): ValidationErrors | null {
const originPass = control.parent?.get('pass')?.value;
const confirmPass = control.value;
return (originPass === confirmPass) ? null : { invalidConfirmPass: true };


}

onEmailInput() {
  if (this.isSignUp) {
    console.log(this.form.controls['email'].errors);
  }
}

isInvalid(controlName: string): boolean {
  const control = this.form.controls[controlName];
  return control.invalid && (control.dirty || control.touched);
}


goLogIn() {
  this.isLogIn = true;
  this.isSignUp = false;
}

goSignUp() {
  this.isSignUp = true;
  this.isLogIn = false;
}

ngAfterViewInit() {
this.isComponentLoaded.ShowContent();
}

signIn(email: string, password: string) {
  
this.authService.signIn(email, password).then(() => {
  console.log("Signed in")
}).catch((error) => {
  this.errorMessage = true;
})}

}
