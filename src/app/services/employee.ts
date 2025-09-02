import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Employee {
  constructor(private http: HttpClient) {}

  onLogin(obj: any) {
    return this.http.post('https://freeapi.miniprojectideas.com/api/EmployeeLeave/Login', obj);
  }
}
