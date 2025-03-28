import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { HttpClient } from '@angular/common/http';
import { BookingService } from '../../booking.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DateFilterFn } from '@angular/material/datepicker';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  selectedDate: any;
  selectedTime: string | null = null;
  bookedDates: any[] = [];
  availableTimes: string[] = [];
  showBookedMessage: boolean = false;
  selectedGender: string | null = null;
  isDayFullyBooked: boolean = false;
  currentLang: string = 'en';


  myFilter!: DateFilterFn<any>;
  email: any;

  constructor(
    private http: HttpClient,
    private bookingService: BookingService,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.currentLang = params['lang'] || 'en';
      this.translate.use(this.currentLang); // Nyelv beállítása
    });

    this.loadBookedDates(); // Lefoglalt időpontok betöltése
    this.generateAvailableTimes(); // Elérhető időpontok generálása
  }

  generateAvailableTimes() {
    this.availableTimes = [];
    for (let hour = 8; hour <= 18; hour++) {
      const formattedHour = hour.toString().padStart(2, '0') + ':00';
      this.availableTimes.push(formattedHour);
    }
  }

  onDateChange(event: any) {
    this.selectedDate = event.value;
    const formattedDate = this.selectedDate.toISOString().split('T')[0];

    this.isDayFullyBooked = this.availableTimes.every((time) =>
      this.isDateBooked(formattedDate, time)
    );

    this.checkBooking();
  }

  onApplyClick() {
    if (this.selectedDate && this.selectedTime && this.selectedGender && this.email) {
      const bookingData = {
        date: this.selectedDate.toISOString().split('T')[0],
        time: this.selectedTime,
        gender: this.selectedGender,
        email: this.email,
      };
  
      this.bookingService.storeBooking(bookingData).subscribe(
        (response: any) => {
          if (response.success) {
            console.log('Booking stored:', response);
            this.bookedDates.push({
              date: bookingData.date,
              time: bookingData.time,
              gender: bookingData.gender,
            });
            this.showBookedMessage = true;
            setTimeout(() => {
              this.showBookedMessage = false;
            }, 5000);
          }
        },
        (error: any) => {
          console.error('Error storing booking:', error);
          if (error.error && error.error.message) {
            alert(error.error.message); // Megjeleníti a backend által küldött hibaüzenetet
          }
        }
      );
    } else {
      console.error('All fields must be filled out!');
    }
  }
  checkBooking() {
    if (!this.selectedDate || !this.selectedTime) {
      console.error('Date and time must be selected!');
      return;
    }

    const formattedDate = this.selectedDate.toISOString().split('T')[0];
    this.http
      .get(
        `http://localhost:8000/api/check-booking?date=${formattedDate}&time=${this.selectedTime}`
      )
      .subscribe(
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
  loadBookedDates() {
    this.http
      .get('http://localhost:8000/api/check-booking/booked-dates')
      .subscribe(
        (response: any) => {
          this.bookedDates = response.bookings; // Lefoglalt időpontok mentése
          console.log('Booked dates loaded:', this.bookedDates);
        },
        (error) => {
          console.error('Hiba történt a foglalások betöltésekor:', error);
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
  onTimeSelect(event: MatSelectChange) {
    this.selectedTime = event.value;
    console.log('Selected time:', this.selectedTime);
  }
  canBook(): boolean {
    return !!this.selectedDate && !!this.selectedTime && !!this.selectedGender;
  }
}