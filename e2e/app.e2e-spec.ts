import { WordpressLocationAppPage } from './app.po';

describe('wordpress-location-app App', () => {
  let page: WordpressLocationAppPage;

  beforeEach(() => {
    page = new WordpressLocationAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
