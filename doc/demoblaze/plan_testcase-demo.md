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
- Format: `test('TC<ID>: <Feature> - <Scenario>', async ({ fixtures }) => { ... })`
- Examples:
  - `test('TC1: Login - Valid Login', async ({ loginPage, page }) => { ... })`
  - `test('TC2: Cart - Add Multiple Items', async ({ homePage, cartPage }) => { ... })`
- **Pattern**: Start with test case ID, followed by feature and specific scenario

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
├── index.ts                     # Export all page objects
├── login-page.ts                # Login modal interactions
├── home-page.ts                 # Home page with categories and products
├── product-page.ts              # Product detail page
├── cart-page.ts                 # Shopping cart page
├── checkout-page.ts             # Checkout modal interactions
└── navigation-bar.ts            # Persistent navigation component
```

**Key Principles:**
- Each page object extends `CommonPage`
- Each page object imports and uses its corresponding locator class
- Page objects focus on business-level methods, not low-level interactions
- Page objects should return other page objects when navigation occurs (fluent API)

### Locator Organization

```
locators/demoblaze/
├── index.ts                     # Export all locator classes
├── login-locators.ts            # Login modal selectors
├── home-locators.ts             # Home page selectors
├── product-locators.ts          # Product page selectors
├── cart-locators.ts             # Cart page selectors
├── checkout-locators.ts         # Checkout modal selectors
└── navigation-locators.ts       # Navigation bar selectors
```

**Key Principles:**
- All locator classes extend `CommonLocators`
- Override `initializeLocators()` method to define page-specific selectors
- Use descriptive property names for locators (e.g., `loginButton`, `usernameInput`)
- Group related locators logically (e.g., all form fields together)
- **Locators must be in separate files, never inline in page objects**

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
└── checkout-info.json           # Checkout form data variations
```

#### Data Access
- Use existing `dataReader.ts` utility (if available) or create JSON loader
- Load data at test setup/beforeEach hook
- Pass data as parameters to page object methods

#### Data Structure
```typescript
// Example: users.json
{
  "validUser": {
    "username": "autouser_20251005_1234",
    "password": "autouser_20251005_1234"
  }
}

// Example: products.json
{
  "phones": [
    { "name": "Samsung galaxy s6", "expectedPrice": 360 },
    { "name": "Sony xperia z5", "expectedPrice": 320 }
  ],
  "laptops": [
    { "name": "MacBook Pro", "expectedPrice": 1100 },
    { "name": "Sony vaio i5", "expectedPrice": 790 }
  ]
}

// Example: checkout-info.json
{
  "customer1": {
    "name": "John Doe",
    "country": "USA",
    "city": "New York",
    "creditCard": "4111111111111111",
    "month": "12",
    "year": "2025"
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
});
```

**Recommended Approach**: Combination of fixtures for authentication state and helper methods for cart setup.

---

## 4. Page Objects Definition

### 4.1 LoginPage (Login Modal)

**Locator File**: `login-locators.ts`

**Purpose**: Handle all interactions with the login modal dialog.

**Methods**:
1. `openLoginModal(): Promise<void>`
   - Clicks the "Log in" button in navbar to open modal
   - Waits for modal to be visible
   - **Navigation**: Stays on current page, modal appears

2. `loginWithCredentials(username: string, password: string): Promise<void>`
   - Fills username and password fields
   - Clicks the modal's "Log in" button
   - Waits for modal to close
   - **Navigation**: Returns to previous page with authenticated state

3. `closeModal(): Promise<void>`
   - Clicks the close button (X) or backdrop
   - Waits for modal to be hidden

4. `isLoginModalVisible(): Promise<boolean>`
   - Checks if login modal is currently displayed

**Locators** (defined in `login-locators.ts`):
```typescript
// Extends CommonLocators
protected initializeLocators(): void {
  super.initializeLocators();
  this.loginModalButton = // Navbar "Log in" button selector
  this.loginModal = // Modal container selector
  this.usernameInput = // Username input field
  this.passwordInput = // Password input field
  this.submitButton = // Modal "Log in" button
  this.closeButton = // Modal close button
}
```

**Expected Assertions**:
- After `loginWithCredentials()`: Verify modal is hidden, welcome message appears, logout button visible

---

### 4.2 HomePage

**Locator File**: `home-locators.ts`

