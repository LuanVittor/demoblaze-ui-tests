import { test as base, expect } from '@playwright/test';
import { HomePage } from './pages/home.page.js';
import { ProductPage } from './pages/product.page.js';
import { CartPage } from './pages/cart.page.js';
import { LoginPage } from './pages/login.page.js';

export const test = base.extend({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

export { expect };
