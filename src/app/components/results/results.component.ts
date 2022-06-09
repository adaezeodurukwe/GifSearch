import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Gif } from 'src/app/core/models';
import { SearchState } from '../../core/store/search.state';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {

  @Select(SearchState.loading) public loading$: Observable<boolean>;
  @Select(SearchState.currentGifs) public gifs$: Observable<Gif[]>;
  @Select(SearchState.searchTerm) public searchTerm$: Observable<string>;

  constructor() {}

  ngOnInit() {}
}
