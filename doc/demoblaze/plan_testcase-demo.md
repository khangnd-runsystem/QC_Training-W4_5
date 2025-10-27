# Comprehensive Test Plan for Demoblaze Playwright Test Scripts

## Table of Contents
1. [Overview](#1-overview)
2. [Test Cases Analysis](#2-test-cases-analysis)
3. [Implementation Strategy](#3-implementation-strategy)
4. [Page Objects Definition](#4-page-objects-definition)
5. [Test Script Mapping](#5-test-script-mapping)
6. [Test Data Management](#6-test-data-management)
7. [Verification Approach](#7-verification-approach)
8. [Special Considerations](#8-special-considerations)
9. [Quality Assurance](#9-quality-assurance)

---

## 1. Overview

### Purpose
This test plan provides a comprehensive roadmap for implementing Playwright test automation scripts for the Demoblaze e-commerce application (https://www.demoblaze.com/). It serves as a detailed guide for developers to ensure consistent, maintainable, and high-quality test implementation that adheres to the established project structure and conventions.

### Features Being Tested
Based on the sample test cases, this plan covers the following core e-commerce features:
- **User Authentication**: Login functionality with valid credentials
- **Product Browsing**: Category navigation and product selection
- **Shopping Cart Management**: Adding multiple items, removing items, and cart total calculations
- **Checkout Process**: Complete order placement with customer information
- **End-to-End User Journey**: Full shopping flow from login to logout

### Connection to Overall Test Architecture
This implementation builds upon the existing project architecture:
- Extends `CommonPage` class from `common_template/common-page.ts` for reusable page interactions
- Extends `CommonLocators` class from `common_template/common-locators.ts` for locator management
- Integrates with the fixture-based test structure defined in `tests/demoblaze/base-test.ts`
- Follows the established directory organization: `pages/demoblaze/`, `locators/demoblaze/`, `tests/demoblaze/`

### Key Dependencies and Assumptions
**Dependencies:**
- Playwright Test Framework (already configured via `playwright.config.ts`)
- TypeScript support (configured via `tsconfig.json`)
- Existing common utilities: `CommonPage`, `CommonLocators`, `Helper`, logging utilities
- Test data interfaces (to be created in `interfaces/demoblaze/`)
- Base test fixtures (to be implemented in `tests/demoblaze/base-test.ts`)

**Assumptions:**
- The Demoblaze application (https://www.demoblaze.com/) is accessible and stable
- Test user accounts are pre-created or can be created programmatically
- The project setup is complete (no installation or initialization steps needed)
- Browser automation is permitted on the target application
- Test execution will handle alerts and modals as part of the application's expected behavior
- No API mocking is required; tests will interact with the live application
- All test files will be organized under `tests/demoblaze/` directory

---

## 2. Test Cases Analysis

### Total Test Cases
**5 test cases** covering critical e-commerce user flows.

### Test Cases Breakdown

#### TC1: Valid Login
- **Steps (3)**: Click login button, enter username, enter password, submit
- **Verifications (4)**: Modal closes, URL verification, welcome message, button state changes
- **Complexity**: Low - Single page interaction with modal
- **Precondition**: User account must exist

#### TC2: Add Multiple Items to Cart
- **Steps (8)**: Navigate categories, select products, handle alerts, verify cart
- **Verifications (3)**: Product display, price accuracy, total calculation
- **Complexity**: Medium - Multiple page navigations, category switching, alert handling
- **Precondition**: User must be logged in

#### TC3: Place Order with Valid Info
- **Steps (5)**: Navigate to cart, verify items, open checkout modal, fill form, submit
- **Verifications (4)**: Confirmation popup, order details display, navigation, cart cleared
- **Complexity**: Medium - Form filling, modal interactions, state verification
- **Precondition**: User logged in with items in cart

#### TC4: Remove Item from Cart
- **Steps (4)**: Navigate to cart, verify items, delete one item, observe changes
- **Verifications (3)**: Item removed, remaining item displayed, total recalculated
- **Complexity**: Low - Simple cart manipulation and verification
- **Precondition**: User logged in with 2 items in cart

#### TC5: Full Shopping Flow
- **Steps (10)**: Login → Browse categories → Add items → Checkout → Logout
- **Verifications (4)**: Cart accuracy, checkout success, navigation, logout state
- **Complexity**: High - Complete end-to-end flow integrating all features
- **Precondition**: Valid user account exists

### Common Patterns Across Test Cases

1. **Modal Interactions**
   - Login modal (TC1, TC5)
   - Checkout modal (TC3, TC5)
   - Both require form filling and submission

2. **Alert Handling**
   - "Product added" confirmation alerts (TC2, TC5)
   - Must be accepted to continue

3. **Category Navigation**
   - Switching between Phones, Laptops, Monitors categories (TC2, TC5)
   - Returning to Home page between category changes

4. **Product Selection Flow**
   - Click category → Click product → Add to cart (TC2, TC5)
   - Repeated pattern across multiple products

5. **Cart Verification**
   - Verify product names and prices (TC2, TC3, TC4, TC5)
   - Verify total calculation (TC2, TC3, TC4, TC5)

6. **Authentication State Management**
   - Login state affects navbar display (TC1, TC5)
   - Logout returns to unauthenticated state (TC5)

### Unique Challenges

1. **Dynamic Product Pricing**: Prices may change; tests should be flexible or use specific test data
2. **Alert Timing**: JavaScript alerts require proper wait strategies
3. **Modal State Management**: Ensuring modals are fully loaded before interaction
4. **Cart Persistence**: Understanding when cart is cleared (after purchase) vs. persisted (during shopping)
5. **Element Visibility**: Products and categories are dynamically rendered
6. **Welcome Message Verification**: Username appears in navbar after login

### Required Test Data

**User Credentials:**
- Username: "autouser_20251005_1234"
- Password: "autouser_20251005_1234"

**Product Names (for test cases):**
- Phones: "Samsung galaxy s6", "Sony xperia z5"
- Laptops: "MacBook Pro", "MacBook Air", "Sony vaio i5"
- Monitors: "Apple monitor 24"

**Checkout Information (multiple variations):**
- Variation 1: Name="John Doe", Country="USA", City="New York", Card="4111111111111111", Month="12", Year="2025"
- Variation 2: Name="Anna", Country="VN", City="HCM", Card="12345678", Month="01", Year="2026"

### Preconditions Summary

1. **User Account Exists**: All test cases assume the test user is pre-created
2. **Clean State**: Cart should be empty at test start (except where specified)
3. **Logged Out State**: Tests should start from logged-out state unless precondition specifies otherwise
4. **Browser State**: Fresh browser context for each test to avoid state leakage

### Page Objects Needed

Based on test case analysis:
1. **LoginPage** (or LoginModal) - Handle authentication
2. **HomePage** - Product categories, product listings, navigation
3. **ProductPage** - Product details, add to cart
4. **CartPage** - View cart, remove items, proceed to checkout
5. **CheckoutPage** (or CheckoutModal) - Order placement form
6. **NavigationBar** - Common navbar component (login/logout buttons, cart link, welcome message)

---

## 3. Implementation Strategy

### File Organization

All test files will be organized under a single directory structure:

```
tests/demoblaze/
├── base-test.ts                 # Fixture definitions (already exists)
├── login.spec.ts                # Login test cases
├── cart.spec.ts                 # Cart management test cases
├── checkout.spec.ts             # Checkout flow test cases
└── full-flow.spec.ts            # End-to-end user journey tests
```

**Rationale**: Organizing by feature area allows for:
- Easier test discovery and maintenance
- Logical grouping of related test scenarios
- Parallel test execution by feature
- Clear separation of concerns

### Naming Conventions

#### Test Files
- Format: `<feature>.spec.ts`
- Examples: `login.spec.ts`, `cart.spec.ts`, `checkout.spec.ts`
- Use kebab-case for multi-word features

#### Test Functions
- Format: `test('TestcaseID - test case description - condition - expected outcome', async ({ page }) => { })`
- Examples:
  - `test('TC001 - Login successfully - when using valid credentials - user is redirected to dashboard', async ({ page }) => { })`
  - `test('TC002 - Add multiple products to cart - when selecting items from different categories - all selected products appear in cart', async ({ page }) => { })`


#### Page Object Classes
- Format: `<Page>Page` (PascalCase)
- Examples: `LoginPage`, `HomePage`, `CartPage`, `CheckoutPage`, `ProductPage`
- Special: `NavigationBar` for the persistent navigation component

#### Locator Files
- Format: `<page>-locators.ts` (kebab-case)
- Examples: `login-locators.ts`, `home-locators.ts`, `cart-locators.ts`
- Must extend from `CommonLocators`

#### Page Object Methods
- Use descriptive action-oriented names in camelCase
- Examples: `loginWithCredentials()`, `addProductToCart()`, `selectCategory()`
- Avoid low-level action names like `click()`, `fill()` - use inherited methods from `CommonPage`

### Page Object Organization

```
pages/demoblaze/
├── auth/
│   └── login-page.ts            # Login modal interactions
├── home/
│   └── home-page.ts             # Home page with categories and products
├── product/
│   └── product-page.ts          # Product detail page
└── cart/
    ├── cart-page.ts             # Shopping cart page
    └── checkout-page.ts         # Checkout modal interactions
```

**Key Principles:**
- Each page object extends `CommonPage`
- Each page object imports and uses its corresponding locator class
- Page objects focus on business-level methods, not low-level interactions
- Page objects should return other page objects when navigation occurs (fluent API)
- **All user interactions and assertions must be encapsulated in page object methods**
- **Test files should NEVER contain hardcoded Playwright actions (page.click(), page.fill(), etc.) or assertions directly**
- **Dynamic locators are handled within page object methods, NOT in locator classes**

### Locator Organization

```
locators/demoblaze/
├── login-locators.ts            # Login modal selectors
├── home-locators.ts             # Home page selectors
├── product-locators.ts          # Product page selectors
├── cart-locators.ts             # Cart page selectors
└── checkout-locators.ts         # Checkout modal selectors
```

**Key Principles:**
- All locator classes extend `CommonLocators`
- Override `initializeLocators()` method to define page-specific selectors
- **Use XPath exclusively for all locators** (e.g., `//button[@id="addToCart"]`, `//input[@name="username"]`)
- Use descriptive property names for locators (e.g., `btnAddToCart`, `txtProductName`, `lnkCategory`)
- Group related locators logically (e.g., all form fields together)
- **Locators must be in separate files, never inline in page objects**
- **NO dynamic locator methods in locator classes** (e.g., NO `productByName(name: string)` methods)
- **Dynamic locators are handled in page object methods using XPath with string interpolation**

### Common Utilities

Reuse existing utilities from `common_template/`:
- **CommonPage methods**: `navigate()`, `click()`, `fill()`, `waitForVisible()`, `getText()`, etc.
- **Helper utilities**: Screenshot capture, wait helpers
- **Logging utilities**: Step decorators for automatic logging

**Additional utilities needed:**
- Alert handling wrapper (for "Product added" confirmations)
- Modal state verification helper
- Cart total calculation validator

### Test Data Management Approach

#### Data Location
```
data/demoblaze/
├── users.json                   # User credentials
├── products.json                # Product details (names, expected prices)
├── checkout-info.json           # Checkout form data variations
└── test-scenarios.json          # Test-specific data combinations
```

#### Data Access Strategy
- **CRITICAL**: NO hardcoded data in test files
- Use `readJson()` utility function to load test data
- Load data at test setup or beforeEach hook
- Pass data as parameters to page object methods

#### Reading Data with readJson()
```typescript
import { readJson } from '../../utils/data-reader';

// Example: Load user credentials
const users = readJson('data/demoblaze/users.json');
const validUser = users.validUser;

// Example: Load products
const products = readJson('data/demoblaze/products.json');
const phoneProduct = products.phones[0];

// Example: Load checkout info
const checkoutData = readJson('data/demoblaze/checkout-info.json');
const customer = checkoutData.customer1;
```

#### Data File Structures

**1. users.json** - User Credentials
```json
{
  "validUser": {
    "username": "autouser_20251005_1234",
    "password": "autouser_20251005_1234"
  }
}
```

**2. products.json** - Product Catalog
```json
{
  "phones": [
    {
      "name": "Samsung galaxy s6",
      "category": "Phones"
    },
    {
      "name": "Sony xperia z5",
      "category": "Phones"
    }
  ],
  "laptops": [
    {
      "name": "MacBook Pro",
      "category": "Laptops"
    },
    {
      "name": "MacBook Air",
      "category": "Laptops"
    },
    {
      "name": "Sony vaio i5",
      "category": "Laptops"
    }
  ],
  "monitors": [
    {
      "name": "Apple monitor 24",
      "category": "Monitors"
    }
  ]
}
```

**3. checkout-info.json** - Customer Information
```json
{
  "customer1": {
    "name": "John Doe",
    "country": "USA",
    "city": "New York",
    "creditCard": "4111111111111111",
    "month": "12",
    "year": "2025"
  },
  "customer2": {
    "name": "Anna",
    "country": "VN",
    "city": "HCM",
    "creditCard": "12345678",
    "month": "01",
    "year": "2026"
  }
}
```


### Interface Definitions for Test Data

Create TypeScript interfaces in `interfaces/demoblaze/`:

```typescript
// interfaces/demoblaze/user.interface.ts
export interface User {
  username: string;
  password: string;
}

// interfaces/demoblaze/product.interface.ts
export interface Product {
  name: string;
  expectedPrice?: number;
  category?: 'Phones' | 'Laptops' | 'Monitors';
}

// interfaces/demoblaze/checkout-info.interface.ts
export interface CheckoutInfo {
  name: string;
  country: string;
  city: string;
  creditCard: string;
  month: string;
  year: string;
}

// interfaces/demoblaze/order-confirmation.interface.ts
export interface OrderConfirmation {
  orderId: string;
  amount: number;
  cardNumber: string;
  name: string;
  date: string;
}
```

### Handling Preconditions Efficiently

#### Strategy 1: Fixture-Based Setup
Extend `base-test.ts` to include setup fixtures:

```typescript
// Example fixture structure (pseudocode)
export const test = baseTest.extend<MyFixtures>({
  authenticatedPage: async ({ page }, use) => {
    // Setup: Login before test
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.loginWithCredentials('user', 'pass');
    await use(page);
  },
  
  cartWithItems: async ({ page, authenticatedPage }, use) => {
    // Setup: Add items to cart
    const homePage = new HomePage(page);
    await homePage.addProductToCart('Samsung galaxy s6');
    await use(page);
  }
});
```

#### Strategy 2: Helper Methods
Create setup helper methods in page objects:

```typescript
// In HomePage class
async setupCartWithProducts(products: string[]): Promise<void> {
  for (const product of products) {
    await this.addProductToCart(product);
  }
}
```

#### Strategy 3: Test Hooks
Use `beforeEach` hooks for common preconditions:

```typescript
test.beforeEach(async ({ page }) => {
  // Navigate to homepage
  await page.goto('https://www.demoblaze.com/');
  
  // Clear cart to ensure clean state
  const cartPage = new CartPage(page);
  await cartPage.navigateToCart();
  await cartPage.clearAllItems();
});
```

**Recommended Approach**: 
- Combination of fixtures for authentication state
- Helper methods for cart setup
- **`beforeEach` hook to clear cart before each test to ensure clean state**

---

## 4. Page Objects Definition

### Important Implementation Rules

**CRITICAL: Page Object Model (POM) Principles**

1. **NO Direct Playwright Actions in Test Files**
   - ❌ **NEVER** use `page.click()`, `page.fill()`, `page.locator()`, or any Playwright action directly in test files
   - ❌ **NEVER** use `expect()` or assertions directly in test files
   - ✅ **ALWAYS** create methods in page object classes for ALL interactions and verifications
   - ✅ Test files should ONLY call page object methods

2. **Complete Method Coverage in Page Objects**
   - Create dedicated methods for every user action (click, fill, select, hover, etc.)
   - Create dedicated methods for every verification (visibility, text content, state, count, etc.)
   - Group related actions into business-level methods when appropriate

3. **Locator Class Structure (Follow ButtonLocators Example)**
   ```typescript
   import { Locator, Page } from '@playwright/test';
   import { CommonLocators } from '../common-locators';

   export class ProductLocators extends CommonLocators {
     // Declare locator properties with ! (definite assignment)
     btnAddToCart!: Locator;
     txtProductName!: Locator;
     txtProductPrice!: Locator;

     constructor(page: Page) {
       super(page);
       this.initializeLocators();
     }

     protected initializeLocators(): void {
       super.initializeLocators();
       
       // Use XPath for all locators
       this.btnAddToCart = this.page.locator('//button[contains(@class, "btn-success")]');
       this.txtProductName = this.page.locator('//h2[@class="name"]');
       this.txtProductPrice = this.page.locator('//h3[@class="price-container"]');
     }
   }
   ```

4. **Page Class Structure (Follow CheckBoxPage Example)**
   ```typescript
   import { Page, expect } from '@playwright/test';
   import { CommonPage } from '../../common_template/common-page';
   import { ProductLocators } from '../../locators/demoblaze/product-locators';

   export class ProductPage extends CommonPage {
     readonly locators: ProductLocators;

     constructor(page: Page) {
       super(page);
       this.locators = new ProductLocators(page);
     }

     // Business methods that use locators and CommonPage utilities
     async addToCart(): Promise<void> {
       await this.click(this.locators.btnAddToCart);
     }

     async verifyProductName(expectedName: string): Promise<void> {
       await expect.soft(this.locators.txtProductName).toHaveText(expectedName);
     }
   }
   ```

5. **XPath for All Locators**
   - **Mandatory**: Use XPath syntax for all element selectors
   - Examples: `//button[@id="purchase"]`, `//input[@name="username"]`, `//div[text()="Welcome"]`
   - Leverage XPath features: text matching, attribute matching, hierarchy navigation

6. **Dynamic Locators Handling**
   - ❌ **DO NOT** create dynamic locator methods in locator classes
   - ✅ **DO** handle dynamic locators within page object methods using XPath with template literals
   
   **Example:**
   ```typescript
   // ❌ WRONG - In locator class
   lnkProductByName(name: string): Locator {
     return this.page.locator(`//a[text()="${name}"]`);
   }
   
   // ✅ CORRECT - In page class method
   async selectProduct(productName: string): Promise<void> {
     const productLocator = this.page.locator(`//a[contains(text(), "${productName}")]`);
     await this.click(productLocator);
   }
   ```

7. **Test File Structure - NO Hardcoded Actions or Assertions**
   ```typescript
   // ❌ WRONG - Direct Playwright calls and assertions in test
   test('add product to cart', async ({ page }) => {
     await page.click('//button[@id="addToCart"]');
     await page.fill('//input[@name="quantity"]', '2');
     await expect(page.locator('//div[@class="cart"]')).toBeVisible();
   });
   
   // ✅ CORRECT - Only page object methods
   test('add product to cart', async ({ page }) => {
     const productPage = new ProductPage(page);
     await productPage.addToCart();
     await productPage.setQuantity(2);
     await productPage.verifyCartVisible();
   });
   ```

---

### 4.1 LoginPage (Login Modal)

**File**: `pages/demoblaze/auth/login-page.ts`

**Locator File**: `locators/demoblaze/login-locators.ts`

**Purpose**: Handle all interactions with the login modal dialog.

**Locators Class Definition** (following ButtonLocators pattern):
```typescript
import { Locator, Page } from '@playwright/test';
import { CommonLocators } from '../common-locators';

export class LoginLocators extends CommonLocators {
  // Declare all locator properties
  btnLoginNav!: Locator;
  modalLogin!: Locator;
  inputUsername!: Locator;
  inputPassword!: Locator;
  btnSubmit!: Locator;
  btnClose!: Locator;

  constructor(page: Page) {
    super(page);
    this.initializeLocators();
  }

  protected initializeLocators(): void {
    super.initializeLocators();
    
    // Use XPath for all locators
    this.btnLoginNav = this.page.locator('//a[@id="login2"]');
    this.modalLogin = this.page.locator('//div[@id="logInModal"]');
    this.inputUsername = this.page.locator('//input[@id="loginusername"]');
    this.inputPassword = this.page.locator('//input[@id="loginpassword"]');
    this.btnSubmit = this.page.locator('//button[text()="Log in" and @onclick]');
    this.btnClose = this.page.locator('//div[@id="logInModal"]//button[@class="close"]');
  }
}
```

**Page Class Definition** (following CheckBoxPage pattern):
```typescript
import { Page, expect } from '@playwright/test';
import { CommonPage } from '../../../common_template/common-page';
import { LoginLocators } from '../../../locators/demoblaze/login-locators';

export class LoginPage extends CommonPage {
  readonly locators: LoginLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new LoginLocators(page);
  }

  // Action methods
  async openLoginModal(): Promise<void> {
    await this.click(this.locators.btnLoginNav);
    await this.waitForVisible(this.locators.modalLogin);
  }

  async loginWithCredentials(username: string, password: string): Promise<void> {
    await this.fill(this.locators.inputUsername, username);
    await this.fill(this.locators.inputPassword, password);
    await this.click(this.locators.btnSubmit);
    await this.waitForHidden(this.locators.modalLogin);
  }

  async closeModal(): Promise<void> {
    await this.click(this.locators.btnClose);
    await this.waitForHidden(this.locators.modalLogin);
  }

  // Verification methods
  async verifyLoginModalVisible(): Promise<void> {
    await expect.soft(this.locators.modalLogin).toBeVisible();
  }

  async verifyLoginModalHidden(): Promise<void> {
    await expect.soft(this.locators.modalLogin).toBeHidden();
  }
}
```

**Navigation**: 
- `openLoginModal()`: Stays on current page, modal appears
- `loginWithCredentials()`: Returns to previous page with authenticated state
- `closeModal()`: Returns to previous page, modal closes

---

### 4.2 HomePage

**File**: `pages/demoblaze/home/home-page.ts`

**Locator File**: `locators/demoblaze/home-locators.ts`

**Purpose**: Handle product browsing, category navigation, and product selection on the home page.

**Locators Class Definition**:
```typescript
import { Locator, Page } from '@playwright/test';
import { CommonLocators } from '../common-locators';

export class HomeLocators extends CommonLocators {
  // Declare all locator properties
  lnkCategoryPhones!: Locator;
  lnkCategoryLaptops!: Locator;
  lnkCategoryMonitors!: Locator;
  lnkHome!: Locator;
  lnkCart!: Locator;
  btnLogout!: Locator;
  txtWelcome!: Locator;

  constructor(page: Page) {
    super(page);
    this.initializeLocators();
  }

  protected initializeLocators(): void {
    super.initializeLocators();
    
    // Use XPath for all static locators
    this.lnkCategoryPhones = this.page.locator('//a[text()="Phones"]');
    this.lnkCategoryLaptops = this.page.locator('//a[text()="Laptops"]');
    this.lnkCategoryMonitors = this.page.locator('//a[text()="Monitors"]');
    this.lnkHome = this.page.locator('//a[@class="nav-link" and contains(text(), "Home")]');
    this.lnkCart = this.page.locator('//a[@id="cartur"]');
    this.btnLogout = this.page.locator('//a[@id="logout2"]');
    this.txtWelcome = this.page.locator('//a[@id="nameofuser"]');
  }
}
```

**Page Class Definition**:
```typescript
import { Page, expect } from '@playwright/test';
import { CommonPage } from '../../../common_template/common-page';
import { HomeLocators } from '../../../locators/demoblaze/home-locators';

export class HomePage extends CommonPage {
  readonly locators: HomeLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new HomeLocators(page);
  }

  // Navigation methods
  async navigateToHome(): Promise<void> {
    await this.navigate('https://www.demoblaze.com/');
    await this.waitForVisible(this.locators.lnkHome);
  }

  async selectCategory(categoryName: 'Phones' | 'Laptops' | 'Monitors'): Promise<void> {
    // Handle dynamic category selection in page method using XPath
    const categoryLocator = this.page.locator(`//a[text()="${categoryName}"]`);
    await this.click(categoryLocator);
    await this.page.waitForLoadState('networkidle');
  }

  async selectProduct(productName: string): Promise<void> {
    // Handle dynamic product selection in page method using XPath
    const productLocator = this.page.locator(`//a[contains(text(), "${productName}")]`);
    await this.click(productLocator);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickHomeInNavbar(): Promise<void> {
    await this.click(this.locators.lnkHome);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async navigateToCart(): Promise<void> {
    await this.click(this.locators.lnkCart);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async logout(): Promise<void> {
    await this.click(this.locators.btnLogout);
    await this.page.waitForTimeout(1000);
  }

  // Verification methods
  async verifyOnHomePage(): Promise<void> {
    await expect.soft(this.page).toHaveURL(/index\.html/);
  }

  async verifyProductDisplayed(productName: string): Promise<void> {
    const productLocator = this.page.locator(`//a[contains(text(), "${productName}")]`);
    await expect.soft(productLocator).toBeVisible();
  }

  async verifyWelcomeMessage(username: string): Promise<void> {
    await expect.soft(this.locators.txtWelcome).toContainText(username);
  }

  async verifyLogoutVisible(): Promise<void> {
    await expect.soft(this.locators.btnLogout).toBeVisible();
  }
}
```

**Navigation**: 
- `navigateToHome()`: Lands on HomePage
- `selectCategory()`: Stays on HomePage, product list filtered
- `selectProduct()`: Navigates to ProductPage
- `navigateToCart()`: Navigates to CartPage

---

### 4.3 ProductPage

**File**: `pages/demoblaze/product/product-page.ts`

**Locator File**: `locators/demoblaze/product-locators.ts`

**Purpose**: Handle product detail viewing and adding products to cart.

**Locators Class Definition**:
```typescript
import { Locator, Page } from '@playwright/test';
import { CommonLocators } from '../common-locators';

export class ProductLocators extends CommonLocators {
  btnAddToCart!: Locator;
  txtProductName!: Locator;
  txtProductPrice!: Locator;

  constructor(page: Page) {
    super(page);
    this.initializeLocators();
  }

  protected initializeLocators(): void {
    super.initializeLocators();
    
    this.btnAddToCart = this.page.locator('//a[contains(@class, "btn-success") and text()="Add to cart"]');
    this.txtProductName = this.page.locator('//h2[@class="name"]');
    this.txtProductPrice = this.page.locator('//h3[@class="price-container"]');
  }
}
```

**Page Class Definition**:
```typescript
import { Page, expect } from '@playwright/test';
import { CommonPage } from '../../../common_template/common-page';
import { ProductLocators } from '../../../locators/demoblaze/product-locators';

export class ProductPage extends CommonPage {
  readonly locators: ProductLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new ProductLocators(page);
  }

  // Action methods
  async addToCart(): Promise<void> {
    // Handle alert in the method
    this.page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
    await this.click(this.locators.btnAddToCart);
    await this.page.waitForTimeout(500);
  }

  // Getter methods
  async getProductName(): Promise<string> {
    return await this.getText(this.locators.txtProductName);
  }

  async getProductPrice(): Promise<string> {
    return await this.getText(this.locators.txtProductPrice);
  }

  // Verification methods
  async verifyAddToCartButtonVisible(): Promise<void> {
    await expect.soft(this.locators.btnAddToCart).toBeVisible();
  }

  async verifyProductName(expectedName: string): Promise<void> {
    await expect.soft(this.locators.txtProductName).toHaveText(expectedName);
  }
}
```

**Navigation**: 
- `addToCart()`: Stays on ProductPage (alert is handled internally)

---

### 4.4 CartPage

**File**: `pages/demoblaze/cart/cart-page.ts`

**Locator File**: `locators/demoblaze/cart-locators.ts`

**Purpose**: Display cart contents, manage items, and initiate checkout.

**Locators Class Definition**:
```typescript
import { Locator, Page } from '@playwright/test';
import { CommonLocators } from '../common-locators';

export class CartLocators extends CommonLocators {
  rowCartItem!: Locator;
  txtItemName!: Locator;
  txtItemPrice!: Locator;
  btnDelete!: Locator;
  txtTotalPrice!: Locator;
  btnPlaceOrder!: Locator;

  constructor(page: Page) {
    super(page);
    this.initializeLocators();
  }

  protected initializeLocators(): void {
    super.initializeLocators();
    
    this.rowCartItem = this.page.locator('//tbody[@id="tbodyid"]/tr');
    this.txtItemName = this.page.locator('//tbody[@id="tbodyid"]//td[2]');
    this.txtItemPrice = this.page.locator('//tbody[@id="tbodyid"]//td[3]');
    this.btnDelete = this.page.locator('//a[text()="Delete"]');
    this.txtTotalPrice = this.page.locator('//h3[@id="totalp"]');
    this.btnPlaceOrder = this.page.locator('//button[text()="Place Order"]');
  }
}
```

**Page Class Definition**:
```typescript
import { Page, expect } from '@playwright/test';
import { CommonPage } from '../../../common_template/common-page';
import { CartLocators } from '../../../locators/demoblaze/cart-locators';

export class CartPage extends CommonPage {
  readonly locators: CartLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new CartLocators(page);
  }

  // Navigation methods
  async navigateToCart(): Promise<void> {
    const cartLink = this.page.locator('//a[@id="cartur"]');
    await this.click(cartLink);
    await this.page.waitForLoadState('domcontentloaded');
  }

  // Action methods
  async removeItem(productName: string): Promise<void> {
    // Handle dynamic delete button using XPath in page method
    const deleteButton = this.page.locator(`//tr[td[contains(text(), "${productName}")]]//a[text()="Delete"]`);
    await this.click(deleteButton);
    await this.page.waitForTimeout(1000);
  }

  async clearAllItems(): Promise<void> {
    const itemCount = await this.locators.rowCartItem.count();
    for (let i = 0; i < itemCount; i++) {
      const deleteBtn = this.locators.btnDelete.first();
      if (await deleteBtn.isVisible()) {
        await this.click(deleteBtn);
        await this.page.waitForTimeout(500);
      }
    }
  }

  async clickPlaceOrder(): Promise<void> {
    await this.click(this.locators.btnPlaceOrder);
    await this.page.waitForTimeout(1000);
  }

  // Getter methods
  async getCartItems(): Promise<Array<{ name: string; price: string }>> {
    const items: Array<{ name: string; price: string }> = [];
    const count = await this.locators.rowCartItem.count();
    
    for (let i = 0; i < count; i++) {
      const name = await this.locators.txtItemName.nth(i).textContent() || '';
      const price = await this.locators.txtItemPrice.nth(i).textContent() || '';
      items.push({ name: name.trim(), price: price.trim() });
    }
    
    return items;
  }

  async getTotalPrice(): Promise<string> {
    return await this.getText(this.locators.txtTotalPrice);
  }

  async getItemCount(): Promise<number> {
    return await this.locators.rowCartItem.count();
  }

  // Verification methods
  async verifyItemInCart(productName: string): Promise<void> {
    const itemLocator = this.page.locator(`//td[contains(text(), "${productName}")]`);
    await expect.soft(itemLocator).toBeVisible();
  }

  async verifyItemNotInCart(productName: string): Promise<void> {
    const itemLocator = this.page.locator(`//td[contains(text(), "${productName}")]`);
    await expect.soft(itemLocator).toBeHidden();
  }

  async verifyTotalPrice(expectedTotal: string): Promise<void> {
    await expect.soft(this.locators.txtTotalPrice).toHaveText(expectedTotal);
  }

  async verifyItemCount(expectedCount: number): Promise<void> {
    await expect.soft(this.locators.rowCartItem).toHaveCount(expectedCount);
  }
}
```

**Navigation**: 
- `navigateToCart()`: Navigates to CartPage
- `removeItem()`: Stays on CartPage
- `clickPlaceOrder()`: Opens checkout modal, stays on CartPage

---

### 4.5 CheckoutPage (Checkout Modal)

**File**: `pages/demoblaze/cart/checkout-page.ts`

**Locator File**: `locators/demoblaze/checkout-locators.ts`

**Purpose**: Handle order placement form submission.

**Locators Class Definition**:
```typescript
import { Locator, Page } from '@playwright/test';
import { CommonLocators } from '../common-locators';

export class CheckoutLocators extends CommonLocators {
  modalCheckout!: Locator;
  inputName!: Locator;
  inputCountry!: Locator;
  inputCity!: Locator;
  inputCreditCard!: Locator;
  inputMonth!: Locator;
  inputYear!: Locator;
  btnPurchase!: Locator;
  modalConfirmation!: Locator;
  txtConfirmMessage!: Locator;
  txtOrderDetails!: Locator;
  btnOk!: Locator;

  constructor(page: Page) {
    super(page);
    this.initializeLocators();
  }

  protected initializeLocators(): void {
    super.initializeLocators();
    
    this.modalCheckout = this.page.locator('//div[@id="orderModal"]');
    this.inputName = this.page.locator('//input[@id="name"]');
    this.inputCountry = this.page.locator('//input[@id="country"]');
    this.inputCity = this.page.locator('//input[@id="city"]');
    this.inputCreditCard = this.page.locator('//input[@id="card"]');
    this.inputMonth = this.page.locator('//input[@id="month"]');
    this.inputYear = this.page.locator('//input[@id="year"]');
    this.btnPurchase = this.page.locator('//button[text()="Purchase"]');
    this.modalConfirmation = this.page.locator('//div[@class="sweet-alert showSweetAlert visible"]');
    this.txtConfirmMessage = this.page.locator('//h2[contains(text(), "Thank you")]');
    this.txtOrderDetails = this.page.locator('//p[@class="lead text-muted"]');
    this.btnOk = this.page.locator('//button[text()="OK"]');
  }
}
```

**Page Class Definition**:
```typescript
import { Page, expect } from '@playwright/test';
import { CommonPage } from '../../../common_template/common-page';
import { CheckoutLocators } from '../../../locators/demoblaze/checkout-locators';

export interface CheckoutInfo {
  name: string;
  country: string;
  city: string;
  creditCard: string;
  month: string;
  year: string;
}

export interface OrderConfirmation {
  orderId: string;
  amount: string;
  cardNumber: string;
  name: string;
  date: string;
}

export class CheckoutPage extends CommonPage {
  readonly locators: CheckoutLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new CheckoutLocators(page);
  }

  // Action methods
  async fillCheckoutForm(info: CheckoutInfo): Promise<void> {
    await this.waitForVisible(this.locators.modalCheckout);
    await this.fill(this.locators.inputName, info.name);
    await this.fill(this.locators.inputCountry, info.country);
    await this.fill(this.locators.inputCity, info.city);
    await this.fill(this.locators.inputCreditCard, info.creditCard);
    await this.fill(this.locators.inputMonth, info.month);
    await this.fill(this.locators.inputYear, info.year);
  }

  async clickPurchase(): Promise<void> {
    await this.click(this.locators.btnPurchase);
    await this.waitForVisible(this.locators.modalConfirmation);
  }

  async closeConfirmation(): Promise<void> {
    await this.click(this.locators.btnOk);
    await this.waitForHidden(this.locators.modalConfirmation);
  }

  // Getter methods
  async getOrderConfirmation(): Promise<OrderConfirmation> {
    const orderDetailsText = await this.getText(this.locators.txtOrderDetails);
    
    // Parse order details from text
    const lines = orderDetailsText.split('\n');
    const confirmation: OrderConfirmation = {
      orderId: '',
      amount: '',
      cardNumber: '',
      name: '',
      date: ''
    };

    lines.forEach(line => {
      if (line.includes('Id:')) confirmation.orderId = line.split(':')[1].trim();
      if (line.includes('Amount:')) confirmation.amount = line.split(':')[1].trim();
      if (line.includes('Card Number:')) confirmation.cardNumber = line.split(':')[1].trim();
      if (line.includes('Name:')) confirmation.name = line.split(':')[1].trim();
      if (line.includes('Date:')) confirmation.date = line.split(':')[1].trim();
    });

    return confirmation;
  }

  // Verification methods
  async verifyCheckoutModalVisible(): Promise<void> {
    await expect.soft(this.locators.modalCheckout).toBeVisible();
  }

  async verifyConfirmationPopup(): Promise<void> {
    await expect.soft(this.locators.modalConfirmation).toBeVisible();
    await expect.soft(this.locators.txtConfirmMessage).toContainText('Thank you');
  }

  async verifyOrderId(orderId: string): Promise<void> {
    const confirmation = await this.getOrderConfirmation();
    expect.soft(confirmation.orderId).toBe(orderId);
  }

  async verifyOrderAmount(amount: string): Promise<void> {
    const confirmation = await this.getOrderConfirmation();
    expect.soft(confirmation.amount).toContain(amount);
  }
}
```

**Navigation**: 
- `fillCheckoutForm()`: Stays on modal
- `clickPurchase()`: Checkout modal closes, confirmation popup appears
- `closeConfirmation()`: Returns to HomePage

---

### Navigation Patterns Summary

| Current Page | Method Called | Resulting Page | Key Points |
|--------------|---------------|----------------|------------|
| Any | `HomePage.navigateToHome()` | HomePage | Fresh page load |
| Any | `CartPage.navigateToCart()` | CartPage | Via navbar Cart link |
| HomePage | `HomePage.selectProduct(name)` | ProductPage | Product detail view |
| ProductPage | `ProductPage.addToCart()` | ProductPage (stays) | Alert handled internally |
| CartPage | `CartPage.clickPlaceOrder()` | CartPage (modal opens) | Checkout modal appears |
| CheckoutPage (modal) | `CheckoutPage.closeConfirmation()` | HomePage | After successful purchase |
| Any (logged in) | `HomePage.logout()` | HomePage | Unauthenticated state |

---

## 5. Test Script Mapping

### Test Script Structure Requirements

**CRITICAL: All test files MUST follow these rules:**

1. **NO Hardcoded Playwright Actions**
   ```typescript
   // ❌ WRONG
   await page.click('//button[@id="login"]');
   await page.fill('//input[@name="username"]', 'user');
   
   // ✅ CORRECT
   const loginPage = new LoginPage(page);
   await loginPage.loginWithCredentials('user', 'pass');
   ```

2. **NO Direct Assertions in Test Files**
   ```typescript
   // ❌ WRONG
   await expect(page.locator('//div[@class="cart"]')).toBeVisible();
   await expect(page.locator('//span[@id="total"]')).toHaveText('1000');
   
   // ✅ CORRECT
   const cartPage = new CartPage(page);
   await cartPage.verifyItemCount(2);
   await cartPage.verifyTotalPrice('1000');
   ```

3. **Required beforeEach Hook - Clear Cart**
   ```typescript
   test.beforeEach(async ({ page }) => {
     // Navigate to site
     await page.goto('https://www.demoblaze.com/');
     
     // Clear cart to ensure clean state
     const cartPage = new CartPage(page);
     await cartPage.navigateToCart();
     await cartPage.clearAllItems();
   });
   ```

4. **Test File Structure Pattern**
   ```typescript
   import { test, expect } from '@playwright/test';
   import { LoginPage } from '../../pages/demoblaze/auth/login-page';
   import { HomePage } from '../../pages/demoblaze/home/home-page';
   
   test.describe('Feature Name', () => {
     test.beforeEach(async ({ page }) => {
       // Setup: Navigate and clear cart
       await page.goto('https://www.demoblaze.com/');
       const cartPage = new CartPage(page);
       await cartPage.navigateToCart();
       await cartPage.clearAllItems();
     });

     test('TestcaseID - description - condition - expected outcome', async ({ page }) => {
       // Arrange: Initialize page objects
       const homePage = new HomePage(page);
       const productPage = new ProductPage(page);
       
       // Act: Perform actions through page methods only
       await homePage.selectCategory('Phones');
       await homePage.selectProduct('Samsung galaxy s6');
       await productPage.addToCart();
       
       // Assert: Verify through page methods only
       await homePage.navigateToCart();
       await cartPage.verifyItemInCart('Samsung galaxy s6');
     });
   });
   ```

### Test Case Mapping Table

### Test Case Mapping Table

| Test Case ID | Test File Name | Test Function Name | Page Objects Required | Special Handling |
|--------------|----------------|--------------------|-----------------------|------------------|
| TC1 | `login.spec.ts` | `test('TC1 - Login - when using valid credentials - user is authenticated successfully', ...)` | `LoginPage`, `HomePage` | Modal interaction, beforeEach clears cart |
| TC2 | `cart.spec.ts` | `test('TC2 - Cart - when adding multiple products - all items appear with correct totals', ...)` | `HomePage`, `ProductPage`, `CartPage` | Alert handling, category switching, beforeEach clears cart |
| TC3 | `checkout.spec.ts` | `test('TC3 - Checkout - when placing order with valid info - order completes successfully', ...)` | `HomePage`, `ProductPage`, `CartPage`, `CheckoutPage` | Form filling, confirmation popup, beforeEach clears cart |
| TC4 | `cart.spec.ts` | `test('TC4 - Cart - when removing item - remaining items and total update correctly', ...)` | `HomePage`, `ProductPage`, `CartPage` | Dynamic item removal, beforeEach clears cart |
| TC5 | `full-flow.spec.ts` | `test('TC5 - Full Flow - when completing shopping journey - all steps execute successfully', ...)` | `LoginPage`, `HomePage`, `ProductPage`, `CartPage`, `CheckoutPage` | Complete flow, logout verification, beforeEach clears cart |

### Detailed Mapping

#### TC1: Login - Valid Login
```typescript
// File: tests/demoblaze/login.spec.ts
import { test } from '@playwright/test';
import { LoginPage } from '../../pages/demoblaze/auth/login-page';
import { HomePage } from '../../pages/demoblaze/home/home-page';
import { CartPage } from '../../pages/demoblaze/cart/cart-page';
import { readJson } from '../../utils/data-reader';

test.describe('Login Feature', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.demoblaze.com/');
    
    // Clear cart for clean state
    const cartPage = new CartPage(page);
    await cartPage.navigateToCart();
    await cartPage.clearAllItems();
  });

  test('TC1 - Login - when using valid credentials - user is authenticated successfully', async ({ page }) => {
    // Load test data from JSON
    const users = readJson('data/demoblaze/users.json');
    const validUser = users.validUser;
    
    // Initialize page objects
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    
    // Step 1: Open login modal
    await loginPage.openLoginModal();
    
    // Steps 2-4: Login with credentials from data file
    await loginPage.loginWithCredentials(validUser.username, validUser.password);
    
    // Verifications (all through page methods)
    await loginPage.verifyLoginModalHidden();
    await homePage.verifyOnHomePage();
    await homePage.verifyWelcomeMessage(validUser.username);
    await homePage.verifyLogoutVisible();
  });
});
```

#### TC2: Cart - Add Multiple Items
```typescript
// File: tests/demoblaze/cart.spec.ts
import { test } from '@playwright/test';
import { HomePage } from '../../pages/demoblaze/home/home-page';
import { ProductPage } from '../../pages/demoblaze/product/product-page';
import { CartPage } from '../../pages/demoblaze/cart/cart-page';
import { readJson } from '../../utils/data-reader';

test.describe('Cart Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.demoblaze.com/');
    
    // Clear cart for clean state
    const cartPage = new CartPage(page);
    await cartPage.navigateToCart();
    await cartPage.clearAllItems();
  });

  test('TC2 - Cart - when adding multiple products - all items appear with correct totals', async ({ page }) => {
    // Load test data from JSON
    const products = readJson('data/demoblaze/products.json');
    const phone = products.phones.samsungGalaxyS6;
    const laptop = products.laptops.macBookPro;
    
    // Initialize page objects
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    
    // Steps 1-3: Add first product
    await homePage.selectCategory(phone.category);
    await homePage.selectProduct(phone.name);
    await productPage.addToCart();
    
    // Step 4: Return to home
    await homePage.clickHomeInNavbar();
    
    // Steps 5-7: Add second product
    await homePage.selectCategory(laptop.category);
    await homePage.selectProduct(laptop.name);
    await productPage.addToCart();
    
    // Step 8: Navigate to cart
    await homePage.navigateToCart();
    
    // Verifications (all through page methods)
    await cartPage.verifyItemCount(2);
    await cartPage.verifyItemInCart(phone.name);
    await cartPage.verifyItemInCart(laptop.name);
  });
});
```

#### TC3: Checkout - Place Order with Valid Info
```typescript
// File: tests/demoblaze/checkout.spec.ts
import { test } from '@playwright/test';
import { HomePage } from '../../pages/demoblaze/home/home-page';
import { ProductPage } from '../../pages/demoblaze/product/product-page';
import { CartPage } from '../../pages/demoblaze/cart/cart-page';
import { CheckoutPage } from '../../pages/demoblaze/cart/checkout-page';
import { readJson } from '../../utils/data-reader';

test.describe('Checkout Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.demoblaze.com/');
    
    // Load test data
    const products = readJson('data/demoblaze/products.json');
    const phone = products.phones.samsungGalaxyS6;
    
    // Clear cart for clean state
    const cartPage = new CartPage(page);
    await cartPage.navigateToCart();
    await cartPage.clearAllItems();
    
    // Add a product for checkout tests
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    await homePage.navigateToHome();
    await homePage.selectCategory(phone.category);
    await homePage.selectProduct(phone.name);
    await productPage.addToCart();
  });

  test('TC3 - Checkout - when placing order with valid info - order completes successfully', async ({ page }) => {
    // Load checkout test data
    const checkoutData = readJson('data/demoblaze/checkout-info.json');
    const customer = checkoutData.customer1;
    const products = readJson('data/demoblaze/products.json');
    const phone = products.phones.samsungGalaxyS6;
    
    // Initialize page objects
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const homePage = new HomePage(page);
    
    // Steps 1-2: Navigate to cart and verify items
    await cartPage.navigateToCart();
    await cartPage.verifyItemInCart(phone.name);
    
    // Step 3: Click Place Order
    await cartPage.clickPlaceOrder();
    
    // Step 4: Fill checkout form with data from JSON
    await checkoutPage.fillCheckoutForm({
      name: customer.name,
      country: customer.country,
      city: customer.city,
      creditCard: customer.creditCard,
      month: customer.month,
      year: customer.year
    });
    
    // Step 5: Click Purchase
    await checkoutPage.clickPurchase();
    
    // Verifications (all through page methods)
    await checkoutPage.verifyConfirmationPopup();
    await checkoutPage.closeConfirmation();
    await homePage.verifyOnHomePage();
  });
});
```

#### TC4: Cart - Remove Item
```typescript
// File: tests/demoblaze/cart.spec.ts (add to existing file)
test('TC4 - Cart - when removing item - remaining items and total update correctly', async ({ page }) => {
  // Load test data from JSON
  const products = readJson('data/demoblaze/products.json');
  const phone = products.phones.sonyXperiaZ5;
  const laptop = products.laptops.macBookAir;
  
  // Setup: Add 2 products first
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);
  
  // Add first product
  await homePage.selectCategory(phone.category);
  await homePage.selectProduct(phone.name);
  await productPage.addToCart();
  await homePage.clickHomeInNavbar();
  
  // Add second product
  await homePage.selectCategory(laptop.category);
  await homePage.selectProduct(laptop.name);
  await productPage.addToCart();
  
  // Steps 1-2: Go to cart and verify both items
  await homePage.navigateToCart();
  await cartPage.verifyItemCount(2);
  
  // Step 3: Remove one item
  await cartPage.removeItem(phone.name);
  
  // Verifications (all through page methods)
  await cartPage.verifyItemNotInCart(phone.name);
  await cartPage.verifyItemInCart(laptop.name);
  await cartPage.verifyItemCount(1);
});
```

#### TC5: Full Shopping Flow
```typescript
// File: tests/demoblaze/full-flow.spec.ts
import { test } from '@playwright/test';
import { LoginPage } from '../../pages/demoblaze/auth/login-page';
import { HomePage } from '../../pages/demoblaze/home/home-page';
import { ProductPage } from '../../pages/demoblaze/product/product-page';
import { CartPage } from '../../pages/demoblaze/cart/cart-page';
import { CheckoutPage } from '../../pages/demoblaze/cart/checkout-page';
import { readJson } from '../../utils/data-reader';

