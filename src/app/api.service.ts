import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = 'http://127.0.0.1:8000'; 

  constructor(private http: HttpClient) { }

  registerUser(lang: string, formData: any): Observable<any> {
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
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  logoutUser(lang: string): Observable<any> {
    const token = localStorage.getItem('userToken');
    return this.http.post(`${this.baseUrl}/api/${lang}/logout`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  upgradeToAdmin(userId: string): Observable<any> {
    const token = localStorage.getItem('userToken');
    return this.http.put(`${this.baseUrl}/api/users/${userId}/upgrade`, {},{
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  downgradeFromAdmin( userId: string): Observable<any> {
    const token = localStorage.getItem('userToken');
    return this.http.put(`${this.baseUrl}/api/users/${userId}/downgrade`, {},{
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  updateUserName(lang: string, formData: any): Observable<any> {
    const token = localStorage.getItem('userToken');
    return this.http.post(`${this.baseUrl}/api/${lang}/update-username`, formData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  updatePassword(lang: string, formData: any): Observable<any> {
    const token = localStorage.getItem('userToken');
    return this.http.post(`${this.baseUrl}/api/${lang}/update-password`, formData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  checkOldPassword(formData: any): Observable<any> {
    const token = localStorage.getItem('userToken');
    return this.http.post(`${this.baseUrl}/api/checkoldpassword`, formData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

}
