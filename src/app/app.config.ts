import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp({
      apiKey: 'AIzaSyD7mzbSL0gpIJvgskSZeXyhBR05WhGbjYU',
      authDomain: 'chess-com-74fe8.firebaseapp.com',
      projectId: 'chess-com-74fe8',
      storageBucket: 'chess-com-74fe8.appspot.com',
      messagingSenderId: '1091450637777',
      appId: '1:1091450637777:web:4ef2310c70b95f158124f0',
      measurementId: 'G-9L9966TQNH',
    })),
    provideAuth(() => getAuth())
  ],
};

