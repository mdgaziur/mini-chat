import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp({
      projectId: "mini-chat-a5dc3",
      appId: "1:584762020197:web:d46738f071f22f2de8d18c",
      storageBucket: "mini-chat-a5dc3.firebasestorage.app",
      apiKey: "AIzaSyBHZV_XMgJOrad-5GxTyJ6ahl3RzBsBwjs",
      authDomain: "mini-chat-a5dc3.firebaseapp.com",
      messagingSenderId: "584762020197",
      measurementId: "G-MBH0YHZSM6"
    })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())]
};
