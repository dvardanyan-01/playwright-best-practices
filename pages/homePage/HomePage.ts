import { Page, expect, Locator } from "../../fixtures/PageFixtures";
import { BasePage } from "../BasePage";
import { HeaderPageSelector } from "./HomePageSelectors";
import { HomePageTexts } from "./HomePageData";

export class HomePage extends BasePage {
  private readonly headerLocator: Locator;
  private readonly getStartedLink: Locator;

  constructor(page: Page) {
    super(page, '/');
    this.headerLocator = this.getPageHeader(HeaderPageSelector.Header);
    this.getStartedLink = page.getByRole('link', { name: 'Get started' });
  }

  async verifyHeaderText() {
    await this.waitForElement(HeaderPageSelector.Header);
    await expect(this.headerLocator).toContainText(HomePageTexts.Header);
  }

  async clickGetStarted() {
    await this.getStartedLink.click();
    await this.waitForNetworkIdle();
  }

  async isHeaderVisible(): Promise<boolean> {
    return this.isElementVisible(HeaderPageSelector.Header);
  }
}