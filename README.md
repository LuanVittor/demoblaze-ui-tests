# Demoblaze UI Tests

Automated UI testing framework for the [Demoblaze Product Store](https://www.demoblaze.com), built with [Playwright](https://playwright.dev/).

## Setup

```bash
npm install
npx playwright install chromium
```

## Running Tests

```bash
npm test
npm run report
```

## Project Structure

```
src/
├── fixtures.js          # Custom fixtures (homePage, productPage, cartPage)
└── pages/
    ├── home.page.js     # Product listing, pagination, category filter
    ├── product.page.js  # Product detail, add to cart
    └── cart.page.js     # Cart management, checkout flow

tests/
├── part1-product-scraping.spec.js   # Extract products → products.txt
└── part2-purchase-flow.spec.js      # Purchase + category + cart tests
```

## Test Scenarios

### Part 1 - Product Scraping
- Navigate the first two pages of products
- Extract name, price, and link for each product
- Save all data to `products.txt`

### Part 2 - E2E Scenarios
- **Purchase flow** - Select product, add to cart, checkout, verify confirmation
- **Category filter** - Filter by category and validate results
- **Cart management** - Add product to cart, verify, then remove it
