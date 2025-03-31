import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  getBookings(role: string, email: any) {
    throw new Error('Method not implemented.');
  }
  private baseUrl: string = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  registerUser(lang: string, formData: any): Observable<any> {
    const url = `http://localhost:8000/api/${lang}/registers`;
    return this.http.post(`${this.baseUrl}/api/${lang}/register`, formData);
  }

  loginUser(lang: string, formData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/${lang}/login`, formData);
  }

  verifyToken(token: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/verify-token`, { token });
  }

  getUserInfo(token: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  logoutUser(lang: string): Observable<any> {
    const token = localStorage.getItem('userToken');
    return this.http.post(
      `${this.baseUrl}/api/${lang}/logout`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  upgradeToAdmin(useremail: string): Observable<any> {
    const token = localStorage.getItem('userToken');
    return this.http.put(
      `${this.baseUrl}/api/users/${useremail}/upgrade`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  downgradeFromAdmin(useremail: string): Observable<any> {
    const token = localStorage.getItem('userToken');
    return this.http.put(
      `${this.baseUrl}/api/users/${useremail}/downgrade`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  updateUserName(lang: string, formData: any): Observable<any> {
    const token = localStorage.getItem('userToken');
    return this.http.post(
      `${this.baseUrl}/api/${lang}/update-username`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  updatePassword(lang: string, formData: any): Observable<any> {
    const token = localStorage.getItem('userToken');
    return this.http.post(
      `${this.baseUrl}/api/${lang}/update-password`,
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  checkOldPassword(formData: any): Observable<any> {
    const token = localStorage.getItem('userToken');
    return this.http.post(`${this.baseUrl}/api/checkoldpassword`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  getUserByEmail(email: string, token: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/getUserByEmail/${email}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  getUserBookings(role: string, email: string) {
    return this.http.get(
      `http://localhost:8000/api/bookings?role=${role}&email=${email}`
    );
  }
  storeBooking(bookingData: any) {
    return this.http.post(
      `http://localhost:8000/api/store-booking`,
      bookingData
    );
  }

  getUserCart(role: string, email: string): Observable<any> {
    const token = localStorage.getItem('userToken');
    return this.http.get(
      `http://127.0.0.1:8000/api/get-user-cart?role=${role}&email=${email}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  getAllBookings(): Observable<any> {
    const role = localStorage.getItem('userRole'); // A szerepkör betöltése
    const token = localStorage.getItem('userToken');
    return this.http.get(
      `http://127.0.0.1:8000/api/all-bookings?role=${role}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
}