test.describe('Full Shopping Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.demoblaze.com/');
    
    // Clear cart for clean state
    const cartPage = new CartPage(page);
    await cartPage.navigateToCart();
    await cartPage.clearAllItems();
  });

  test('TC5 - Full Flow - when completing shopping journey - all steps execute successfully', async ({ page }) => {
    // Load test data from JSON files
    const users = readJson('data/demoblaze/users.json');
    const validUser = users.validUser;
    const products = readJson('data/demoblaze/products.json');
    const laptop = products.laptops.sonyVaioI5;
    const monitor = products.monitors.appleMonitor24;
    const checkoutData = readJson('data/demoblaze/checkout-info.json');
    const customer = checkoutData.customer2;
    
    // Initialize all page objects
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    
    // Step 1: Login with data from JSON
    await loginPage.openLoginModal();
    await loginPage.loginWithCredentials(validUser.username, validUser.password);
    
    // Steps 2-5: Add products from different categories
    await homePage.selectCategory(laptop.category);
    await homePage.selectProduct(laptop.name);
    await productPage.addToCart();
    
    await homePage.clickHomeInNavbar();
    await homePage.selectCategory(monitor.category);
    await homePage.selectProduct(monitor.name);
    await productPage.addToCart();
    
    // Step 6: Verify cart
    await homePage.navigateToCart();
    await cartPage.verifyItemCount(2);
    
    // Steps 7-8: Checkout with customer data from JSON
    await cartPage.clickPlaceOrder();
    await checkoutPage.fillCheckoutForm({
      name: customer.name,
      country: customer.country,
      city: customer.city,
      creditCard: customer.creditCard,
      month: customer.month,
      year: customer.year
    });
    await checkoutPage.clickPurchase();
    
    // Step 9: Confirm and close
    await checkoutPage.verifyConfirmationPopup();
    await checkoutPage.closeConfirmation();
    
    // Step 10: Logout
    await homePage.logout();
    
    // Verifications (all through page methods)
    await homePage.verifyOnHomePage();
  });
});
```

---

## 6. Test Data Management

### Data Generation Strategy

#### User Credentials
- **Storage**: `data/demoblaze/users.json`
- **Generation**: Pre-created test accounts stored in JSON
- **Format**:
  ```json
  {
    "validUser": {
      "username": "autouser_20251005_1234",
      "password": "autouser_20251005_1234"
    }
  }
  ```
- **Access**: Load via data reader utility at test setup

#### Product Data
- **Storage**: `data/demoblaze/products.json`
- **Generation**: Static list of known products with expected attributes
- **Format**:
  ```json
  {
    "phones": [
      { "name": "Samsung galaxy s6", "category": "Phones" },
      { "name": "Sony xperia z5", "category": "Phones" }
    ],
    "laptops": [
      { "name": "MacBook Pro", "category": "Laptops" },
      { "name": "Sony vaio i5", "category": "Laptops" }
    ],
    "monitors": [
      { "name": "Apple monitor 24", "category": "Monitors" }
    ]
  }
  ```
- **Access**: Load at test setup, pass product names to page methods

#### Checkout Information
- **Storage**: `data/demoblaze/checkout-info.json`
- **Generation**: Multiple customer profiles for different test scenarios
- **Format**:
  ```json
  {
    "customer1": {
      "name": "John Doe",
      "country": "USA",
      "city": "New York",
      "creditCard": "4111111111111111",
      "month": "12",
      "year": "2025"
    },
    "customer2": {
      "name": "Anna",
      "country": "VN",
      "city": "HCM",
      "creditCard": "12345678",
      "month": "01",
      "year": "2026"
    }
  }
  ```
- **Access**: Load and select customer profile based on test case

### Managing Test State Between Runs

#### Cart State
- **Issue**: Cart may persist between test runs if not cleared
- **Solution**:
  - Use `test.beforeEach()` to ensure starting state
  - Clear cart programmatically if items exist
  - Alternatively, use browser storage clearing:
    ```typescript
    await page.context().clearCookies();
    await page.evaluate(() => localStorage.clear());
    ```

#### Authentication State
- **Issue**: Login sessions may persist
- **Solution**:
  - Start each test with fresh browser context (Playwright default)
  - Explicitly logout at test teardown if needed
  - Use `test.afterEach()` to clean up

#### Order History
- **Issue**: Previous orders may affect test data
- **Solution**:
  - Tests should not depend on order history
  - Focus on current session actions only

### Handling Environmental Dependencies

#### Base URL Configuration
- **Strategy**: Use environment variables or Playwright config
- **Implementation**:
  ```typescript
  // playwright.config.ts
  use: {
    baseURL: process.env.BASE_URL || 'https://www.demoblaze.com',
  }
  
  // In tests
  await page.goto('/'); // Uses baseURL
  ```

#### Test Environment Selection
- **Strategy**: Use `TEST_ENV` environment variable to switch data sets
- **Implementation**:
  ```typescript
  const env = process.env.TEST_ENV || 'default';
  const userData = loadData(`data/demoblaze/${env}/users.json`);
  ```

#### Browser Configuration
- **Strategy**: Use Playwright config for browser settings
- **No changes needed**: Current setup is sufficient

### Cleanup Procedures

#### Test-Level Cleanup
```typescript
test.afterEach(async ({ page }) => {
  // Logout if logged in
  const navigationBar = new NavigationBar(page);
  if (await navigationBar.isLoggedIn()) {
    await navigationBar.clickLogout();
  }
  
  // Take screenshot on failure
  if (test.info().status !== 'passed') {
    await page.screenshot({ path: `screenshots/${test.info().title}.png` });
  }
});
```

#### Suite-Level Cleanup
```typescript
test.afterAll(async () => {
  // Clean up any resources if needed
  // (Playwright handles browser cleanup automatically)
});
```

#### Storage Cleanup
```typescript
test.beforeEach(async ({ context }) => {
  // Clear storage for fresh state
  await context.clearCookies();
  await context.clearPermissions();
});
```

---

## 7. Verification Approach

### General Verification Strategy
- **Use `expect.soft` for all verifications** to ensure complete test execution and comprehensive reporting
- Group related assertions together for better readability
- Add descriptive messages to assertions for clear failure reporting
- Verify both positive and negative conditions where applicable

### 1. Navigation Events Verification

#### URL Verification
```typescript
// Verify exact URL
await expect.soft(page).toHaveURL('https://www.demoblaze.com/index.html');

