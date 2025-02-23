import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  currentLang: string = 'en';
  userInfo: any = null;
  userRole: string = '';
  userError: boolean = false;
  userloginError: boolean = false;
  logoutError: boolean = false;

  
  userRoleMap: { [key: string]: string } = {
    '0': 'User',
    '1': 'Admin',
    '2': 'Super Admin'
  };

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
    this.router.navigate([this.currentLang, 'user']);
    this.getUserInfo();
  }

  getUserInfo() {
    const token = localStorage.getItem('userToken');
    if (token) {
      this.apiService.getUserInfo(token).subscribe(
        response => {
          this.userInfo = response.userInfo;
          this.userRole = response.userRole;
        },
        error => {
          console.error('Failed to fetch user information', error);
          this.userError = true;
        }
      );
    } else {
      console.error('No token found, user is not logged in');
      this.userloginError = true;
      this.router.navigate([this.currentLang, 'login']);
    }
  }

  logout() {
    this.apiService.logoutUser(this.currentLang).subscribe(
      response => {
        console.log('User logged out successfully', response);
        localStorage.removeItem('userToken');
        this.router.navigate([this.currentLang, 'login']);
      },
      error => {
        console.error('Logout error', error);
        this.logoutError = true;
      }
    );
  }

  getUserRoleTranslationKey(role: string): string {
    return this.userRoleMap[role] || 'Unknown';
  }
}





