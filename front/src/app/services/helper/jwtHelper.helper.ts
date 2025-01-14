// services/jwt-helper.service.ts
import { Injectable } from '@angular/core';
import * as jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtHelperService {

  decodeToken(token: string): any {
    try {
      return jwtDecode.jwtDecode(token);
    } catch(e) {
      return null;
    }
  }

  isAdmin(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const decodedToken = this.decodeToken(token);
    if (!decodedToken) return false;

    return decodedToken.roles?.includes('ROLE_ADMIN') || false;
  }
}