// Verify URL pattern
await expect.soft(page).toHaveURL(/cart\.html$/);
```

#### Page Load Verification
```typescript
// Verify key element presence after navigation
await expect.soft(homePage.categoryPhones).toBeVisible({ timeout: 5000 });
```

#### Modal Display Verification
```typescript
// Verify login modal appears
await expect.soft(loginPage.loginModal).toBeVisible();

// Verify modal closes after action
await expect.soft(loginPage.loginModal).toBeHidden();
```

**Example from TC1 (Login)**:
```typescript
// Verification 1: Modal closes, user stays on Home page
await expect.soft(loginPage.loginModal).toBeHidden();
await expect.soft(page).toHaveURL(/index\.html/);
```

### 2. UI State Verification

#### Element Visibility
```typescript
// Verify element is visible
await expect.soft(navigationBar.logoutButton).toBeVisible();

// Verify element is hidden
await expect.soft(navigationBar.loginButton).toBeHidden();
```

#### Element State (Enabled/Disabled)
```typescript
// Verify button is enabled
await expect.soft(cartPage.placeOrderButton).toBeEnabled();

// Verify input is editable
await expect.soft(checkoutPage.nameInput).toBeEditable();
```

#### Element Presence
```typescript
// Verify element exists in DOM
await expect.soft(page.locator(`text="${productName}"`)).toBeAttached();

