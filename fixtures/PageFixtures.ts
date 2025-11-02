import { test as baseTest } from '@playwright/test';
import { HomePage } from '../pages/homePage/HomePage';
import { DocsPage } from '../pages/docsPage/DocsPage';

type Pages = {
  homePage: HomePage;
  docsPage: DocsPage;
};

export const test = baseTest.extend<Pages>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  docsPage: async ({ page }, use) => {
    await use(new DocsPage(page));
  },
});

export { expect, Page, Locator } from '@playwright/test';
