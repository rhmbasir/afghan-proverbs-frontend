import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { Routes } from '@angular/router';
import { ProverbListComponent } from './app/components/proverb-list/proverb-list.component';
import { routes } from './app/app.routes';


// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

bootstrapApplication(AppComponent,{
  providers:[provideHttpClient(),
    provideRouter(routes)
  ]
});