// Verify element count
await expect.soft(cartPage.cartItemRows).toHaveCount(2);
```

**Example from TC1 (Login)**:
```typescript
// Verification 3: Display [Log out] button
await expect.soft(navigationBar.logoutButton).toBeVisible();

// Verification 4: Hide [Log in] button
await expect.soft(navigationBar.loginButton).toBeHidden();
```

### 3. Text Validation

#### Exact Text Match
```typescript
// Verify exact text content
await expect.soft(navigationBar.welcomeMessage).toHaveText('Welcome autouser_20251005_1234');
```

#### Partial Text Match
```typescript
// Verify text contains substring
await expect.soft(confirmationPopup.message).toContainText('Thank you for your purchase');
```

#### Text Extraction and Validation
```typescript
// Extract and verify text value
const welcomeText = await navigationBar.getWelcomeMessage();
await expect.soft(welcomeText).toContain('autouser_20251005_1234');
```

**Example from TC1 (Login)**:
```typescript
// Verification 2: Navbar shows text "Welcome autouser_20251005_1234"
const welcomeText = await navigationBar.getWelcomeMessage();
await expect.soft(welcomeText).toBe('Welcome autouser_20251005_1234');
```

### 4. Error Message Validation

#### Alert Verification
```typescript
// Listen for and verify alert
page.on('dialog', async (dialog) => {
  await expect.soft(dialog.message()).toBe('Product added.');
  await dialog.accept();
});
```

#### Error Message Display
```typescript
// Verify error message appears
await expect.soft(loginPage.errorMessage).toBeVisible();
await expect.soft(loginPage.errorMessage).toHaveText('User does not exist.');
```

**Note**: Current test cases don't include error scenarios, but this approach should be used for negative testing.

### 5. Email Verification (Not Applicable)

- The current test cases do not include email verification
- If future tests require email validation, consider:
  - Using email testing services (e.g., MailSlurp, Mailtrap)
  - Verifying email subject, body, and recipient
  - Using `expect.soft` for all email-related assertions

### 6. Popup/Modal Verification

#### Modal Appearance
```typescript
// Verify modal is displayed
await expect.soft(checkoutPage.checkoutModal).toBeVisible();
```

#### Modal Content
```typescript
// Verify confirmation message
await expect.soft(checkoutPage.confirmationMessage).toHaveText('Thank you for your purchase!');

