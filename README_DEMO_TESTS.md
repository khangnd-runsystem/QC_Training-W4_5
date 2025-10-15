# 🎯 Hướng dẫn chạy Demo Tests

## 📋 Tổng quan

Project này chứa 4 bài test trong folder `tests/demo`:
1. **textbox.spec.ts** - Test form nhập liệu
2. **button.spec.ts** - Test các loại button (double click, right click, dynamic click)
3. **checkBox.spec.ts** - Test checkbox
4. **login_addCart.spec.ts** - Test login và thêm sản phẩm vào giỏ hàng

## ⚙️ Cấu hình

### 🌐 Browsers
- ✅ **Google Chrome** (project: chrome)
- ✅ **Microsoft Edge** (project: edge)

### 🖥️ Giao diện
- ✅ **Full màn hình** - Tự động mở fullscreen khi chạy test
- ✅ **Viewport null** - Cho phép browser sử dụng toàn bộ màn hình

### 📸 Screenshot
- ✅ Screenshot được chụp **sau mỗi step verify**
- ✅ Tên file screenshot bao gồm: `<test_name>_<env>_<browser>`
- ✅ Screenshot được lưu trong folder `test-results/`

### 👷 Workers
- ✅ **4 workers** (mặc định) - Chạy đồng thời 4 test cùng lúc
- ✅ Có thể thay đổi trong file `.env` bằng biến `WORKERS`

### 🎭 Mode Headed/Headless
- ✅ Cấu hình trong file `.env` bằng biến `HEADLESS`
  - `HEADLESS=false` → Hiển thị browser (headed mode)
  - `HEADLESS=true` → Ẩn browser (headless mode)

## 📁 Cấu trúc file .env

### `.env.dev` (Development)
```env
HEADLESS=false
WORKERS=4
BASE_URL=https://demoqa.com
```

### `.env.stg` (Staging)
```env
HEADLESS=false
WORKERS=4
BASE_URL=https://demoqa.com
SLOW_MO=100
```

### `.env.prod` (Production)
```env
HEADLESS=false
WORKERS=4
BASE_URL=https://letcode.in
USERNAME=prod.admin
PASSWORD=prod.pass234
```

## 🚀 Cách chạy tests

### 1️⃣ Chạy tất cả 4 tests trên cả Chrome và Edge

```bash
# Chạy với môi trường dev (mặc định)
npm run test:demo:dev

# Chạy với môi trường staging
npm run test:demo:stg

# Chạy với môi trường production
npm run test:demo:prod

# Chạy không chỉ định môi trường (sử dụng .env mặc định)
npm run test:demo
```

### 2️⃣ Chạy chỉ trên Chrome

```bash
npm run test:demo:chrome
```

### 3️⃣ Chạy chỉ trên Edge

```bash
npm run test:demo:edge
```

### 4️⃣ Chạy test cụ thể

```bash
# Chạy chỉ textbox test
npx playwright test tests/demo/textbox.spec.ts

# Chạy chỉ button test
npx playwright test tests/demo/button.spec.ts

# Chạy chỉ checkbox test
npx playwright test tests/demo/checkBox.spec.ts

# Chạy chỉ login_addCart test
npx playwright test tests/demo/login_addCart.spec.ts
```

### 5️⃣ Chạy với các options khác

```bash
# Chạy với UI mode (interactive)
npx playwright test tests/demo --ui

# Chạy với debug mode
npx playwright test tests/demo --debug

# Chạy với headed mode (bỏ qua cấu hình .env)
npx playwright test tests/demo --headed

# Chạy với số workers cụ thể
npx playwright test tests/demo --workers=2
```

## 📊 Xem kết quả

### HTML Report
Sau khi chạy xong, report HTML sẽ tự động mở:
```bash
# Hoặc mở thủ công
npx playwright show-report reports/html-report
```

### Allure Report
```bash
# Generate và mở Allure report
npx allure serve allure-results
```

### Screenshots
Tất cả screenshots được lưu trong folder:
```
test-results/
├── button_doubleclick_dev_chrome.png
├── button_rightclick_dev_chrome.png
├── button_dynamicclick_dev_chrome.png
├── checkBox_verify_dev_chrome.png
├── textbox_verify_dev_chrome.png
├── login_success_dev_chrome.png
└── cart_verify_dev_chrome.png
```

## 🔧 Thay đổi cấu hình

### Thay đổi mode Headed/Headless
Sửa file `.env.dev` (hoặc .env.stg, .env.prod):
```env
HEADLESS=true   # Chạy ẩn browser
# hoặc
HEADLESS=false  # Hiển thị browser
```

### Thay đổi số Workers
Sửa file `.env.dev`:
```env
WORKERS=2   # Chạy 2 test đồng thời
# hoặc
WORKERS=8   # Chạy 8 test đồng thời
```

### Thêm Slow Motion (chạy chậm để debug)
Sửa file `.env.dev`:
```env
SLOW_MO=500   # Mỗi action chậm 500ms
```

## 📝 Chi tiết từng test

### 1. TextBox Test
- Navigate đến trang text-box
- Điền thông tin: Full Name, Email, Current Address, Permanent Address
- Submit form
- **Verify** kết quả hiển thị đúng
- **Screenshot** sau khi verify

### 2. Button Test
- Navigate đến trang buttons
- **Double click** button → Verify message → **Screenshot**
- **Right click** button → Verify message → **Screenshot**
- **Dynamic click** button → Verify message → **Screenshot**

### 3. CheckBox Test
- Navigate đến trang checkbox
- Expand Home toggle
- Expand Desktop toggle
- Check Notes checkbox
- **Verify** checkbox được chọn
- **Screenshot** sau khi verify

### 4. Login & Add to Cart Test
- Navigate đến saucedemo.com
- Login với username/password
- **Verify** login thành công → **Screenshot**
- Add sản phẩm vào cart
- Vào trang cart
- **Verify** sản phẩm trong cart → **Screenshot**
- Logout

## 🎯 Kết quả mong đợi

Khi chạy `npm run test:demo:dev`:
- ✅ Chạy 4 tests
- ✅ Mỗi test chạy trên 2 browsers (Chrome + Edge)
- ✅ Tổng cộng: **8 test cases** (4 tests × 2 browsers)
- ✅ Chạy đồng thời với 4 workers
- ✅ Browser mở fullscreen
- ✅ Screenshot sau mỗi verify step
- ✅ Report HTML và Allure tự động generate

## 🐛 Troubleshooting

### Lỗi: Browser không mở fullscreen
- Kiểm tra `viewport: null` trong `playwright.config.ts`
- Kiểm tra `args: ['--start-fullscreen']` trong launchOptions

### Lỗi: Không chụp được screenshot
- Kiểm tra folder `test-results/` có tồn tại không
- Kiểm tra quyền ghi file

### Lỗi: Edge browser không tìm thấy
- Cài đặt Microsoft Edge: https://www.microsoft.com/edge
- Hoặc chỉ chạy Chrome: `npm run test:demo:chrome`

### Lỗi: Environment variables không load
- Kiểm tra file `.env.dev` có tồn tại không
- Kiểm tra syntax trong file .env (không có dấu ngoặc, không có khoảng trắng)

## 📞 Liên hệ

Nếu có vấn đề, vui lòng tạo issue hoặc liên hệ team QC.

