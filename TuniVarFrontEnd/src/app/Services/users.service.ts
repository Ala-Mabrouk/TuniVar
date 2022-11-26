import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url = 'http://localhost:2400/user/';
  constructor(private httpClient: HttpClient) { }
  login(crd:any) {
    return this.httpClient.post(this.url + 'login',crd);
  }
  Sigup(user:any){
    return this.httpClient.post(this.url+"signup",user);
  }
}
