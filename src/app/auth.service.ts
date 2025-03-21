import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: ApiService) { }

  /*isLoggedIn(): Observable<boolean> {
    const token = localStorage.getItem('userToken');
    if (token == null) {
      return new Observable(observer => observer.next(false));
    }
    return this.verifyToken(token);
  }*/
 
    isLoggedIn(): boolean {
      const token = localStorage.getItem('userToken');
      return token != null; // A simple check for a token's existence
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
