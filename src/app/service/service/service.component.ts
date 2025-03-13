import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookingService } from '../../booking.service'; // Importáld a BookingService-t

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent {
  selectedDate: any;
  bookedDates: any[] = [];
  showBookedMessage: boolean = false; // Új változó az üzenet megjelenítéséhez

  constructor(private http: HttpClient, private bookingService: BookingService) {
    this.loadBookedDates();
  }

  onDateChange(event: any) {
    this.selectedDate = event.value;
    this.checkBooking();
  }

  onApplyClick() {
    if (this.selectedDate) {
      this.bookingService.storeBooking(this.selectedDate).subscribe((response: any) => {
        console.log('Booking stored:', response);
        this.bookedDates.push(this.selectedDate);
        this.showBookedMessage = true; // Üzenet megjelenítése
        setTimeout(() => {
          this.showBookedMessage = false; // Üzenet eltüntetése 5 másodperc után
        }, 5000);
      }, (error: any) => {
        console.error('Error storing booking:', error);
      });
    }
  }

  checkBooking() {
    this.http.get(`http://localhost:8000/api/check-booking?date=${this.selectedDate}`).subscribe(
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
    this.bookingService.storeBooking(date).subscribe(
      response => {
        console.log('Dátum eltárolva:', response);
        this.loadBookedDates();
        this.showBookedMessage = true; // Üzenet megjelenítése
        setTimeout(() => {
          this.showBookedMessage = false; // Üzenet eltüntetése 5 másodperc után
        }, 5000);
      },
      error => {
        console.error('Hiba történt:', error);
      }
    );
  }

  loadBookedDates() {
    this.http.get('http://localhost:8000/api/check-booking/booked-dates').subscribe(
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
    const day = date.getDay();
    // A hétvége kizárása (szombat és vasárnap)
    if (day === 0 || day === 6) {
      return false;
    }
    return !this.isDateBooked(date.toISOString().split('T')[0]);
  }
}