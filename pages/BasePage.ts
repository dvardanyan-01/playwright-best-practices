import { Page, Locator } from '@playwright/test';

export class BasePage {
    protected page: Page;
    protected readonly pageUrl: string;
    protected readonly DEFAULT_TIMEOUT = 10000;
    protected readonly DEFAULT_INTERVAL = 1000;

    constructor(page: Page, pageUrl?: string) {
        this.page = page;
        this.pageUrl = pageUrl || '/';
    }

    protected getPageHeader(selector: string): Locator {
        return this.page.locator(selector);
    }

    protected async waitForNetworkIdle(options = { timeout: this.DEFAULT_TIMEOUT }) {
        try {
            await this.page.waitForLoadState('networkidle', options);
        } catch (error: any) {
            throw new Error(`Network did not become idle within ${options.timeout}ms: ${error?.message || 'Unknown error'}`);
        }
    }

    async visit(url?: string, options = { timeout: this.DEFAULT_TIMEOUT }) {
        try {
            const targetUrl = url || this.pageUrl;
            await this.page.goto(targetUrl, options);
            await this.waitForNetworkIdle(options);
        } catch (error: any) {
            throw new Error(`Failed to visit page ${url || this.pageUrl}: ${error?.message || 'Unknown error'}`);
        }
    }

    async waitForUrl(url?: string, options = { timeout: this.DEFAULT_TIMEOUT }) {
        try {
            const targetUrl = url || this.pageUrl;
            await this.page.waitForURL(`**${targetUrl}**`, options);
            await this.waitForNetworkIdle(options);
        } catch (error: any) {
            throw new Error(`URL ${url || this.pageUrl} did not load within ${options.timeout}ms: ${error?.message || 'Unknown error'}`);
        }
    }

    protected async isElementVisible(selector: string, timeout = this.DEFAULT_TIMEOUT): Promise<boolean> {
        try {
            await this.page.waitForSelector(selector, { state: 'visible', timeout });
            return true;
        } catch {
            return false;
        }
    }

    protected async waitForElement(selector: string, options = { state: 'visible' as const, timeout: this.DEFAULT_TIMEOUT }) {
        try {
            await this.page.waitForSelector(selector, options);
        } catch (error: any) {
            throw new Error(`Element ${selector} did not appear within ${options.timeout}ms: ${error?.message || 'Unknown error'}`);
        }
    }
}