// Verify order details are displayed
const orderDetails = await checkoutPage.getOrderConfirmation();
await expect.soft(orderDetails.orderId).toBeTruthy();
await expect.soft(orderDetails.amount).toBeGreaterThan(0);
```

#### Modal Interaction
```typescript
// Click button and verify modal closes
await checkoutPage.closeConfirmation();
await expect.soft(checkoutPage.confirmationPopup).toBeHidden();
```

**Example from TC3 (Checkout)**:
```typescript
// Verification 1: Confirmation popup displayed with message
await expect.soft(checkoutPage.confirmationPopup).toBeVisible();
await expect.soft(checkoutPage.confirmationMessage).toContainText('Thank you for your purchase!');

// Verification 2: Display Order ID and Amount
const confirmation = await checkoutPage.getOrderConfirmation();
await expect.soft(confirmation.orderId).toBeTruthy();
await expect.soft(confirmation.amount).toBeGreaterThan(0);
```

### 7. Data Validation (Cart and Totals)

#### Product List Verification
```typescript
// Verify products in cart
const cartItems = await cartPage.getCartItems();
await expect.soft(cartItems.length).toBe(2);
await expect.soft(cartItems[0].name).toBe('Samsung galaxy s6');
await expect.soft(cartItems[1].name).toBe('MacBook Pro');
```

#### Price Verification
```typescript
// Verify individual product prices
await expect.soft(cartItems[0].price).toBe(360);
await expect.soft(cartItems[1].price).toBe(1100);
```

#### Total Calculation Verification
```typescript
// Verify total equals sum of product prices
const expectedTotal = cartItems.reduce((sum, item) => sum + item.price, 0);
const actualTotal = await cartPage.getTotalPrice();
await expect.soft(actualTotal).toBe(expectedTotal);
```

**Example from TC2 (Cart - Add Multiple Items)**:
```typescript
// Verification 1: Cart page displays 2 products
const cartItems = await cartPage.getCartItems();
await expect.soft(cartItems.length).toBe(2);

