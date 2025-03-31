import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  currentLang: string = 'en';
  userInfo: any = null;
  userRole: string = '';
  userError: boolean = false;
  userloginError: boolean = false;
  logoutError: boolean = false;
  currentStep: number = 1;
  giveEmail: string = '';
  depriveEmail: string = '';
  UsernameDiv: boolean = false;
  PasswordDiv: boolean = false;
  newUsername: string = '';
  newPassword: string = '';
  oldPassword: string = '';
  confirmPassword: string = '';
  usernameError: boolean = false;
  user_div_password_div_input_number: number = 1;
  oldPasswordError: boolean = false;
  oldPasswordincorrectError: boolean = false;
  

  passwordError: boolean = false;
  passwordnullError: boolean = false;
  passwordFormatError: boolean = false;
  passwordMinError: boolean = false;
  passwordMaxError: boolean = false;
  apiError: boolean = false;
  passwordSameError: boolean = false;

  PasswordDiv_ok: boolean = false;
  oldpasswordloading: boolean = false;

  userRoleMap: { [key: string]: string } = {
    '0': 'User',
    '1': 'Admin',
    '2': 'Super Admin',
  };
  http: any;
  userBookings: any[] = [];
  isBookingsModalOpen: boolean | undefined;
  allBookings: any[] = [];
  isAllBookingsModalOpen: boolean =false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private translate: TranslateService
  ) {
    this.route.params.subscribe((params) => {
      const lang = params['lang'];
      if (lang) {
        this.currentLang = lang;
        this.translate.use(lang);
      }
    });
  }

  ngOnInit() {
    /* this.router.navigate([this.currentLang, 'user']); */
    this.getUserInfo();
  }

  getUserInfo() {
    const token = localStorage.getItem('userToken');
    if (token) {
      this.apiService.getUserInfo(token).subscribe(
        (response) => {
          this.userInfo = response.userInfo;
          this.userRole = response.userRole;
        },
        (error) => {
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
      (response) => {
        console.log('User logged out successfully', response);
        localStorage.removeItem('userToken');
        this.router.navigate([this.currentLang, 'login']);
      },
      (error) => {
        console.error('Logout error', error);
        this.logoutError = true;
      }
    );
  }

  getUserRoleTranslationKey(role: string): string {
    return this.userRoleMap[role] || 'Unknown';
  }

  giveAdmin() {
    this.apiService.upgradeToAdmin(this.giveEmail).subscribe(
      (response) => {
        console.log('User upgraded to admin successfully', response);
        this.getUserInfo();
        this.currentStep = 4;
      },
      (error) => {
        console.error('Failed to upgrade user to admin', error);
        this.currentStep = 5;
      }
    );
    this.giveEmail = '';
  }

  depriveAdmin() {
    this.apiService.downgradeFromAdmin(this.depriveEmail).subscribe(
      (response) => {
        console.log('User downgraded from admin successfully', response);
        this.getUserInfo();
        this.currentStep = 4;
      },
      (error) => {
        console.error('Failed to downgrade user from admin', error);
        this.currentStep = 5;
      }
    );
    this.depriveEmail = '';
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep = 1;
      this.giveEmail = '';
      this.depriveEmail = '';
    }
  }

  give() {
    this.currentStep = 2;
  }

  deprive() {
    this.currentStep = 3;
  }

  Username() {
    this.UsernameDiv = true;
  }

  changeUsername() {
    if (this.newUsername === '') {
      this.usernameError = true;
    } else {
      const formData = { name: this.newUsername };
      this.apiService.updateUserName('zh', formData).subscribe(
        (response) => {
          console.log('Username updated successfully', response);
          this.UsernameDiv = false;
          this.newUsername = '';
          this.usernameError = false;
          this.getUserInfo();
        },
        (error) => {
          console.error('Failed to update username', error);
        }
      );
    }
  }
  Username_back() {
    this.UsernameDiv = false;
    this.newUsername = '';
    this.usernameError = false;
  }

  changePassword_div() {
    this.PasswordDiv = true;
  }

  PasswordDiv_close() {
    this.PasswordDiv = false;
    this.newPassword = '';
    this.oldPassword = '';
    this.confirmPassword = '';
    this.user_div_password_div_input_number = 1;
    this.oldPasswordError = false;
    this.oldPasswordincorrectError = false;
    this.passwordnullError = false;
    this.passwordMinError = false;
    this.passwordMaxError = false;
    this.passwordError = false;
    this.passwordFormatError = false;
    this.apiError = false;
    this.passwordSameError = false;
    this.PasswordDiv_ok = false;
    this.oldpasswordloading = false;
  }

  PasswordDiv_next() {
    this.oldPasswordError = false;
    this.oldPasswordincorrectError = false;
    if (this.oldPassword === '') {
      this.oldPasswordError = true;
    } else {
      this.oldpasswordloading = true;
      const FormData = { old_password: this.oldPassword };
      this.apiService.checkOldPassword(FormData).subscribe(
        (response) => {
          console.log('Old password checked successfully', response);
          this.oldpasswordloading = false;
          this.user_div_password_div_input_number = 2;
        },
        (error) => {
          console.error('Failed to check old password', error);
          this.oldpasswordloading = false;
          this.oldPasswordincorrectError = true;
        }
      );
    }
  }

  changePassword() {
    this.passwordnullError = false;
    this.passwordMinError = false;
    this.passwordMaxError = false;
    this.passwordError = false;
    this.passwordFormatError = false;
    this.apiError = false;
    this.passwordSameError = false;
    if (this.newPassword.trim() === '') {
      this.passwordnullError = true;
    } else if (this.newPassword.length < 6) {
      this.passwordMinError = true;
    } else if (this.newPassword.length > 10) {
      this.passwordMaxError = true;
    } else if (this.newPassword !== this.confirmPassword) {
      this.passwordError = true;
    } else if (this.containsPunctuation(this.newPassword)) {
      this.passwordFormatError = true;
    } else if (this.newPassword === this.oldPassword) {
      this.passwordSameError = true;
    } else {
      this.changePassword_api();
    }
  }

  containsPunctuation(password: string): boolean {
    const punctuationPattern = /[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/;
    return punctuationPattern.test(password);
  }

  changePassword_api() {
    const formdata = {
      new_password: this.newPassword,
      new_password_confirmation: this.confirmPassword,
    };
    this.apiService.updatePassword('zh', formdata).subscribe(
      (response) => {
        this.PasswordDiv_ok = true;
        console.log('Password updated successfully', response);
      },
      (error) => {
        console.error('Failed to update password', error);
        this.apiError = true;
      }
    );
  }

  addProductPage() {
    this.router.navigate([this.currentLang, 'add-product']);
  }
  loadUserBookings() {
    const email = this.userInfo?.email;
    const role = this.userRole;
  
    if (!email) {
      console.error('User email is not available.');
      return;
    }
  
    this.apiService.getUserBookings(role, email).subscribe(
      (response: any) => {
        if (response.success) {
          // Rendezés dátum és idő szerint
          this.userBookings = response.bookings.sort((a: any, b: any) => {
            const dateA = new Date(`${a.date}T${a.time}`);
            const dateB = new Date(`${b.date}T${b.time}`);
            return dateA.getTime() - dateB.getTime(); // Növekvő sorrend
          });
          console.log('User bookings loaded:', this.userBookings);
        } else {
          console.error('Failed to load bookings:', response.message);
        }
      },
      (error: any) => {
        console.error('Error loading user bookings:', error);
      }
    );
  }
openBookingsModal() {
  this.isBookingsModalOpen = true;
  this.loadUserBookings(); // Foglalások betöltése
}

closeBookingsModal() {
  this.isBookingsModalOpen = false;
}
openAllBookingsModal() {
  this.isAllBookingsModalOpen = true;
  this.loadAllBookings(); // Az összes foglalás betöltése
}

closeAllBookingsModal() {
  this.isAllBookingsModalOpen = false;
}
loadAllBookings() {
  const email = this.userInfo?.email;
  const role = this.userRole;

  if (!email) {
    console.error('User email is not available.');
    return;
  }

  this.apiService.getAllBookings(role, email).subscribe(
    (response: any) => {
      if (response.success) {
        // Rendezés dátum és idő szerint
        this.allBookings = response.bookings.sort((a: any, b: any) => {
          const dateA = new Date(`${a.date}T${a.time}`);
          const dateB = new Date(`${b.date}T${b.time}`);
          return dateA.getTime() - dateB.getTime(); // Növekvő sorrend
        });
        console.log('All bookings loaded:', this.allBookings);
      } else {
        console.error('Failed to load bookings:', response.message);
      }
    },
    (error: any) => {
      console.error('Error loading all bookings:', error);
    }
  );
}
showAllBookedDates() {
  console.log('All booked dates button clicked');
  // Itt adhatsz hozzá logikát, például egy modális ablak megnyitását
  alert('This will show all booked dates.');
}
}
