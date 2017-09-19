import { SearchinformPage } from './app.po';

describe('searchinform App', () => {
  let page: SearchinformPage;

  beforeEach(() => {
    page = new SearchinformPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
