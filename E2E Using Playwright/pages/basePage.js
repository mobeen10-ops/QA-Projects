class BasePage {
  constructor(page) {
    this.page = page;
  }

  async open(path = '') {
    await this.page.goto(process.env.homeUrl);
  }

  async getPageTitle() {
    return await this.page.title();
  }

  async getUrl() {
    return this.page.url();
  }
}

module.exports = { BasePage };