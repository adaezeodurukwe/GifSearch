import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgxsModule, Store } from '@ngxs/store';
import { SearchService } from 'src/app/core/services/search.service';
import { mockSearchService } from 'src/app/core/services/search.service.mock';
import { GetResult, SetLoading, SetSearchTerm } from 'src/app/core/store/search.actions';
import { SearchState } from 'src/app/core/store/search.state';
import { NoresultComponent } from '../noresult/noresult.component';
import { ResultsComponent } from './results.component';

const initialState = {
  gifs: {
    gifs: [],
    loading: false,
  },
};

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;
  let store: Store;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ResultsComponent, NoresultComponent],
        imports: [HttpClientTestingModule, NgxsModule.forRoot([SearchState])],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [{ provide: SearchService, useValue: mockSearchService }],
      }).compileComponents();

      store = TestBed.inject(Store);
      store.reset(initialState);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const emptyStateDiv = fixture.debugElement.query(By.css('.emptyState'));
    store.dispatch(new SetSearchTerm(""));
    expect(component).toBeTruthy();
    expect(emptyStateDiv.nativeElement.textContent.trim()).toBe(
      'Start searching Gifs'
    );
  });

  it('should show loading image when loading is true', fakeAsync(() => {
    store.dispatch(new SetSearchTerm("me"));
    store.dispatch(new SetLoading(true));
    let loaderDiv: DebugElement;

    fixture.whenRenderingDone().then(() => {
      fixture.detectChanges();
      loaderDiv = fixture.debugElement.query(By.css('.loader'));

      expect(loaderDiv).toBeTruthy();
    });
    
  }));

  it('should return gifs', fakeAsync(() => {
    store.dispatch(new SetSearchTerm("me"));
    store.dispatch(new SetLoading(false));
    store.dispatch(new GetResult('me'));

    fixture.whenRenderingDone().then(() => {
      fixture.detectChanges();
      const gifItem = fixture.debugElement.query(By.css('.gifitem'));

      expect(gifItem).toBeTruthy();
    });
  }));
});
