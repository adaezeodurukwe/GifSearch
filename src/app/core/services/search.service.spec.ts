import { SearchService } from './search.service';
import { of } from 'rxjs';
import { gifMock } from './search.service.mock';

describe('SearchService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let searchService: SearchService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    searchService = new SearchService(httpClientSpy as any);
  });

  it('should get gifs', () => {
    httpClientSpy.get.and.returnValue(of(gifMock));

    searchService.searchGIF('mimi').subscribe((gifs) => {
      expect(gifs).toEqual(gifMock);
    });
    expect(httpClientSpy.get.calls.count()).toBe(1);
  });
});
