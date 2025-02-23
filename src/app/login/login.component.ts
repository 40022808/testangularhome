import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  username: string = '';
  email: string = '';
  password: string = '';

  usernameError: boolean = false;
  emailError: boolean = false;
  passwordError: boolean = false;
  loginError: boolean = false;

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
    this.router.navigate([this.currentLang, 'login']);
  }

  login() {
    this.resetErrors();
  
    if (this.username.trim() === '') {
      this.usernameError = true;
    } else if (this.email.trim() === '') {
      this.emailError = true;
    } 
    else if (this.password.trim() === '') {
      this.passwordError = true;
    } else {
      const formData = {
        email: this.email,
        password: this.password
      };
  
      this.apiService.loginUser(this.currentLang, formData).subscribe(
        response => {
          console.log('User logged in successfully', response);
          localStorage.setItem('userToken', response.token);
          console.log('Token stored:', localStorage.getItem('userToken'));
          this.router.navigate([this.currentLang, 'user']);
        },
        error => {
          this.loginError = true;
        }
      );
    }
  }
  

  resetErrors() {
    this.usernameError = false;
    this.emailError = false;
    this.passwordError = false;
    this.loginError = false;
  }
}
