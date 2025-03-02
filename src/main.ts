import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
<<<<<<< HEAD
import {registerLicense} from '@syncfusion/ej2-base';
import { AppModule } from './app/app.module';

registerLicense('ORg4AjUWIQA/Gnt2V1VVXlJfXm9eX1BfVl5eX1NfX2NfVw==');





=======

import { AppModule } from './app/app.module';

>>>>>>> 033531b (Webshop)
platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true
})
  .catch(err => console.error(err));
