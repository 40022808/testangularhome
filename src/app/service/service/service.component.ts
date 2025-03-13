import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent {
  selectedDate: any;
  baseUrl: string = 'http://127.0.0.1:8000/bookings'; 
  bookedDates: any[] = [];

  constructor(private http: HttpClient) {
    this.loadBookedDates();
  }

  onDateChange(event: any) {
    this.selectedDate = event.value;
    this.checkBooking(); 
  }
  onApplyClick() {
    if (this.selectedDate) {
      this.checkBooking();
    } else {
      console.error('No date selected');
    }
  }

  checkBooking() {
    this.http.get(`${this.baseUrl}?date=${this.selectedDate}`).subscribe(
      (response: any) => {
        if (response.booked) {
          console.log('A dátum már le van foglalva!');
        } else {
          console.log('A dátum szabad!');
          this.storeBooking(this.selectedDate);
        }
      },
      error => {
        console.error('Hiba történt:', error);
      }
    );
  }

  storeBooking(date: any) {
    this.http.post(`${this.baseUrl}/store`, { date }).subscribe(
      response => {
        console.log('Dátum eltárolva:', response);
        this.loadBookedDates();
      },
      error => {
        console.error('Hiba történt:', error);
      }
    );
  }

  loadBookedDates() {
    this.http.get(`${this.baseUrl}/booked-dates`).subscribe(
      (response: any) => {
        this.bookedDates = response.dates;
      },
      error => {
        console.error('Hiba történt:', error);
      }
    );
  }

  isDateBooked(date: any): boolean {
    return this.bookedDates.includes(date);
  }
  myFilter = (d: Date | null): boolean => {
    const date = d || new Date();
    return !this.isDateBooked(date.toISOString().split('T')[0]);
  }
}