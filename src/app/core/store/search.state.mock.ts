import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap, catchError } from 'rxjs/operators';
import { Gif, SearchStateModel } from '../models';
import { SearchService } from '../services/search.service';
import { GetResult, ResetResult, SetLoading } from './search.actions';

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
    { setState }: StateContext<SearchStateModel>,
    { payload }: GetResult
  ) {    
    return setState({ gifs: gifMock.data, loading: false });
  }

  @Action(SetLoading)
  setLoading(
    { patchState }: StateContext<SearchStateModel>,
    { payload }: SetLoading
  ) {
    
    patchState({ loading: payload });
  }
}
