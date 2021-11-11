import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { SearchService } from 'src/app/core/services/search.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ResultsComponent } from './components/results/results.component';
import { SearchComponent } from './components/search/search.component';
import { NgxsModule } from '@ngxs/store';
import { SearchState } from './core/store/search.state';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SearchComponent, ResultsComponent, AppComponent],
        imports: [HttpClientTestingModule, NgxsModule.forRoot([SearchState])],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [FormBuilder, ReactiveFormsModule, SearchService],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
