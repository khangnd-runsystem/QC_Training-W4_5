# 🚀 Quick Start - Chạy Demo Tests

## ⚡ Chạy ngay (Recommended)

```bash
npm run test:demo:dev
```

Lệnh này sẽ:
- ✅ Chạy **4 tests** trong folder `tests/demo`
- ✅ Trên **2 browsers**: Chrome và Edge
- ✅ Tổng cộng: **8 test cases**
- ✅ Browser mở **fullscreen**
- ✅ Chạy đồng thời với **4 workers**
- ✅ Screenshot sau **mỗi verify step**
- ✅ Mode **headed** (hiển thị browser)

## 📋 Các lệnh khác

### Chạy theo môi trường
```bash
npm run test:demo:dev   # Development
npm run test:demo:stg   # Staging
npm run test:demo:prod  # Production
```

### Chạy theo browser
```bash
npm run test:demo:chrome  # Chỉ Chrome
npm run test:demo:edge    # Chỉ Edge
```

### Chạy test cụ thể
```bash
npx playwright test tests/demo/textbox.spec.ts
npx playwright test tests/demo/button.spec.ts
npx playwright test tests/demo/checkBox.spec.ts
npx playwright test tests/demo/login_addCart.spec.ts
```

## 🎯 Kết quả mong đợi

### Console Output
```
Running 8 tests using 4 workers

  ✓ [chrome] › tests/demo/textbox.spec.ts:10:3 › Text box form › fill and submit form
  ✓ [chrome] › tests/demo/button.spec.ts:7:5 › Button actions › click all buttons
  ✓ [chrome] › tests/demo/checkBox.spec.ts:6:5 › Check Box Demo Test › Check Box Test
  ✓ [chrome] › tests/demo/login_addCart.spec.ts:6:5 › Login and Add to Cart Test Suite › Login, Add to Cart, Verify Cart, and Logout
  ✓ [edge] › tests/demo/textbox.spec.ts:10:3 › Text box form › fill and submit form
  ✓ [edge] › tests/demo/button.spec.ts:7:5 › Button actions › click all buttons
  ✓ [edge] › tests/demo/checkBox.spec.ts:6:5 › Check Box Demo Test › Check Box Test
  ✓ [edge] › tests/demo/login_addCart.spec.ts:6:5 › Login and Add to Cart Test Suite › Login, Add to Cart, Verify Cart, and Logout

  8 passed (30s)
```

### Screenshots được tạo
```
test-results/
├── textbox_verify_dev_chrome.png
├── textbox_verify_dev_edge.png
├── button_doubleclick_dev_chrome.png
├── button_doubleclick_dev_edge.png
├── button_rightclick_dev_chrome.png
├── button_rightclick_dev_edge.png
├── button_dynamicclick_dev_chrome.png
├── button_dynamicclick_dev_edge.png
├── checkBox_verify_dev_chrome.png
├── checkBox_verify_dev_edge.png
├── login_success_dev_chrome.png
├── login_success_dev_edge.png
├── cart_verify_dev_chrome.png
└── cart_verify_dev_edge.png
```

### Reports
- **HTML Report**: Tự động mở sau khi chạy xong
- **Allure Report**: Chạy `npx allure serve allure-results`

## ⚙️ Thay đổi cấu hình

### Chuyển sang Headless Mode
Sửa file `.env.dev`:
```env
HEADLESS=true
```

### Thay đổi số Workers
Sửa file `.env.dev`:
```env
WORKERS=2   # Chạy 2 test đồng thời
WORKERS=8   # Chạy 8 test đồng thời
```

### Thêm Slow Motion (debug)
Sửa file `.env.dev`:
```env
SLOW_MO=500   # Mỗi action chậm 500ms
```

## 🐛 Troubleshooting

### Lỗi: Edge browser không tìm thấy
**Giải pháp 1:** Cài đặt Edge browser
```bash
npx playwright install msedge
```

**Giải pháp 2:** Chỉ chạy Chrome
```bash
npm run test:demo:chrome
```

### Lỗi: Port đã được sử dụng
Đóng tất cả browser instances và chạy lại

### Lỗi: Screenshot không được tạo
Kiểm tra folder `test-results/` có tồn tại không

## 📚 Đọc thêm

- **Chi tiết đầy đủ**: Xem file `README_DEMO_TESTS.md`
- **Tóm tắt thay đổi**: Xem file `CHANGES_SUMMARY.md`

## ✅ Checklist trước khi chạy

- [ ] Đã cài đặt dependencies: `npm install`
- [ ] Đã cài đặt browsers: `npx playwright install`
- [ ] File `.env.dev` tồn tại và có cấu hình đúng
- [ ] Microsoft Edge đã được cài đặt (hoặc chỉ chạy Chrome)

## 🎉 Bắt đầu ngay!

```bash
npm run test:demo:dev
```

Enjoy testing! 🚀

