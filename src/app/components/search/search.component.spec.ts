import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SearchService } from 'src/app/core/services/search.service';
import { NgxsStoreModule } from 'src/app/store/store.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let mockSearchService: SearchService;

  beforeEach(waitForAsync(() => {
    mockSearchService = jasmine.createSpyObj([
      'searchGIF'
    ]);
    TestBed.configureTestingModule({
      declarations:  [ SearchComponent ],
      imports: [HttpClientTestingModule,  NgxsStoreModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        FormBuilder,
        { provide: SearchService, useValue: mockSearchService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
