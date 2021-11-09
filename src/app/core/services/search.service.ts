import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gif } from 'src/app/store/search.model';

export interface ReturnData {
  data: Gif[];
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http:HttpClient) { }

  searchGIF(find: string){
		return this.http.get<ReturnData>(
      `https://api.giphy.com/v1/gifs/search?api_key=9k6CKzf54J3TStP6csw3f2uAD37ju27k&q=${find}&limit=12&lang=en`
      )
	}
}
