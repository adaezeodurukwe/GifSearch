import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { SearchState } from './search.state';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxsModule.forRoot([SearchState], { developmentMode: !environment.production }),
  ]
})
export class NgxsStoreModule { }
