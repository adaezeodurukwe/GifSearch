import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SearchService } from 'src/app/core/services/search.service';
import { NgxsStoreModule } from 'src/app/store/store.module';

import { ResultsComponent } from './results.component';

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;
  let mockSearchService: any;
  
  beforeEach(waitForAsync(() => {
    mockSearchService = jasmine.createSpyObj([
      'searchGIF'
    ]);
    TestBed.configureTestingModule({
      declarations: [ ResultsComponent ],
      imports: [HttpClientTestingModule,  NgxsStoreModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: SearchService, useValue: mockSearchService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