**Purpose**: Handle product browsing, category navigation, and product selection on the home page.

**Methods**:
1. `navigateToHome(): Promise<void>`
   - Navigates to https://www.demoblaze.com/
   - Waits for page load and key elements
   - **Navigation**: Lands on HomePage

2. `selectCategory(categoryName: 'Phones' | 'Laptops' | 'Monitors'): Promise<void>`
   - Clicks on the specified category link
   - Waits for product list to update
   - **Navigation**: Stays on HomePage, product list filtered

3. `selectProduct(productName: string): Promise<ProductPage>`
   - Clicks on a product link by name
   - Waits for product detail page to load
   - **Navigation**: Navigates to ProductPage, returns ProductPage instance

4. `clickHomeInNavbar(): Promise<void>`
   - Clicks "Home" link in navbar
   - Waits for home page to reload
   - **Navigation**: Refreshes HomePage

5. `isProductDisplayed(productName: string): Promise<boolean>`
   - Checks if a product with the given name is visible in the current list

**Locators** (defined in `home-locators.ts`):
```typescript
protected initializeLocators(): void {
  super.initializeLocators();
  this.categoryPhones = // "Phones" category link
  this.categoryLaptops = // "Laptops" category link
  this.categoryMonitors = // "Monitors" category link
  this.productLinks = // All product name links
  this.productByName = (name: string) => // Dynamic product link by name
  this.homeLink = // "Home" link in navbar
}
```

**Expected Assertions**:
- After `selectCategory()`: Verify products from that category are displayed
- After `selectProduct()`: Verify product detail page URL/title

---

### 4.3 ProductPage

**Locator File**: `product-locators.ts`

**Purpose**: Handle product detail viewing and adding products to cart.

**Methods**:
1. `addToCart(): Promise<void>`
   - Clicks "Add to cart" button
   - Waits for and accepts JavaScript alert
   - **Navigation**: Stays on ProductPage

2. `getProductName(): Promise<string>`
   - Returns the product name displayed on the page

3. `getProductPrice(): Promise<number>`
   - Returns the product price as a number

4. `isAddToCartButtonVisible(): Promise<boolean>`
   - Checks if "Add to cart" button is displayed

**Locators** (defined in `product-locators.ts`):
```typescript
protected initializeLocators(): void {
  super.initializeLocators();
  this.productName = // Product title/name element
  this.productPrice = // Product price element
  this.addToCartButton = // "Add to cart" button
}
```

**Expected Assertions**:
- After `addToCart()`: Verify alert appears with success message, verify cart count increases (if tracked)

**Alert Handling**:
```typescript
// Use Playwright's dialog handler
page.on('dialog', async (dialog) => {
  await dialog.accept();
});
```

---

### 4.4 CartPage

**Locator File**: `cart-locators.ts`

**Purpose**: Display cart contents, manage items, and initiate checkout.

**Methods**:
1. `navigateToCart(): Promise<void>`
   - Clicks "Cart" link in navbar
   - Waits for cart page to load
   - **Navigation**: Navigates to CartPage

2. `getCartItems(): Promise<Array<{ name: string; price: number }>>`
   - Returns array of cart items with names and prices

3. `getTotalPrice(): Promise<number>`
   - Returns the calculated total price from the cart

4. `removeItem(productName: string): Promise<void>`
   - Clicks "Delete" link for specified product
   - Waits for item to be removed from DOM
   - **Navigation**: Stays on CartPage

5. `clickPlaceOrder(): Promise<CheckoutPage>`
   - Clicks "Place Order" button
   - Waits for checkout modal to appear
   - **Navigation**: Stays on CartPage, checkout modal appears, returns CheckoutPage instance

6. `isItemInCart(productName: string): Promise<boolean>`
   - Checks if specified product is in the cart

7. `getItemCount(): Promise<number>`
   - Returns the number of items in the cart

**Locators** (defined in `cart-locators.ts`):
```typescript
protected initializeLocators(): void {
  super.initializeLocators();
  this.cartItemRows = // All cart item rows
  this.itemName = // Product name in cart row
  this.itemPrice = // Product price in cart row
  this.deleteButton = // "Delete" link (may need dynamic selector by product)
  this.deleteButtonByProduct = (name: string) => // Delete button for specific product
  this.totalPrice = // Total price element
  this.placeOrderButton = // "Place Order" button
}
```

