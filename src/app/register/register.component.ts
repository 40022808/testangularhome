import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  currentStep: number = 1;
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  usernameError: boolean = false;
  emailError: boolean = false;
  emailFormatError: boolean = false;
  passwordError: boolean = false;
  passwordnullError: boolean = false;
  passwordFormatError: boolean = false;

  nextStep() {
    this.resetErrors();

    if (this.currentStep === 1) {
      if (this.username.trim() === '') {
        this.usernameError = true;
      } else {
        this.currentStep = 2;
      }
    } 
    else if (this.currentStep === 2) {
      if (this.email.trim() === '') {
        this.emailError = true;
      } else if (!this.isEmailValid(this.email)) {
        this.emailFormatError = true;
      } else {
        this.currentStep = 3;
      }
    } 
    else if (this.currentStep === 3) {
      if (this.password.trim() === '') {
        this.passwordnullError = true;
      }
      else if (this.password !== this.confirmPassword) {
        this.passwordError = true;
      }
      else if (this.containsPunctuation(this.password)) {
        this.passwordFormatError = true;
      } else {

        console.log('name:', this.username);
        console.log('email:', this.email);
        console.log('password:', this.password);
      }
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  resetErrors() {
    this.usernameError = false;
    this.emailError = false;
    this.emailFormatError = false;
    this.passwordError = false;
    this.passwordnullError = false;
    this.passwordFormatError = false;
  }

  isEmailValid(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  containsPunctuation(password: string): boolean {
    const punctuationPattern = /[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/;
    return punctuationPattern.test(password);
  }

  ngOnInit() {
    this.router.navigate([this.currentLang, 'register']);
  }
  
  currentLang = 'en';
  
  constructor(private route: ActivatedRoute, private router: Router, private translate: TranslateService) {
    this.route.params.subscribe(params => {
      const lang = params['lang'];
      if (lang) {
        this.currentLang = lang;
        this.translate.use(lang);
      }
    });
  }
}


