import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceProjectService {
  private url = 'http://localhost:2400/project/';
  constructor(private httpClient: HttpClient) { }


  getAllProject() {
    return this.httpClient.get(this.url + 'allProjects');
  }





}