// Verification 2: Display correct prices for each item
await expect.soft(cartItems[0].name).toBe('Samsung galaxy s6');
await expect.soft(cartItems[1].name).toBe('MacBook Pro');

// Verification 3: Total = sum of product prices
const total = await cartPage.getTotalPrice();
const expectedTotal = cartItems[0].price + cartItems[1].price;
await expect.soft(total).toBe(expectedTotal);
```

### 8. Soft Assertions Usage

**Why use `expect.soft`?**
- Allows test to continue executing even after assertion failure
- Collects all failures in a single test run
- Provides comprehensive reporting of all issues
- Improves test efficiency by reducing re-runs

**Best Practices**:
```typescript
// Good: Multiple soft assertions
await expect.soft(element1).toBeVisible();
await expect.soft(element2).toHaveText('Expected Text');
await expect.soft(element3).toBeEnabled();

// Avoid: Mixing soft and hard assertions unless necessary
await expect.soft(element1).toBeVisible(); // Continues on failure
await expect(element2).toBeVisible(); // Stops on failure (hard assertion)
```

**When to use hard assertions**:
- Critical preconditions that must pass for test to continue meaningfully
- Example: If page navigation fails, no point checking page content

**Example Pattern**:
```typescript
// Hard assertion for critical navigation
await expect(page).toHaveURL(/index\.html/);

