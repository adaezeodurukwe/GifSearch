import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { SearchService } from 'src/app/core/services/search.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ResultsComponent } from './components/results/results.component';
import { SearchComponent } from './components/search/search.component';
import { By } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { SearchState } from './core/store/search.state';

const gifMock = {
  data: [
    {
      images: {
        downsized: {
          url: 'https://media1.giphy.com/media/vdbrUjzrUEGly/giphy.gif?cid=8192feae4yse68rwfs7g8ap6kj1d54dbke3kxbyhk7jbo05m&rid=giphy.gif&ct=g',
        },
      },
    },
  ],
};

describe('AppComponent', () => {
  let mockSearchService: any;
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(
    waitForAsync(() => {
      mockSearchService = jasmine.createSpyObj([
        'searchGIF'
      ]);
      TestBed.configureTestingModule({
        declarations: [SearchComponent, ResultsComponent, AppComponent],
        imports: [
          HttpClientTestingModule,
          NgxsModule.forRoot([SearchState])
          ],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [
          FormBuilder,
          ReactiveFormsModule,
          { provide: SearchService, useValue: mockSearchService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it(
    'should create the app',
    waitForAsync(() => {
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    })
  );

  it('should show searchbar', () => {
    let input = fixture.debugElement.query(By.css('input'));
    expect(input).toBeTruthy();
  });

  it('should result div', waitForAsync(() => {
    let listEl = fixture.debugElement.query(By.css('.wrapper'))
    expect(listEl).toBeTruthy();
  }));
});
