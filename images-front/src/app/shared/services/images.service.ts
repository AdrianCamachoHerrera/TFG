import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Image } from '../model/Image';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  readonly imageURL: string = "https://openfaas.adriancamachofaas.ml/function/images-ms/"

  readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  uploadImage(image: File, userid: string, isAvatar: boolean, description: string): Observable<Image> {
    
    let params = new HttpParams().set('author', userid).set('isAvatar', isAvatar).set('description', description);
    console.log(image);

    const formData = new FormData();
    formData.append('image', image);

    return this.http.post<Image>(this.imageURL + 'upload?' + params.toString(), formData);
  }

  getImages(userid: string): Observable<string[]> {
    return this.http.get<string[]>(this.imageURL + 'images/' + userid, this.httpOptions);
  }

}
