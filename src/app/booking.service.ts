import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:8000/api/check-booking/store'; // Cseréld le a saját API végpontodra

  constructor(private http: HttpClient) {}

  storeBooking(date: string): Observable<any> {
    return this.http.post(this.apiUrl, { date });
  }
}