**Expected Assertions**:
- After `removeItem()`: Verify item not in cart, total updated
- After `clickPlaceOrder()`: Verify checkout modal visible

---

### 4.5 CheckoutPage (Checkout Modal)

**Locator File**: `checkout-locators.ts`

**Purpose**: Handle order placement form submission.

**Methods**:
1. `fillCheckoutForm(info: CheckoutInfo): Promise<void>`
   - Fills all form fields with provided data
   - **Navigation**: Stays on modal

2. `clickPurchase(): Promise<void>`
   - Clicks "Purchase" button
   - Waits for confirmation popup
   - **Navigation**: Checkout modal closes, confirmation popup appears

3. `getOrderConfirmation(): Promise<OrderConfirmation>`
   - Extracts order ID, amount, and other details from confirmation popup
   - Returns structured confirmation data

4. `closeConfirmation(): Promise<void>`
   - Clicks "OK" on confirmation popup
   - Waits for popup to close
   - **Navigation**: Returns to HomePage

5. `isCheckoutModalVisible(): Promise<boolean>`
   - Checks if checkout modal is displayed

**Locators** (defined in `checkout-locators.ts`):
```typescript
protected initializeLocators(): void {
  super.initializeLocators();
  this.checkoutModal = // Checkout modal container
  this.nameInput = // Name input field
  this.countryInput = // Country input field
  this.cityInput = // City input field
  this.creditCardInput = // Credit card input field
  this.monthInput = // Month input field
  this.yearInput = // Year input field
  this.purchaseButton = // "Purchase" button
  this.confirmationPopup = // Confirmation popup container
  this.confirmationMessage = // "Thank you for your purchase!" message
  this.orderDetails = // Order details text
  this.okButton = // "OK" button in confirmation
}
```

**Expected Assertions**:
- After `clickPurchase()`: Verify confirmation popup with "Thank you for your purchase!", order ID, amount
- After `closeConfirmation()`: Verify navigation to home page, cart empty

---

### 4.6 NavigationBar

**Locator File**: `navigation-locators.ts`

**Purpose**: Provide access to persistent navigation elements across all pages.

**Methods**:
1. `clickLogin(): Promise<void>`
   - Clicks "Log in" button in navbar
   - **Navigation**: Opens login modal

2. `clickLogout(): Promise<void>`
   - Clicks "Log out" button in navbar
   - Waits for logout to complete
   - **Navigation**: Returns to HomePage, unauthenticated state

3. `clickCart(): Promise<CartPage>`
   - Clicks "Cart" link in navbar
   - **Navigation**: Navigates to CartPage, returns CartPage instance

4. `clickHome(): Promise<HomePage>`
   - Clicks "Home" link in navbar
   - **Navigation**: Navigates to HomePage, returns HomePage instance

5. `getWelcomeMessage(): Promise<string>`
   - Returns the welcome message text (e.g., "Welcome autouser_20251005_1234")

6. `isLoggedIn(): Promise<boolean>`
   - Checks if "Log out" button is visible (indicates logged-in state)

7. `isLoginButtonVisible(): Promise<boolean>`
   - Checks if "Log in" button is visible

8. `isLogoutButtonVisible(): Promise<boolean>`
   - Checks if "Log out" button is visible

**Locators** (defined in `navigation-locators.ts`):
```typescript
protected initializeLocators(): void {
  super.initializeLocators();
  this.loginButton = // "Log in" button in navbar
  this.logoutButton = // "Log out" button in navbar
  this.cartLink = // "Cart" link in navbar
  this.homeLink = // "Home" link in navbar
  this.welcomeMessage = // Welcome message element (shows username)
}
```

**Expected Assertions**:
- After `clickLogout()`: Verify "Log in" button visible, "Log out" hidden, welcome message hidden

---

### Navigation Patterns Summary

| Current Page | Method Called | Resulting Page | Returns |
|--------------|---------------|----------------|---------|
| Any | `NavigationBar.clickHome()` | HomePage | `HomePage` |
| Any | `NavigationBar.clickCart()` | CartPage | `CartPage` |
| Any | `NavigationBar.clickLogin()` | Same page (modal opens) | `void` |
| Any (logged in) | `NavigationBar.clickLogout()` | HomePage | `void` |
| HomePage | `selectProduct(name)` | ProductPage | `ProductPage` |
| ProductPage | `addToCart()` | ProductPage (stays) | `void` |
| CartPage | `clickPlaceOrder()` | CartPage (modal opens) | `CheckoutPage` |
| CheckoutPage (modal) | `closeConfirmation()` | HomePage | `void` |

