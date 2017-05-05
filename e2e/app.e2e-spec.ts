import { NgSpaFrameworkPage } from './app.po';

describe('ng-spa-framework App', () => {
  let page: NgSpaFrameworkPage;

  beforeEach(() => {
    page = new NgSpaFrameworkPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
