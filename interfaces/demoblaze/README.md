# Demoblaze Interfaces

This folder contains TypeScript interface definitions for Demoblaze test data structures.

## Purpose

These interfaces provide type safety and IntelliSense support when working with test data loaded from JSON files. They ensure that:

- Test data structure is well-defined and documented
- IDEs provide autocompletion for data properties
- Type checking catches errors at compile time
- Code is more maintainable and self-documenting

## Interface Files

### `user.interface.ts`
Defines user credentials structure:
- `User`: Single user with username and password
- `UsersData`: Collection of users (validUser, invalidUser, etc.)

**Usage:**
```typescript
import { UsersData } from '../../interfaces/demoblaze';
const users = readJson('data/demoblaze/users.json') as UsersData;
const validUser = users.validUser;
```

### `product.interface.ts`
Defines product information structure:
- `Product`: Single product with name, price, description, category
- `ProductsData`: Products organized by category (phones, laptops, monitors)

**Usage:**
```typescript
import { ProductsData } from '../../interfaces/demoblaze';
const products = readJson('data/demoblaze/products.json') as ProductsData;
const phone = products.phones.samsungGalaxyS6;
```

### `checkout-info.interface.ts`
Defines checkout form data structure:
- `CheckoutInfo`: Customer information for order placement
- `CheckoutData`: Collection of customer profiles

**Usage:**
```typescript
import { CheckoutData } from '../../interfaces/demoblaze';
const checkoutData = readJson('data/demoblaze/checkout-info.json') as CheckoutData;
const customer = checkoutData.customer1;
```

### `order-confirmation.interface.ts`
Defines order confirmation details structure:
- `OrderConfirmation`: Parsed order confirmation information (orderId, amount, card, name, date)

**Usage:**
```typescript
import { OrderConfirmation } from '../../interfaces/demoblaze';
const confirmation: OrderConfirmation = await checkoutPage.getOrderConfirmation();
```

### `index.ts`
Central export file that re-exports all interfaces for convenient importing:
```typescript
import { UsersData, ProductsData, CheckoutData, OrderConfirmation } from '../../interfaces/demoblaze';
```

## Benefits

1. **Type Safety**: Catch data structure errors at compile time
2. **IntelliSense**: Get autocomplete suggestions in IDE
3. **Documentation**: Interfaces serve as self-documenting code
4. **Maintainability**: Changes to data structure are tracked by TypeScript
5. **Refactoring**: Safe refactoring with IDE support

## Best Practices

1. Always use interface types when loading JSON data:
   ```typescript
   // ✅ Good - with type safety
   const users = readJson('data/demoblaze/users.json') as UsersData;
   
   // ❌ Bad - no type safety
   const users: any = readJson('data/demoblaze/users.json');
   ```

2. Use non-null assertion operator (`!`) when you're certain optional fields exist:
   ```typescript
   await homePage.selectCategory(phone.category!);
   ```

3. Keep interfaces synchronized with JSON data files

4. Add new interfaces as you add new data structures

## Related Files

- **Data Files**: `data/demoblaze/*.json`
- **Page Objects**: `pages/demoblaze/**/*.ts`
- **Test Files**: `tests/demoblaze/*.spec.ts`
