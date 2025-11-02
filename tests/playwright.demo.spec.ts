import { test } from "../fixtures/PageFixtures";

test.describe('Playwright Demo Tests', () => {
  test.describe('Home Page Tests', () => {
    test('should display correct header on home page', {
      annotation: { type: "Issue", description: "ID-01" }
    }, async ({ homePage }) => {
      await test.step('Navigate to home page', async () => {
        await homePage.visit();
        await homePage.waitForUrl();
      });

      await test.step('Verify header text', async () => {
        await homePage.verifyHeaderText();
      });
    });

    test('should navigate to docs page from home page', {
      annotation: { type: "Issue", description: "ID-03" }
    }, async ({ homePage, docsPage }) => {
      await test.step('Navigate to home page', async () => {
        await homePage.visit();
        await homePage.waitForUrl();
      });

      await test.step('Click Get Started and verify navigation', async () => {
        await homePage.clickGetStarted();
        await docsPage.waitForUrl();
      });
    });
  });

  test.describe('Docs Page Tests', () => {
    test('should display correct header on docs page', {
      annotation: { type: "Issue", description: "ID-02" }
    }, async ({ docsPage }) => {
      await test.step('Navigate to docs page', async () => {
        await docsPage.visit();
        await docsPage.waitForUrl();
      });

      await test.step('Verify header text', async () => {
        await docsPage.verifyHeaderText();
      });
    });
  });

  // Retry failed tests up to 2 times
  test.describe.configure({ retries: 2 });
});