import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
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
  passwordMinError: boolean = false;
  passwordMaxError: boolean = false;
  registerError: boolean = false;

  currentLang = 'en';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private translate: TranslateService
  ) {
    this.route.params.subscribe(params => {
      const lang = params['lang'];
      if (lang) {
        this.currentLang = lang;
        this.translate.use(lang);
      }
    });
  }

  ngOnInit() {
    this.router.navigate([this.currentLang, 'register']);
  }

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
      } else if (this.password.length < 6) {
        this.passwordMinError = true;
      } else if (this.password.length > 10) {
        this.passwordMaxError = true;
      } else if (this.password !== this.confirmPassword) {
        this.passwordError = true;
      } else if (this.containsPunctuation(this.password)) {
        this.passwordFormatError = true;
      } else {
        this.registerUser();
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
    this.passwordMinError = false;
    this.passwordMaxError = false;
    this.registerError = false;

  }

  isEmailValid(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  containsPunctuation(password: string): boolean {
    const punctuationPattern = /[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/;
    return punctuationPattern.test(password);
  }

  registerUser() {
    const formData = {
      name: this.username,
      email: this.email,
      password: this.password,
      password_confirmation: this.confirmPassword
    };

    this.apiService.registerUser(this.currentLang, formData).subscribe(
      response => {
        console.log('User registered successfully', response);
        this.router.navigate([this.currentLang, 'login']);
      },
      error => {
        console.error('Registration error', error);
        this.registerError = true;
        
      }
    );
  }
}


