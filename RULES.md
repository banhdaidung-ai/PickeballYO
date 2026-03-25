# WORKSPACE RULES & GUIDELINES

Dưới đây là các quy tắc làm việc đã thống nhất giữa User và AI Assistant (Antigravity).

## 💡 Nguyên tắc chung
- **Ngôn ngữ**: Sử dụng Tiếng Việt cho toàn bộ UI và giao tiếp.
- **Thẩm mỹ (Premium Design)**: 
    - Luôn sử dụng Tailwind CSS với các thành phần bo tròn lớn (`2rem`, `3xl`).
    - Hiệu ứng đổ bóng (`shadow-xl`), dải màu gradient (`velocity-gradient`).
    - Hiệu ứng kính (`backdrop-blur`) và micro-interactions (`active:scale-95`).
- **Bảo mật**: Luôn bảo vệ các tính năng admin bằng role `admin`.

## ⚙️ Quy trình Kỹ thuật (Tự động hóa)
- **Quyền tự quyết**: Khi User đã xác nhận yêu cầu cập nhật/nâng cấp, AI sẽ tự động thực hiện toàn bộ các bước mà **không cần hỏi lại**.
- **Chuỗi tác vụ**: Lập kế hoạch -> Viết code -> Chỉnh sửa -> Build kiểm tra -> Git Commit/Push -> Deploy GitHub Pages.
- **Thông báo**: Chỉ báo cáo lại (Notify User) sau khi toàn bộ chuỗi tác vụ trên đã hoàn tất.

## 🚀 Deployment
- **Repo**: `https://github.com/banhdaidung-ai/PickeballYO.git`
- **Nhánh**: `main`
- **Môi trường**: GitHub Pages (nhánh `gh-pages` thông qua `npm run deploy`).
- **Command**: `git add -A && git commit -m "..." && git push origin main && npm run deploy`.
