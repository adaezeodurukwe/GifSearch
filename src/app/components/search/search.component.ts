import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetResult, SetLoading, ResetResult } from '../../store/search.actions';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchBar: FormGroup;
  forbidden = ['cats', 'puppies'];

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit() {
    this.searchBar = this.fb.group({
      search: [''],
    });

    this.searchBar.valueChanges
      .pipe(debounceTime(400))
      .subscribe(({ search }) => {
        if (this.forbidden.includes(search)) {
          this.store.dispatch(new SetLoading(false));
          this.store.dispatch(new ResetResult());
          alert(`${search} is forbiden`);
        } else {
          this.store.dispatch(new SetLoading(true));
          this.store.dispatch(new GetResult(search));
        }
      });
  }
}
