import { Page } from '@playwright/test';

export class BasePage {
    protected page: Page;
    
    
    constructor(page: Page) {
        this.page = page;
    }

    async navigate(url: string) {
        await this.page.goto(url);
    }

    async getTitle(): Promise<string> {
        return await this.page.title();
    }

    async getElementText(selector: string): Promise<string | null> {
        return await this.page.textContent(selector);
    }
}