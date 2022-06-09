import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ReturnData } from '../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  searchGIF(find: string) {
    const params = new HttpParams()
      .set('q', find)
      .set('limit', 12)
      .set('lang', 'en')
      .set('api_key', environment.api_key);
    return this.http.get<ReturnData>(
      'https://api.giphy.com/v1/gifs/search',
      {params}
    );
  }
}
