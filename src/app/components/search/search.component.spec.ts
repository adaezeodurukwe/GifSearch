import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { Store } from '@ngxs/store';
import { SearchComponent } from './search.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SearchService } from 'src/app/core/services/search.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { SearchState } from 'src/app/core/store/search.state';
import { NgxsModule } from '@ngxs/store';
import { mockSearchService } from 'src/app/core/services/search.service.mock';

const initialState = {
  gifs: {
    gifs: [],
    loading: false,
  },
};

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let store: Store;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SearchComponent],
        imports: [HttpClientTestingModule, NgxsModule.forRoot([SearchState])],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          FormBuilder,
          { provide: SearchService, useValue: mockSearchService },
        ],
      }).compileComponents();

      store = TestBed.inject(Store);
      store.reset(initialState);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', fakeAsync(() => {
    expect(component).toBeTruthy();
  }));

  it('should trigger a search when input is not forbidden', fakeAsync(() => {
    component.searchBar.setValue({ search: 'me' });
    tick(500);

    const result = store.selectSnapshot(({ gifs }) => gifs.gifs);

    expect(result.length).toBe(1);
  }));

  it('should not trigger a search when input is forbidden', fakeAsync(() => {
    component.searchBar.setValue({ search: 'cats' });

    spyOn(window, 'alert');
    tick(500);

    expect(window.alert).toHaveBeenCalledWith('cats is forbiden');
  }));
});
