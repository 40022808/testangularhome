import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { HttpClient } from '@angular/common/http';
import { BookingService } from '../../booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent {
  // origin: string = ''; 
  // destination: string = ''; 
  // map: any;
  // directionsService: any;
  // directionsRenderer: any;
  selectedDate: any;
  selectedTime: string | null = null;
  bookedDates: any[] = [];
  availableTimes: string[] = [];
  showBookedMessage: boolean = false;
  selectedGender: string | null = null;
  Router: any;
  address: string = 'Budapest, Révay u. 16, 1065';
  

  constructor(private http: HttpClient, private bookingService: BookingService,private router: Router) {
    this.Router = router;
    this.loadBookedDates();
    this.generateAvailableTimes();
  }
  generateAvailableTimes() {
    this.availableTimes = []; 
    for (let hour = 8; hour <= 18; hour++) { 
      const formattedHour = hour.toString().padStart(2, '0') + ':00';
      this.availableTimes.push(formattedHour);
    }
  }

  isDayFullyBooked: boolean = false;

onDateChange(event: any) {
  this.selectedDate = event.value;
  const formattedDate = this.selectedDate.toISOString().split('T')[0];

  
  this.isDayFullyBooked = this.availableTimes.every((time) =>
    this.isDateBooked(formattedDate, time)
  );

  this.checkBooking();
}

onApplyClick() {
  if (this.selectedDate && this.selectedTime && this.selectedGender) {
    const bookingData = {
      date: this.selectedDate.toISOString().split('T')[0], // Formázott dátum
      time: this.selectedTime, // Kiválasztott idő
      gender: this.selectedGender, // Kiválasztott nem
    };

    this.bookingService.storeBooking(bookingData).subscribe(
      (response: any) => {
        console.log('Booking stored:', response);
        this.bookedDates.push({ date: bookingData.date, time: bookingData.time, gender: bookingData.gender });
        this.showBookedMessage = true;
        setTimeout(() => {
          this.showBookedMessage = false;
        }, 5000);
      },
      (error: any) => {
        console.error('Error storing booking:', error);
      }
    );
  } else {
    console.error('Date, time, and gender must be selected!');
  }
}

  checkBooking() {
    if (!this.selectedDate || !this.selectedTime) {
      console.error('Date and time must be selected!');
      return;
    }
  
    const formattedDate = this.selectedDate.toISOString().split('T')[0];
    this.http.get(`http://localhost:8000/api/check-booking?date=${formattedDate}&time=${this.selectedTime}`).subscribe(
      (response: any) => {
        if (response.booked) {
          console.log('A dátum és időpont már le van foglalva!');
        } else {
          console.log('A dátum és időpont szabad!');
        }
      },
      (error) => {
        console.error('Hiba történt:', error);
      }
    );
  }

  storeBooking(date: any) {
    this.bookingService.storeBooking(date).subscribe(
      response => {
        console.log('Dátum eltárolva:', response);
        this.loadBookedDates();
        this.showBookedMessage = true;
        setTimeout(() => {
          this.showBookedMessage = false;
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
        this.bookedDates = response.bookings; 
      },
      (error) => {
        console.error('Hiba történt:', error);
      }
    );
  }

  isDateBooked(date: string, time: string): boolean {
    if (!date || !time) {
      return false;
    }
    return this.bookedDates.some(
      (booking) => booking.date === date && booking.time === time
    );
  }

  myFilter = (d: Date | null): boolean => {
    const date = d || new Date();
    const day = date.getDay();
    const formattedDate = date.toISOString().split('T')[0];
  
    // A hétvége kizárása (szombat és vasárnap)
    if (day === 0 || day === 6) {
      return false;
    }
  
    // Ellenőrizd, hogy van-e szabad időpont az adott napra
    const allTimesBooked = this.availableTimes.every((time) =>
      this.isDateBooked(formattedDate, time)
    );
  
    return !allTimesBooked; // Csak akkor engedélyezett, ha van szabad időpont
  };
  onTimeSelect(event: MatSelectChange) {
    this.selectedTime = event.value;
    console.log('Selected time:', this.selectedTime);
  }
  navigateToHome() {
    this.router.navigate(['/']); // Navigálás a kezdőlapra
  }
  navigateToWebshop() {
    this.router.navigate(['/webshop']); // Navigálás a webshop oldalra
  }
  openGoogleMaps() {
    const encodedAddress = encodeURIComponent(this.address);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(googleMapsUrl, '_blank'); // Új lapon nyitja meg a Google Maps-et
  }
  
}

