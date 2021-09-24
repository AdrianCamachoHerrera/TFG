import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  readonly userURL: string = "https://openfaas.adriancamachofaas.ml/function/users-ms/"

  readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.userURL + 'login', {
      username,
      password
    }, this.httpOptions);
  }

  register(username: string, name: string, password: string): Observable<any>{
    return this.http.post(this.userURL + 'register', {
      username,
      name,
      password
    }, this.httpOptions);
  }

  changuePassword(body:any): Observable<any>{
    return this.http.post(this.userURL + 'change-password', body, this.httpOptions);
  }

  find(userid: string): Observable<User>{
    return this.http.get<User>(this.userURL + 'user/' + userid, this.httpOptions);
  }

  patch(userid: string, body: any): Observable<User>{
    return this.http.patch<User>(this.userURL + 'user/' + userid, body, this.httpOptions);
  }

}
