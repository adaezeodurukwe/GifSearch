import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SearchState } from 'src/app/core/store/search.state';

@Component({
  selector: 'app-noresult',
  templateUrl: './noresult.component.html',
})
export class NoresultComponent implements OnInit {
  @Select(SearchState.searchTerm) public searchTerm$: Observable<string>;

  constructor() { }

  ngOnInit(): void {
  }

}
