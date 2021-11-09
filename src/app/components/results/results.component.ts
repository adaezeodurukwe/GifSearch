import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Gif } from '../../store/search.model';
import { SearchState } from '../../store/search.state';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
  loadingResult: boolean;

  @Select(SearchState.loading) public loading$: Observable<boolean>;
  @Select(SearchState.currentGifs) public gifs$: Observable<Gif[]>;

  constructor(private store: Store) {}

  ngOnInit() {
    console.log(this.gifs$, this.loading$, 'giffies');
    this.loading$?.subscribe((data) => {
      this.loadingResult = data;
    });
  }
}
