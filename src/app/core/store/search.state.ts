import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap, catchError } from 'rxjs/operators';
import { Gif, SearchStateModel } from '../models';
import { SearchService } from '../services/search.service';
import { GetResult, ResetResult, SetLoading } from './search.actions';


@State<SearchStateModel>({
  name: 'gifs',
  defaults: {
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

  @Action(ResetResult)
  resetResult({ patchState }: StateContext<SearchStateModel>) {
    patchState({ gifs: [] })
  }

  @Action(GetResult)
  getResult(
    { setState, patchState }: StateContext<SearchStateModel>,
    { payload }: GetResult
  ) {
    return this.searchService.searchGIF(payload).pipe(
      tap((data) => {
        setState({ gifs: data.data, loading: false });
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
