import { Component } from '@angular/core';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrl: './service.component.css',

})
export class ServiceComponent {
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
   
    return day !== 0 && day !== 6;
  };

  selected() {
    throw new Error('Method not implemented.');
  }

}
