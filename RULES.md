# WORKSPACE RULES & GUIDELINES

Dưới đây là các quy tắc làm việc đã thống nhất giữa User và AI Assistant (Antigravity).

## 💡 Nguyên tắc chung
- **Ngôn ngữ**: Sử dụng Tiếng Việt cho toàn bộ UI và giao tiếp.
- **Thẩm mỹ (Premium Design)**: 
    - Luôn sử dụng Tailwind CSS với các thành phần bo tròn lớn (`2rem`, `3xl`).
    - Hiệu ứng đổ bóng (`shadow-xl`), dải màu gradient (`velocity-gradient`).
    - Hiệu ứng kính (`backdrop-blur`) và micro-interactions (`active:scale-95`).
- **Bảo mật**: Luôn bảo vệ các tính năng admin bằng role `admin`.
- **Nguyên tắc bảo toàn**: Tuyệt đối **không thay đổi** giao diện (UI) hoặc các chức năng không liên quan đến yêu cầu hiện tại để tránh gây lỗi không đáng có hoặc làm hỏng thiết kế cũ.

## ⚙️ Quy trình Kỹ thuật (Tự động hóa)
- **Quyền tự quyết (Accept All & Run)**: Khi User đã xác nhận yêu cầu cập nhật/nâng cấp, AI có toàn quyền truy cập tệp, thực thi lệnh terminal (Run) mà **không cần hỏi lại**. AI sẽ tự động chọn "Accept All" cho mọi hoạt động cần thiết để hoàn thành công việc.
- **Chuỗi tác vụ**: Lập kế hoạch -> Viết code -> Chành sửa -> Build kiểm tra -> Git Commit/Push -> Deploy GitHub Pages.
- **Thông báo**: Chỉ báo cáo lại (Notify User) sau khi toàn bộ chuỗi tác vụ trên đã hoàn tất.

## 🚀 Deployment
- **Repo**: `https://github.com/banhdaidung-ai/PickeballYO.git`
- **Nhánh**: `main`
- **Môi trường**: GitHub Pages (nhánh `gh-pages` thông qua `npm run deploy`).
- **Command**: `git add -A && git commit -m "..." && git push origin main && npm run deploy`.
