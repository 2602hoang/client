# Books Store - Full Stack Web Application

## Mô Tả Dự Án

**Books Store** là một ứng dụng web bán sách hoàn chỉnh, bao gồm cả giao diện người dùng và quản trị viên. Người dùng có thể duyệt, thêm sản phẩm vào giỏ hàng, thanh toán và xem lịch sử đơn hàng. Quản trị viên có thể quản lý sản phẩm, người dùng và đơn hàng thông qua bảng điều khiển quản trị.

Dự án sử dụng **ReactJS** cho Front-end, **Node.js** và **Express** cho Back-end, **MySQL** cho cơ sở dữ liệu. Ứng dụng được triển khai với **Vercel** cho Front-end và Back-end, cơ sở dữ liệu sử dụng **Aiven**.

### Các Tính Năng Chính

#### **Front-end (Dành cho người dùng):**
- **Đăng nhập và đăng ký người dùng**.
- **Xem thông tin cá nhân của người dùng**.
- **Duyệt và lọc các sản phẩm**.
- **Xem chi tiết sản phẩm**.
- **Thêm sản phẩm vào giỏ hàng**.
- **Thanh toán và xem lịch sử đơn hàng**.
- **In đơn hàng**.
- **Liên hệ hỗ trợ qua ứng dụng**.

#### **Admin Page (Dành cho quản trị viên):**
- **Xem tất cả sản phẩm và tài khoản người dùng**.
- **Thêm, xóa và chỉnh sửa sản phẩm và tài khoản người dùng**.
- **Quản lý đơn hàng và xác nhận đơn hàng**.
- **Hiển thị thống kê đơn hàng bằng biểu đồ**.
- **Quản lý tài khoản người dùng**.

## Công Nghệ Sử Dụng

### Front-End:
- **ReactJS**: Thư viện JavaScript để xây dựng giao diện người dùng.
- **TailwindCSS**: CSS framework để tạo giao diện responsive.
- **Ant Design (Antd)**: UI library để xây dựng giao diện với các component có sẵn.
- **Axios**: Thư viện HTTP client để gọi API từ Back-end.
- **React Router**: Để quản lý routing trong ứng dụng.
  
### Back-End:
- **Node.js**: JavaScript runtime cho server.
- **Express**: Web framework cho Node.js để xây dựng API.
- **MySQL**: Hệ quản trị cơ sở dữ liệu quan hệ.
  
### Tích Hợp API:
- **API tùy chỉnh**: Để quản lý thanh toán và các dịch vụ khác.
- **Google Apps Script API**: Tích hợp với Google Sheets/Docs để lưu trữ và xử lý dữ liệu.

### Triển Khai:
- **Vercel**: Triển khai Front-end và Back-end.
- **Aiven**: Triển khai cơ sở dữ liệu MySQL.

### Các Công Cụ Bổ Sung:
- **emailJS**: Để gửi email cho người dùng khi có hoạt động trong hệ thống.
- **PDFJS**: Để hiển thị các tài liệu PDF.

## Cài Đặt Dự Án

### Cài Đặt Front-End

1. Clone repo Front-end về máy:

```bash
git clone https://github.com/2602hoang/client
2. Cài đặt các phụ thuộc:
cd client
npm install