---

## 5. Test Script Mapping

| Test Case ID | Test File Name | Test Function Name | Page Objects Required | Fixtures Needed | Special Handling |
|--------------|----------------|--------------------|-----------------------|-----------------|------------------|
| TC1 | `login.spec.ts` | `test('TC1: Login - Valid Login', ...)` | `LoginPage`, `NavigationBar` | `page` | Modal interaction, welcome message verification |
| TC2 | `cart.spec.ts` | `test('TC2: Cart - Add Multiple Items', ...)` | `HomePage`, `ProductPage`, `CartPage`, `NavigationBar` | `page`, `authenticatedPage` | Alert handling (×2), category switching, multiple products |
| TC3 | `checkout.spec.ts` | `test('TC3: Checkout - Place Order with Valid Info', ...)` | `CartPage`, `CheckoutPage`, `NavigationBar` | `page`, `cartWithItems` | Form filling, confirmation popup, cart clearing verification |
| TC4 | `cart.spec.ts` | `test('TC4: Cart - Remove Item', ...)` | `CartPage`, `NavigationBar` | `page`, `cartWithTwoItems` | Dynamic item removal, total recalculation |
| TC5 | `full-flow.spec.ts` | `test('TC5: Navigation - Full Shopping Flow', ...)` | `LoginPage`, `HomePage`, `ProductPage`, `CartPage`, `CheckoutPage`, `NavigationBar` | `page` | Complete flow integration, logout verification |

### Detailed Mapping

#### TC1: Login - Valid Login
```typescript
// File: tests/demoblaze/login.spec.ts
test('TC1: Login - Valid Login', async ({ page }) => {
  // Setup
  const navigationBar = new NavigationBar(page);
  const loginPage = new LoginPage(page);
  
  // Navigate to site
  await page.goto('https://www.demoblaze.com/');
  
  // Step 1: Click [Log in] button
  await navigationBar.clickLogin();
  
  // Steps 2-4: Login with credentials
  await loginPage.loginWithCredentials('autouser_20251005_1234', 'autouser_20251005_1234');
  
  // Verifications 1-4 (using expect.soft)
  // ... assertions
});
```

#### TC2: Cart - Add Multiple Items
```typescript
// File: tests/demoblaze/cart.spec.ts
test('TC2: Cart - Add Multiple Items', async ({ page }) => {
  // Precondition: User logged in (use fixture or setup)
  
  // Steps 1-8: Navigate categories, add products
  // Verification 1-3: Cart contents and total
});
```

#### TC3: Checkout - Place Order with Valid Info
```typescript
// File: tests/demoblaze/checkout.spec.ts
test('TC3: Checkout - Place Order with Valid Info', async ({ page }) => {
  // Precondition: User logged in with items in cart (use fixture)
  
  // Steps 1-5: Navigate to cart, place order, fill form
  // Verifications 1-4: Confirmation, order details, navigation, cart state
});
```

#### TC4: Cart - Remove Item
```typescript
// File: tests/demoblaze/cart.spec.ts
test('TC4: Cart - Remove Item', async ({ page }) => {
  // Precondition: User logged in with 2 items (use fixture or setup)
  
  // Steps 1-4: Navigate to cart, remove item
  // Verifications 1-3: Item removed, remaining item, total updated
});
```

#### TC5: Navigation - Full Shopping Flow
```typescript
// File: tests/demoblaze/full-flow.spec.ts
test('TC5: Navigation - Full Shopping Flow', async ({ page }) => {
  // Steps 1-10: Complete flow from login to logout
  // Verifications 1-4: Cart, checkout, navigation, logout state
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

**Solution**:
```typescript
// In locator class
productByName(name: string): Locator {
  return this.page.locator(`a:has-text("${name}")`);
}

deleteButtonByProduct(name: string): Locator {
  return this.page.locator(`tr:has-text("${name}") >> text=Delete`);
}
```

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

**Document Version**: 1.0  
**Created**: 2025-10-27  
**Status**: Ready for Implementation

