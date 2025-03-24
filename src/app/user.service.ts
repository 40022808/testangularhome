import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api/userRole'; // Laravel API endpoint

  constructor(private http: HttpClient) {}

  getUserRole(): Observable<string> {
    return this.http.get<{ role: string }>(`${this.apiUrl}/role`).pipe(
      map((response) => response.role) // Extract the role from the response
    );
  }
}
