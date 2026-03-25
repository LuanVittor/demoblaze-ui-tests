export class HomePage {
  constructor(page) {
    this.page = page;
    this.productCards = page.locator('#tbodyid .card');
    this.nextButton = page.locator('#next2');
  }

  async goto() {
    await this.page.goto('/');
    await this.productCards.first().waitFor();
  }

  async getProducts() {
    await this.productCards.first().waitFor();
    const cards = await this.productCards.all();
    return Promise.all(
      cards.map(async (card) => {
        const name = (await card.locator('.card-title a').textContent()).trim();
        const price = (await card.locator('h5').textContent()).trim();
        const href = await card.locator('.card-title a').getAttribute('href');
        return { name, price, link: `https://www.demoblaze.com/${href}` };
      }),
    );
  }

  async goToNextPage() {
    const firstName = await this.productCards.first().locator('.card-title').textContent();
    await this.nextButton.click();
    await this.page.waitForFunction(
      (prev) => {
        const el = document.querySelector('#tbodyid .card-title');
        return el && el.textContent.trim() !== prev.trim();
      },
      firstName,
    );
  }

  async selectCategory(name) {
    await this.page.locator('.list-group-item', { hasText: name }).click();
    await this.page.waitForTimeout(1500);
  }

  async openProduct(name) {
    await this.page.locator('#tbodyid a.hrefch', { hasText: name }).click();
    await this.page.locator('.name').waitFor();
  }
}
