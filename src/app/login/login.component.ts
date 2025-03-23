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

  
  emailError: boolean = false;
  passwordError: boolean = false;
  loginError: boolean = false;

  loading: boolean = false;

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
    
  }

  login() {
    this.resetErrors();
  
    if (this.email.trim() === '') {
      this.emailError = true;
    } 
    else if (this.password.trim() === '') {
      this.passwordError = true;
    } 
    else {
      this.loading = true;
  
      const formData = {
        email: this.email,
        password: this.password
      };
  
      this.apiService.loginUser(this.currentLang, formData).subscribe(
        response => {
          localStorage.setItem('userToken', response.token);
  
          const redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || `${this.currentLang}/user`;
          this.router.navigateByUrl(redirectUrl);
  
          this.loading = false;
        },
        error => {
          this.loading = false;
          this.loginError = true;
        }
      );
    }
  }
  

  resetErrors() {
    this.emailError = false;
    this.passwordError = false;
    this.loginError = false;
  }
}
