import { Injectable } from '@angular/core';
import {Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from '@angular/fire/auth'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:Auth) {
    
   }

  async signIn(email: string, password: string): Promise<any> {
    try {
      const result = await signInWithEmailAndPassword(this.auth, email, password);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async signUp(email: string, password: string): Promise<any> {
    try {
      const result = await createUserWithEmailAndPassword(this.auth,email, password);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
