import { Injectable } from '@angular/core';
import { User, UserDetails, updatedUserData } from '../interfaces/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})


export class UserService {
  resetPassword(resetPassword: any) {
    throw new Error('Method not implemented.');
  }
  apiUrl = 'http://localhost:4700/user';
  checkUserDetailsUrl = `${this.apiUrl}/checkUserDetails`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUsers(): Observable<User[]> {
    const token = localStorage.getItem('token') as string;
    return this.http.get<User[]>('http://localhost:4700/user/', {
      headers: {
        'Content-type': 'application/json',
        token: token,
      },
    });
  }


  checkDetails(): Observable<string> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': token
    });

    return this.http.get<any>(this.checkUserDetailsUrl, { headers }).pipe(map(data => data.info.role));
  }


updateUserById(updatedUser:updatedUserData): Observable<any> {
  return this.authService.getUserDetails().pipe(
    switchMap((user) => {
      console.log(user.userId);
      let userId=user.userId
      const token = localStorage.getItem('token') || '';
      console.log(token);

      const url = `http://localhost:4700/user/update/${userId}`;

        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          token: token,
        });


        return this.http.put(url, updatedUser, { headers });
      })
    );
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`http://localhost:4700/user/delete/${userId}`);
  }




  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:4700/products/all', {
      headers: {
        'Content-type': 'application/json',
      },
    });
  }

}
