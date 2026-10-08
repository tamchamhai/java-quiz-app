# 🎯 Java Ticket Station Quiz App

Ứng dụng web làm bài trắc nghiệm kiến thức Java Backend thực chiến dựa trên giáo án và tài liệu tại [`C:\__project_fullstack\ticket-station-app\java-knownledge`](../java-knownledge).

---

## 🌟 Tính Năng Nổi Bật

1. **Menu Bên Trái (Left Navigation):**
   - **Lộ trình 6 Chặng Thực Chiến (Ticket Station Spine Project):**
     - 📍 **Chặng 1:** Khởi Tạo Dự Án, Cấu Trúc Chuẩn & Quản Lý Schema (Flyway)
     - 📍 **Chặng 2:** Thiết Kế RESTful API, DTO Projections & Triệt Tiêu N+1 Query
     - 📍 **Chặng 3:** Kiểm Thử Tự Động Mockito & Bảo Mật Spring Security 6 JWT
     - 📍 **Chặng 4:** Nghiệp Vụ Đặt Vé, Concurrency & Tranh Chấp Ghế (Redis Lock)
     - 📍 **Chặng 5:** Kiến Trúc Hướng Sự Kiện Kafka & Transactional Outbox
     - 📍 **Chặng 6:** Tính Bất Biến (Idempotency), Chịu Lỗi Resilience4j & Docker
   - **12 Chuyên Đề Roadmap Bổ Trợ:** Học sâu từng khía cạnh kỹ thuật (Java Core, Spring Core, JPA, Security, Caching, Messaging, Microservices, Observability,...).
   - **Thanh đo tiến độ & Tỷ lệ đúng (%):** Tự động thống kê số câu đã làm, số câu đúng và tỷ lệ hoàn thành.

2. **2 Chế Độ Làm Bài Linh Hoạt:**
   - ⚡ **Chế Độ Luyện Tập (Practice Mode):**
     - Chọn đáp án và nhận phản hồi tức thì (Xanh/Đỏ).
     - Hộp giải thích chuyên sâu (**Deep Explanation**) phân tích rõ vì sao đáp án đúng, tại sao các phương án khác sai hoặc là bẫy thường gặp khi phỏng vấn/production.
     - Trích dẫn chính xác đường dẫn file bài học trong `java-knownledge/roadmap/...` để người học mở ra đọc thêm.
   - ⏱️ **Chế Độ Thi Thử (Exam Mode):**
     - Đồng hồ đếm ngược tính giờ làm bài.
     - Ẩn đáp án trong lúc làm bài, chấm điểm và xếp hạng (Junior / Mid / Senior Ready) sau khi bấm "Nộp bài".
     - Hiệu ứng pháo hoa chúc mừng khi đạt kết quả cao (>= 80%).

3. **Công Cụ Hỗ Trợ:**
   - Ghim sao (Bookmark) các câu hỏi khó để ôn lại.
   - Bộ lọc thông minh: "Tất cả", "Chưa làm", "Đã đánh dấu (★)", "Làm sai (Cần ôn lại)".
   - Tìm kiếm nhanh theo từ khóa, công nghệ (`Flyway`, `N+1`, `Kafka`, `Redisson`, `Idempotency`,...).
   - Nút "Giáo trình liên quan" xem nhanh tóm tắt phương pháp "Đọc 20% - Phá 30% - Xây 50%".
   - Lưu tiến độ học tập tự động vào `localStorage` (không mất dữ liệu khi reload trình duyệt).

---

## 🚀 Hướng Dẫn Chạy Ứng Dụng

Di chuyển vào thư mục ứng dụng và khởi chạy dev server:

```powershell
cd c:\__project_fullstack\ticket-station-app\java-quiz-app
npm run dev
```

Truy cập trên trình duyệt tại địa chỉ: `http://localhost:5173`

---

## 🛠️ Công Nghệ Sử Dụng

- **Frontend:** React 19 + TypeScript + Vite 8
- **Styling:** Tailwind CSS v4 (Dark Theme hiện đại, tương thích giao diện IDE)
- **Icons:** Lucide React
- **Hiệu ứng:** Canvas Confetti
