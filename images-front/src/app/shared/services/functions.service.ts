import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Friend } from '../model/Friend';
import {Comment} from '../model/Comment'

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  readonly functionURL: string = "https://openfaas.adriancamachofaas.ml/function/"

  readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "http://127.0.0.1:4200"})
  };

  constructor(private http: HttpClient) { }

  pepareImage(image: File): Observable<any> {

    const formData = new FormData();
    formData.append('image', image);

    return this.http.post(this.functionURL + 'prepare-image', formData,  {observe: 'response', responseType: 'blob'});
  }

  filterImage(fucntion_name: string, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);

    return this.http.post(this.functionURL + fucntion_name, formData,  {observe: 'response', responseType: 'blob'});
  }

  getFriends(body:any): Observable<Friend[]>{
    return this.http.post<Friend[]>(this.functionURL + 'get-friends/', body, this.httpOptions);
  }

  getComments(body: any): Observable<Comment[]>{
    return this.http.post<Comment[]>(this.functionURL + 'get-comments/', body, this.httpOptions);
  }

  postComment(body: any): Observable<Comment>{
    return this.http.post<Comment>(this.functionURL + 'post-comment/', body);
  }

}