// Soft assertions for multiple verifications
await expect.soft(navigationBar.logoutButton).toBeVisible();
await expect.soft(navigationBar.loginButton).toBeHidden();
await expect.soft(navigationBar.welcomeMessage).toContainText(username);
```

---

## 8. Special Considerations

### 1. Internationalization Aspects

**Current Status**: 
- Test cases do not explicitly mention Japanese text or internationalization requirements
- The Demoblaze application appears to be English-only based on the test case descriptions

**Recommendations**:
- Monitor for any language-specific elements during implementation
- If internationalization is needed in the future:
  - Store localized test data in separate JSON files (e.g., `data/demoblaze/en/`, `data/demoblaze/ja/`)
  - Use Unicode-safe string comparison for assertions
  - Handle right-to-left (RTL) languages if applicable

**Implementation Note**:
```typescript
// If Japanese text appears in buttons/errors
const expectedText = '購入する'; // "Purchase" in Japanese
await expect.soft(button).toHaveText(expectedText);
```

### 2. Timing and Synchronization Considerations

#### Alert Handling
**Challenge**: JavaScript alerts must be handled immediately upon appearance

**Solution**:
```typescript
// Set up alert handler before triggering action
page.on('dialog', async (dialog) => {
  console.log(`Alert message: ${dialog.message()}`);
  await dialog.accept();
});

// Then trigger action that produces alert
await productPage.addToCart();
```

**Best Practice**: Wrap alert handling in page object methods:
```typescript
// In ProductPage.addToCart()
async addToCart(): Promise<void> {
  this.page.once('dialog', async (dialog) => {
    await dialog.accept();
  });
  await this.click(this.locators.addToCartButton);
  await this.page.waitForTimeout(500); // Brief wait for alert to be handled
}
```

#### Modal Loading
**Challenge**: Modals may take time to fully render before interaction is possible

**Solution**:
```typescript
// Wait for modal to be visible
await this.waitForVisible(this.locators.loginModal);

// Wait for modal content to be ready
await this.page.waitForLoadState('networkidle');

// Wait for specific element within modal
await this.waitForVisible(this.locators.usernameInput);
```

#### Dynamic Content Loading
**Challenge**: Product lists and cart items are loaded dynamically

**Solution**:
```typescript
// Wait for product list to update after category selection
await this.click(this.locators.categoryLaptops);
await this.page.waitForLoadState('networkidle');
await this.waitForVisible(this.locators.productLinks.first());
```

#### Cart Updates
**Challenge**: Cart total may recalculate asynchronously after item removal

**Solution**:
```typescript
// After removing item, wait for UI to update
await this.click(deleteButton);
await this.waitForDetached(productRow);
await this.page.waitForTimeout(500); // Allow total to recalculate
const newTotal = await this.getTotalPrice();
```

### 3. Environment-Specific Configurations

#### Base URL
- **Configuration**: Use `playwright.config.ts` to set `baseURL`
- **Override**: Allow environment variable to override for different environments
  ```typescript
  use: {
    baseURL: process.env.BASE_URL || 'https://www.demoblaze.com',
  }
  ```

#### Timeout Settings
- **Default**: Use existing DEFAULT_TIMEOUT (20000ms) from CommonPage
- **Adjust if needed**: For slower environments, increase timeout globally:
  ```typescript
  use: {
    actionTimeout: 30000,
    navigationTimeout: 30000,
  }
  ```

#### Browser Configuration
- **Headless Mode**: Run headless in CI/CD, headed for debugging
  ```typescript
  use: {
    headless: process.env.CI ? true : false,
  }
  ```

#### Viewport Size
- **Setting**: Ensure consistent viewport for screenshot comparisons
  ```typescript
  use: {
    viewport: { width: 1280, height: 720 },
  }
  ```

### 4. Error Handling Approach

#### Page Object Error Handling
```typescript
// Graceful error handling in page methods
async loginWithCredentials(username: string, password: string): Promise<void> {
  try {
    await this.fill(this.locators.usernameInput, username);
    await this.fill(this.locators.passwordInput, password);
    await this.click(this.locators.submitButton);
    await this.waitForDetached(this.locators.loginModal);
  } catch (error) {
    console.error('Login failed:', error);
    await this.takeScreenshot('login-failure');
    throw error; // Re-throw to fail test
  }
}
```

#### Test-Level Error Handling
```typescript
test('TC1: Login - Valid Login', async ({ page }) => {
  try {
    // Test steps
  } catch (error) {
    // Screenshot already taken by afterEach hook
    console.error('Test failed:', error);
    throw error;
  }
});
```

#### Retry Strategy
- **Configuration**: Use Playwright's built-in retry mechanism
  ```typescript
  // playwright.config.ts
  retries: process.env.CI ? 2 : 0,
  ```
- **Selective Retry**: Use `test.describe.configure()` for flaky test suites
  ```typescript
  test.describe.configure({ retries: 2 });
  ```

### 5. Special Element Handling

#### Dynamic Selectors
**Challenge**: Product names and prices may need dynamic selector construction

**Solution - Handle in Page Object Methods (NOT in Locator Classes)**:
```typescript
// ❌ WRONG - Dynamic locator method in locator class
export class ProductLocators extends CommonLocators {
  productByName(name: string): Locator {
    return this.page.locator(`//a[text()="${name}"]`);
  }
}

// ✅ CORRECT - Dynamic locator in page method using XPath
export class HomePage extends CommonPage {
  async selectProduct(productName: string): Promise<void> {
    // Create dynamic locator using XPath with template literal
    const productLocator = this.page.locator(`//a[contains(text(), "${productName}")]`);
    await this.click(productLocator);
  }
}

// ✅ CORRECT - Dynamic delete button for cart items
export class CartPage extends CommonPage {
  async removeItem(productName: string): Promise<void> {
    // Use XPath to find delete button for specific product
    const deleteButton = this.page.locator(
      `//tr[td[contains(text(), "${productName}")]]//a[text()="Delete"]`
    );
    await this.click(deleteButton);
  }
}
```

**Key Principles**:
- **NO dynamic methods in locator classes** - only static property declarations
- **Use XPath with string interpolation** in page object methods for dynamic elements
- Leverage XPath's powerful text matching and hierarchy navigation
- Keep locator classes simple with only `initializeLocators()` method

#### Shadow DOM (if present)
**Note**: Demoblaze doesn't use Shadow DOM, but if encountered:
```typescript
await page.locator('pierce=#shadow-element').click();
```

#### Iframes (if present)
**Note**: Not expected in Demoblaze, but if needed:
```typescript
const frame = page.frameLocator('iframe[name="frameName"]');
await frame.locator('button').click();
```

### 6. Test Data Variability

**Challenge**: Product prices may change on the live site

**Solution**:
- **Option 1**: Don't assert on exact prices, only verify they are present and numeric
  ```typescript
  await expect.soft(price).toBeGreaterThan(0);
  ```
- **Option 2**: Update test data periodically to match current prices
- **Option 3**: Use relative comparisons (e.g., total equals sum of item prices)

### 7. Network Conditions

**Consideration**: Handle slow network or intermittent connectivity

**Solution**:
```typescript
// Increase timeout for slow networks
test.setTimeout(60000); // 1 minute timeout

