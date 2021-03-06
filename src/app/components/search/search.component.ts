import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import {
  GetResult,
  SetLoading,
  ResetResult,
  SetSearchTerm,
} from '../../core/store/search.actions';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, Observable, tap } from 'rxjs';
import { SearchState } from 'src/app/core/store/search.state';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchBar: FormGroup;
  forbidden = ['cats', 'puppies'];

  @Select(SearchState.searchTerm) public searchTerm$: Observable<string>;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit() {
    this.searchBar = this.fb.group({
      search: [''],
    });

    this.searchBar.valueChanges
      .pipe(
        tap(({ search }) => {
          if (search) {
            this.store.dispatch(new SetLoading(true));
            this.store.dispatch(new SetSearchTerm(search));
          } else {
            this.store.dispatch(new ResetResult());
          }
          return search;
        }),
        debounceTime(400)
      )
      .subscribe(({ search }) => {
        if (this.forbidden.includes(search)) {
          this.store.dispatch(new SetLoading(false));
          this.store.dispatch(new ResetResult());
          alert(`${search} is forbiden`);
        } else {
          this.store.dispatch(new GetResult(search));
        }
      });
  }
}
