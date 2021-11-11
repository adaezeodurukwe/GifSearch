import { Observable, of } from "rxjs";

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

export const mockSearchService = {

  searchGIF: (): Observable<any> => {
    return of(gifMock);
  }
}
