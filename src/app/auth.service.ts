import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInn = false;
  constructor(private apiService: ApiService) { }

  isLoggedIn(): Observable<boolean> {
    const token = localStorage.getItem('userToken');
    if (!token) {
      return new Observable(observer => observer.next(false));
    }
    return this.verifyToken(token);
  }
  
  

  verifyToken(token: string): Observable<boolean> {
    return new Observable(observer => {
      this.apiService.verifyToken(token).subscribe(
        response => {
          observer.next(response.isValid);
        },
        error => {
          console.error('Token verification error', error);
          observer.next(false);
        }
      );
    });
  }
  
}