// Use waitForLoadState to ensure page is ready
await page.waitForLoadState('networkidle');
```

---

## 9. Quality Assurance

### 1. Peer Review Process

#### Pre-Implementation Review
- **Review this test plan** with team members before starting implementation
- Ensure all stakeholders agree on page object structure and test organization
- Validate that test data and preconditions are clearly defined

#### Implementation Review
- **Code reviews for all page objects and test files** before merging
- Review checklist:
  - [ ] Page object extends `CommonPage` correctly
  - [ ] Locator class extends `CommonLocators` and uses `initializeLocators()`
  - [ ] Methods use descriptive names and follow naming conventions
  - [ ] Methods return appropriate page objects for navigation patterns
  - [ ] All interactions use inherited `CommonPage` methods (not direct Playwright calls)
  - [ ] Comments explain complex logic
  - [ ] No hardcoded test data in page objects (use parameters)

#### Test Script Review
- **Review test scripts** for:
  - [ ] Correct test case ID in test name
  - [ ] All steps from test case are implemented
  - [ ] All expected results are verified with `expect.soft`
  - [ ] Proper use of fixtures for preconditions
  - [ ] Clear test flow with comments for each major section
  - [ ] Appropriate assertions with descriptive messages

### 2. Validation Criteria for Completed Scripts

#### Functional Criteria
- [ ] Test executes without runtime errors
- [ ] All test steps are implemented according to test case specification
- [ ] All expected results are verified with assertions
- [ ] Test passes when application behaves correctly
- [ ] Test fails appropriately when application has defects

#### Code Quality Criteria
- [ ] Code follows TypeScript best practices
- [ ] No linting errors (`npm run lint` passes)
- [ ] Type safety maintained (no `any` types unless necessary)
- [ ] No duplicate code (DRY principle)
- [ ] Methods are small and focused (single responsibility)

#### Maintainability Criteria
- [ ] Locators are defined in separate locator files
- [ ] Page objects are reusable across multiple tests
- [ ] Test data is externalized (not hardcoded)
- [ ] Comments explain "why", not "what"
- [ ] Variable and method names are self-documenting

#### Robustness Criteria
- [ ] Test handles timing issues gracefully (proper waits)
- [ ] Test cleans up after itself (logout, clear state)
- [ ] Test takes screenshot on failure
- [ ] Test uses appropriate timeouts
- [ ] Test retries on flaky failures (if configured)

### 3. Documentation Requirements

#### Page Object Documentation
Each page object class should include:
```typescript
/**
 * LoginPage handles all interactions with the login modal.
 * 
 * This page object manages:
 * - Opening the login modal from navbar
 * - Filling login credentials
 * - Submitting the form
 * - Verifying modal state
 * 
 * @extends CommonPage
 * @uses LoginLocators
 */
export class LoginPage extends CommonPage {
  // ...
}
```

#### Method Documentation
```typescript
/**
 * Logs in with provided credentials and waits for modal to close.
 * 
 * @param username - User's username
 * @param password - User's password
 * @returns Promise that resolves when login is complete and modal is closed
 * @throws Error if login fails or modal doesn't close within timeout
 */
async loginWithCredentials(username: string, password: string): Promise<void> {
  // ...
}
```

#### Test Documentation
```typescript
/**
 * TC1: Login - Valid Login
 * 
 * Verifies that a user can successfully log in with valid credentials.
 * 
 * Test Steps:
 * 1. Click [Log in] button in navbar
 * 2. Enter valid username and password
 * 3. Click [Log in] button in modal
 * 
 * Expected Results:
 * 1. Modal closes, user stays on Home page
 * 2. Navbar shows "Welcome <username>"
 * 3. [Log out] button is visible
 * 4. [Log in] button is hidden
 */
test('TC1: Login - Valid Login', async ({ page }) => {
  // ...
});
```

#### README Updates
- Update project README with:
  - [ ] How to run Demoblaze tests
  - [ ] Test data requirements
  - [ ] Environment variables needed
  - [ ] Known issues or limitations

### 4. Maintenance Considerations

#### Locator Maintenance
- **Strategy**: When application UI changes, update locators in one place
- **Best Practice**: Use stable locators (test IDs) when possible
- **Documentation**: Document why specific locators were chosen
- **Fallback**: Have backup locators (e.g., by text if ID changes)

```typescript
// Good: Multiple selector options
get usernameInput(): Locator {
  return this.page.locator('#loginusername, input[name="username"]');
}
```

#### Test Data Maintenance
- **Review Schedule**: Review and update test data quarterly
- **Validation**: Verify product names and prices are current
- **Documentation**: Document when test data was last validated

#### Code Refactoring
- **DRY Violations**: Regularly review for repeated code patterns
- **Helper Methods**: Extract common test patterns into utilities
- **Page Object Optimization**: Combine similar methods when appropriate

#### Version Control
- **Branching**: Use feature branches for new test development
- **Commit Messages**: Follow conventional commit format
  ```
  feat(demoblaze): add login page object and test
  fix(cart): correct total calculation verification
  docs(plan): update test plan with new requirements
  ```

### 5. Test Execution and Reporting

#### Execution Strategy
```bash
# Run all demoblaze tests
npx playwright test tests/demoblaze/

# Run specific test file
npx playwright test tests/demoblaze/login.spec.ts

# Run with UI mode for debugging
npx playwright test --ui

# Run in headed mode
npx playwright test --headed
```

#### Reporting
- **HTML Report**: Use Playwright's built-in HTML reporter
  ```typescript
  // playwright.config.ts
  reporter: [
    ['html', { outputFolder: 'reports/playwright-report' }],
    ['json', { outputFile: 'reports/test-results.json' }],
    ['junit', { outputFile: 'reports/junit.xml' }]
  ]
  ```

- **Allure Report**: If using Allure (already configured)
  ```bash
  npx playwright test --reporter=allure-playwright
  allure generate allure-results -o allure-report
  allure open allure-report
  ```

#### Continuous Integration
- **CI Pipeline**: Integrate tests into CI/CD pipeline
- **Failure Notifications**: Configure alerts for test failures
- **Test Reports**: Publish reports as CI artifacts
- **Scheduled Runs**: Run regression suite nightly

### 6. Knowledge Transfer

#### Onboarding New Team Members
- **Walkthrough**: Provide guided tour of test structure
- **Pair Programming**: Implement 1-2 tests together
- **Documentation**: Ensure this test plan is accessible and updated

#### Training Materials
- Create quick reference guide for:
  - [ ] Page object creation
  - [ ] Locator definition
  - [ ] Test writing patterns
  - [ ] Running and debugging tests

### 7. Success Metrics

#### Coverage Metrics
- [ ] All 5 test cases implemented
- [ ] All page objects created and tested
- [ ] All critical user flows covered

#### Quality Metrics
- [ ] Test pass rate > 95% on stable environment
- [ ] No flaky tests (consistent pass/fail)
- [ ] Code coverage > 80% for page objects

#### Efficiency Metrics
- [ ] Test execution time < 5 minutes for full suite
- [ ] Test development velocity: ~1 test case per day
- [ ] Bug detection rate: Catch 90%+ of UI regressions

---

## Appendix

### A. Line Break Handling Examples

Test case steps and expected results contain `</br>` tags indicating separate actions:

**Example from TC2:**
```
Step 1: From Home page, click category [Phones]</br>
        2. Click product "Samsung galaxy s6"</br>
        3. Click [Add to cart], accept alert
```

**Implementation:**
```typescript
// Step 1
await homePage.selectCategory('Phones');

// Step 2
const productPage = await homePage.selectProduct('Samsung galaxy s6');

// Step 3
await productPage.addToCart(); // Handles alert internally
```

Each line after `</br>` should be treated as a distinct step in the test implementation.

### B. Reference Links

- **Demoblaze Application**: https://www.demoblaze.com/
- **Playwright Documentation**: https://playwright.dev/
- **Project Repository**: (Add link if available)

### C. Glossary

- **Fixture**: Playwright test setup function that provides test context (e.g., page, browser)
- **Locator**: Playwright object representing a way to find element(s) on the page
- **Page Object**: Design pattern that encapsulates page interactions in a class
- **Soft Assertion**: Assertion that doesn't stop test execution on failure (using `expect.soft`)
- **Modal**: Overlay dialog that requires user interaction before returning to main page

---

## Summary: Critical Implementation Rules

### 1. Page Object Model (POM) Compliance

**MUST Follow:**
- ✅ ALL interactions must be in page object methods
- ✅ ALL verifications must be in page object methods
- ✅ Test files should ONLY call page object methods
- ❌ NO `page.click()`, `page.fill()`, `page.locator()` in test files
- ❌ NO `expect()` assertions directly in test files

### 2. Locator Class Structure

**MUST Follow ButtonLocators Pattern:**
```typescript
export class YourLocators extends CommonLocators {
  property!: Locator;  // Declare with !
  
  constructor(page: Page) {
    super(page);
    this.initializeLocators();  // Call initialization
  }
  
  protected initializeLocators(): void {
    super.initializeLocators();
    this.property = this.page.locator('//xpath');  // Use XPath
  }
}
```

### 3. Page Class Structure

**MUST Follow CheckBoxPage Pattern:**
```typescript
export class YourPage extends CommonPage {
  readonly locators: YourLocators;
  
  constructor(page: Page) {
    super(page);
    this.locators = new YourLocators(page);  // Initialize locators
  }
  
  // Action and verification methods using this.locators
}
```

### 4. XPath Requirements

**MUST:**
- ✅ Use XPath for ALL locators: `//button[@id="login"]`
- ✅ Handle dynamic locators in page methods: `this.page.locator(\`//a[text()="${name}"]\`)`
- ❌ NO CSS selectors: `button#login`
- ❌ NO dynamic locator methods in locator classes

### 5. File Organization

**Structure:**
```
pages/demoblaze/
  auth/login-page.ts
  home/home-page.ts
  product/product-page.ts
  cart/cart-page.ts, checkout-page.ts

locators/demoblaze/
  login-locators.ts (NO index.ts)
  home-locators.ts
  product-locators.ts
  cart-locators.ts
  checkout-locators.ts
```

### 6. Test Hooks

**MUST have in every test file:**
```typescript
test.beforeEach(async ({ page }) => {
  await page.goto('https://www.demoblaze.com/');
  
  // REQUIRED: Clear cart for clean state
  const cartPage = new CartPage(page);
  await cartPage.navigateToCart();
  await cartPage.clearAllItems();
});
```

### 7. Test Naming Convention

**Format:**
```typescript
test('TestcaseID - feature - condition - expected outcome', async ({ page }) => {
  // Test implementation using ONLY page object methods
});
```

**Example:**
```typescript
test('TC001 - Login - when using valid credentials - user is authenticated successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.openLoginModal();
  await loginPage.loginWithCredentials('user', 'pass');
  await loginPage.verifyLoginModalHidden();
});
```

---

**Document Version**: 2.0  
**Last Updated**: 2025-10-27  
**Status**: Ready for Implementation  
**Changes**: 
- Updated folder structure for pages (auth/, home/, product/, cart/)
- Removed index.ts from locators folder
- Added mandatory XPath requirement for all locators
- Removed dynamic locator methods from locator classes
- Added Page Object Model compliance rules
- Added ButtonLocators and CheckBoxPage reference patterns
- Added mandatory clearCart() in beforeEach hooks
- Added complete code examples following correct patterns

