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

```bash
cd client
npm install

3.Chạy ứng dụng Front-end trong môi trường phát triển:

```bash
npm start


### Cài Đặt Back-end

1. Clone repo Back-end về máy:

```bash
git clone https://github.com/2602hoang/server

2. Cài đặt các phụ thuộc:

```bash
cd server
npm install

3.Chạy ứng dụng Back-end trong môi trường phát triển:

```bash
npm start

```
### Liên Kết Demo

- Đăng nhập người dùng: https://web-app-six-tau.vercel.app/login
    
    Điện thoại: 0917789965
    Mật khẩu: 123456
  
- Đăng nhập quản trị viên: [Link Demo Admin](https://web-app-six-tau.vercel.app/login/admin)

    Điện thoại: 0917789964
    Mật khẩu: 123456

- Demo Video: [Xem Video Demo](https://youtu.be/u4234HpFlek)


### Các Liên Kết Dự Án Khác

Mã nguồn Front-end: https://github.com/2602hoang/client
Mã nguồn Back-end: https://github.com/2602hoang/server/tree/master
Ứng dụng di động (React Native):  https://github.com/2602hoang/BookStore
Demo Mobile App: [Link Demo Mobile](https://ln.run/23da9)

### Cách Chơi & Tương Tác

Người dùng có thể đăng nhập vào ứng dụng, duyệt sản phẩm, thêm vào giỏ hàng, thực hiện thanh toán và xem lịch sử đơn hàng.
Quản trị viên có quyền quản lý tất cả sản phẩm, tài khoản người dùng và đơn hàng, xem thống kê đơn hàng qua biểu đồ.

### Lỗi & Góp Ý
Nếu bạn gặp phải lỗi hoặc có góp ý cải tiến, vui lòng mở issue trên GitHub repository của chúng tôi:

Front-end:[ Repo Front-end](https://github.com/2602hoang/client)
Back-end: [Repo Back-end](https://github.com/2602hoang/server/tree/master)
### Giấy Phép
Dự án này được phát hành dưới giấy phép MIT. Bạn có thể tham khảo chi tiết về giấy phép trong tệp LICENSE.

### Tác Giả
Tên của bạn - Nhà phát triển chính - @2602hoang
**less**
### Giải thích các phần trong file `README.md`:

1. **Mô tả dự án**: Phần giới thiệu tổng quan về ứng dụng bán sách, các tính năng và đối tượng người dùng (người dùng và quản trị viên).
2. **Các tính năng chính**: Liệt kê các tính năng của hệ thống cho người dùng và quản trị viên.
3. **Công nghệ sử dụng**: Mô tả chi tiết các công nghệ được sử dụng cho Front-end, Back-end, API và các công cụ triển khai.
4. **Cài đặt dự án**: Hướng dẫn cách cài đặt và chạy cả Front-end và Back-end trên máy tính cục bộ.
5. **Liên kết demo**: Cung cấp liên kết để truy cập phiên bản demo của ứng dụng web và video demo.
6. **Cách chơi & Tương tác**: Mô tả cách người dùng và quản trị viên có thể sử dụng ứng dụng.
7. **Lỗi & Góp ý**: Khuyến khích người dùng báo cáo lỗi hoặc đóng góp ý tưởng cải tiến.
8. **Giấy phép**: Thông tin về giấy phép mã nguồn mở cho dự án.
9. **Tác giả**: Thông tin về tác giả chính của dự án và liên kết GitHub.















