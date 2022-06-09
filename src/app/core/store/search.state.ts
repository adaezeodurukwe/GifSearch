import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap, catchError } from 'rxjs/operators';
import { Gif, SearchStateModel } from '../models';
import { SearchService } from '../services/search.service';
import {
  GetResult,
  ResetResult,
  SetLoading,
  SetSearchTerm,
} from './search.actions';

@State<SearchStateModel>({
  name: 'gifs',
  defaults: {
    searchParam: '',
    gifs: [],
    loading: false,
  },
})
@Injectable()
export class SearchState {
  constructor(private searchService: SearchService) {}

  @Selector()
  public static loading(state: SearchStateModel): boolean {
    return state.loading;
  }

  @Selector()
  public static currentGifs(state: SearchStateModel): Gif[] {
    return state.gifs;
  }

  @Selector()
  public static searchTerm(state: SearchStateModel): string {
    return state.searchParam;
  }

  @Action(ResetResult)
  resetResult({ setState }: StateContext<SearchStateModel>) {
    setState({ gifs: [], searchParam: '', loading: false });
  }

  @Action(SetSearchTerm)
  setSearchTerm(
    { patchState }: StateContext<SearchStateModel>,
    { payload }: SetSearchTerm
  ) {
    patchState({ searchParam: payload });
  }

  @Action(GetResult)
  getResult(
    { patchState }: StateContext<SearchStateModel>,
    { payload }: GetResult
  ) {
    return this.searchService.searchGIF(payload).pipe(
      tap((data) => {
        patchState({ gifs: data.data, loading: false });
      }),
      catchError((): any => {
        patchState({ loading: false });
      })
    );
  }

  @Action(SetLoading)
  setLoading(
    { patchState }: StateContext<SearchStateModel>,
    { payload }: SetLoading
  ) {
    patchState({ loading: payload });
  }
}
