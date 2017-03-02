import { PhotosPage } from './app.po';

describe('photos App', function() {
  let page: PhotosPage;

  beforeEach(() => {
    page = new PhotosPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
