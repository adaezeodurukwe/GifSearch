export interface Gif {
  images: {
    downsized: {
      url: string;
    }
  }
}

export interface ReturnData {
  data: Gif[];
}

export interface SearchStateModel {
  gifs: Gif[];
  loading: boolean;
  searchParam: string;
}