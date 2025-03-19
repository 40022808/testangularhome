import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:8000/api/check-booking/store'; // Helyes URL

  constructor(private http: HttpClient) {}

  storeBooking(bookingData: { date: string; time: string }) {
    return this.http.post(this.apiUrl, bookingData); // Ne adjunk hozzá újabb "/store-booking"-ot
  }
}