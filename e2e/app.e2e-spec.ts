import { DRSWebAppPage } from './app.po';

describe('drs-web-app App', function() {
  let page: DRSWebAppPage;

  beforeEach(() => {
    page = new DRSWebAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
