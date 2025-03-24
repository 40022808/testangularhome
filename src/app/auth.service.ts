import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInn = false;
  constructor(private apiService: ApiService) { }
 
    isLoggedIn(): boolean {
      const token = localStorage.getItem('userToken');
      return token != null; 
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
