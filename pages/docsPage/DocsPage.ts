import { Page, expect, Locator } from "../../fixtures/PageFixtures";
import { BasePage } from "../BasePage";
import { DocsPageTexts, DocsPageUrls } from "./DocsPageData";
import { DocsPageSelector } from "./DocsPageSelectors";

export class DocsPage extends BasePage {
  private readonly headerLocator: Locator;

  constructor(page: Page) {
    super(page, DocsPageUrls.DocsPage);
    this.headerLocator = this.getPageHeader(DocsPageSelector.Header);
  }

  async verifyHeaderText() {
    await this.waitForElement(DocsPageSelector.Header);
    await expect(this.headerLocator).toContainText(DocsPageTexts.Header);
  }

  async isHeaderVisible(): Promise<boolean> {
    return this.isElementVisible(DocsPageSelector.Header);
  }
}