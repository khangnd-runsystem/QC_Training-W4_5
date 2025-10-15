# 📁 Test Data Folder

Folder này chứa tất cả **test data** dạng JSON cho các test cases.

---

## 📂 Cấu trúc files:

### 1. **`textbox.testdata.json`** - TextBox Test Data

Chứa test data cho TextBox form test theo từng environment (dev, stg, prod).

**Cấu trúc:**
```json
{
  "dev": {
    "fullName": "Nguyen Van A",
    "email": "nguyenvana@example.com",
    "currentAddress": "123 Dev Street, Hanoi",
    "permanentAddress": "456 Home Road, Hanoi"
  },
  "stg": { ... },
  "prod": { ... }
}
```

**Sử dụng:**
```typescript
import { readJson } from '../../utils/jsonReader';
import TextBoxData from '../../interfaces/textBoxData';

const envKey = process.env.test_env || 'dev';
const allData = readJson<Record<string, TextBoxData>>('./data/textbox.testdata.json');
const data = allData[envKey];

await pageObj.fill(pageObj.locators.fullNameInput, data.fullName);
```

**Được dùng bởi:**
- ✅ `tests/demo/textbox.spec.ts`

---

### 2. **`saucedemo.testdata.json`** - SauceDemo Test Data

Chứa credentials cho các user accounts của SauceDemo.

**Cấu trúc:**
```json
{
  "users": {
    "standard": {
      "username": "standard_user",
      "password": "secret_sauce"
    },
    "locked": {
      "username": "locked_out_user",
      "password": "secret_sauce"
    },
    "problem": {
      "username": "problem_user",
      "password": "secret_sauce"
    },
    "performance_glitch": {
      "username": "performance_glitch_user",
      "password": "secret_sauce"
    }
  }
}
```

**Sử dụng:**
```typescript
import { readJson } from '../../utils/jsonReader';
import { SauceDemoData } from '../../interfaces/sauceDemoData';

const testData = readJson<SauceDemoData>('./data/saucedemo.testdata.json');
const user = testData.users.standard;

await pageObj.login(user.username, user.password);
```

**Được dùng bởi:**
- ✅ `tests/demo/login_addCart.spec.ts`

---

## 🎯 Lợi ích của việc dùng JSON:

### ✅ **1. Dễ maintain:**
- Không cần compile lại khi thay đổi data
- Có thể edit bằng bất kỳ text editor nào
- Dễ review changes trong Git

### ✅ **2. Tách biệt data và code:**
- Test code không chứa hardcoded data
- Dễ thay đổi data mà không động vào code
- Non-technical users có thể edit data

### ✅ **3. Support nhiều environments:**
- Dễ dàng thêm data cho environment mới
- Chỉ cần thêm key mới trong JSON

### ✅ **4. Type-safe:**
- Sử dụng TypeScript interfaces để validate data
- IDE sẽ autocomplete và báo lỗi nếu sai structure

---

## 📝 Cách thêm test data mới:

### **Bước 1:** Tạo file JSON trong folder `data/`

```json
// data/login.testdata.json
{
  "dev": {
    "username": "dev_user",
    "password": "dev_pass"
  },
  "stg": {
    "username": "stg_user",
    "password": "stg_pass"
  },
  "prod": {
    "username": "prod_user",
    "password": "prod_pass"
  }
}
```

### **Bước 2:** Tạo interface trong folder `interfaces/`

```typescript
// interfaces/loginData.ts
export default interface LoginData {
  username: string;
  password: string;
}
```

### **Bước 3:** Sử dụng trong test

```typescript
import { readJson } from '../../utils/jsonReader';
import LoginData from '../../interfaces/loginData';

const envKey = process.env.test_env || 'dev';
const allData = readJson<Record<string, LoginData>>('./data/login.testdata.json');
const data = allData[envKey];

await pageObj.login(data.username, data.password);
```

---

## 🔄 So sánh: TypeScript Constants vs JSON

### **TypeScript Constants (constants/testData.ts):**
```typescript
// ❌ Cần compile lại khi thay đổi
export const USERS = {
  STANDARD: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
} as const;
```

**Nhược điểm:**
- ❌ Phải compile lại khi thay đổi data
- ❌ Data và code lẫn lộn
- ❌ Khó cho non-technical users edit

### **JSON (data/saucedemo.testdata.json):**
```json
{
  "users": {
    "standard": {
      "username": "standard_user",
      "password": "secret_sauce"
    }
  }
}
```

**Ưu điểm:**
- ✅ Không cần compile lại
- ✅ Tách biệt data và code
- ✅ Dễ edit cho mọi người
- ✅ Dễ review trong Git

---

## 📊 Danh sách Test Data Files:

| File | Mục đích | Interface | Được dùng bởi |
|------|----------|-----------|---------------|
| `textbox.testdata.json` | TextBox form data | `TextBoxData` | `textbox.spec.ts` |
| `saucedemo.testdata.json` | SauceDemo credentials | `SauceDemoData` | `login_addCart.spec.ts` |

---

## 🎯 Best Practices:

### ✅ **DO:**
- ✅ Luôn tạo interface cho mỗi JSON file
- ✅ Sử dụng `readJson<T>()` với type parameter
- ✅ Đặt tên file theo pattern: `<feature>.testdata.json`
- ✅ Group data theo environment nếu cần (dev, stg, prod)
- ✅ Validate JSON structure với interface

### ❌ **DON'T:**
- ❌ Hardcode test data trong test files
- ❌ Lưu sensitive data (passwords thật) trong JSON
- ❌ Tạo JSON file quá lớn (nên split thành nhiều files)
- ❌ Dùng JSON cho constants không thay đổi (dùng TypeScript constants)

---

## 🔒 Security Note:

**⚠️ QUAN TRỌNG:**
- Các passwords trong JSON files này là **test data** cho demo/staging environments
- **KHÔNG BAO GIỜ** commit passwords thật của production vào Git
- Sử dụng environment variables (`.env` files) cho sensitive data thật
- Thêm `.env.*` vào `.gitignore`

---

## 📚 Tài liệu liên quan:

- **`utils/jsonReader.ts`** - Utility để đọc JSON files
- **`interfaces/`** - TypeScript interfaces cho test data
- **`constants/paths.ts`** - URLs và paths constants

---

## 🚀 Next Steps:

Khi thêm test mới:
1. Tạo JSON file trong `data/`
2. Tạo interface trong `interfaces/`
3. Import và sử dụng `readJson<T>()` trong test
4. Update README này với thông tin file mới

---

## 📞 Liên hệ:

Nếu cần thêm test data mới hoặc có câu hỏi, vui lòng liên hệ team QC.

