import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { SearchService } from 'src/app/core/services/search.service';
import { mockSearchService } from 'src/app/core/services/search.service.mock';
import { SearchState } from 'src/app/core/store/search.state';

import { NoresultComponent } from './noresult.component';

describe('NoresultComponent', () => {
  let component: NoresultComponent;
  let fixture: ComponentFixture<NoresultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoresultComponent ],
      imports: [NgxsModule.forRoot([SearchState])],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: SearchService, useValue: mockSearchService }],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
