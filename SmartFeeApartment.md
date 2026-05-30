# Mục lục

- Phụ lục hình ảnh
- Tuần 1: Xây dựng tầm nhìn chiến lược ban đầu
  - 1.1 TÀI LIỆU TẦM NHÌN DỰ ÁN (PROJECT VISION)
    - 1.1.1 Vấn đề cần giải quyết (The Problem)
    - 1.1.2 Mục tiêu chính (Main Objectives)
    - 1.1.3 Phạm vi dự án (Scope)
  - 1.2. XÁC ĐỊNH NGƯỜI DÙNG VÀ CÁC BÊN LIÊN QUAN
    - 1.2.1 Danh sách người dùng trực tiếp (Primary Users)
    - 1.2.2 Các bên liên quan gián tiếp (Secondary Stakeholders)
    - 1.2.3 Chân dung người dùng (User Personas)
  - 1.3. XÁC ĐỊNH BỐI CẢNH HỆ THỐNG (SYSTEM CONTEXT)
    - 1.3.1 Sơ đồ bối cảnh (Context Diagram)
    - 1.3.2 Các hệ thống/dịch vụ bên ngoài cần tích hợp
    - 1.3.3 Danh sách Dữ liệu Đầu vào và Đầu ra chính
- Tuần 2: Xây dựng use-case và các chi tiết sâu hơn
  - 2.1 HỆ THỐNG USE CASE CHI TIẾT
    - 2.1.1 PHÂN HỆ 1: DÀNH CHO CƯ DÂN
    - 2.1.2 PHÂN HỆ 2: BAN QUẢN LÝ
    - 2.1.3 PHÂN HỆ 3: KẾ TOÁN (FINANCE)
    - 2.1.4 PHÂN HỆ 4: QUẢN TRỊ (ADMIN)
    - 2.1.5 TỔNG HỢP CÁC USE CASE KHÁC (TÓM TẮT)
  - 2.2 MÔ HÌNH HÓA QUY TRÌNH (PROCESS MODELING)
  - 2.3 MÔ HÌNH HÓA DỮ LIỆU KHÁI NIỆM (CONCEPTUAL DATA MODELING)
    - 2.3.1 Danh mục Thực thể (Entity Catalog)
    - 2.3.2 Danh mục Mối quan hệ (Relationship Catalog)
    - 2.3.3 Các thuộc tính và Định danh chính (Key Attributes & Identifiers)
    - 2.3.4 Danh mục Quy tắc Nghiệp vụ (Business Rules Catalog)
    - 2.3.5 Các ghi chú và giả định (Notes & Assumptions)
    - 2.3.6 Sơ đồ ERD khái niệm (Conceptual ERD)
- Tuần 3: Hoàn thành yêu cầu chi tiết
  - 3.1 TÀI LIỆU DANH SÁCH YÊU CẦU CHỨC NĂNG
    - 3.1.1 Yêu cầu theo lĩnh vực tính năng
    - 3.1.2 Ma trận CRUD hệ thống
    - 3.1.3 Ma trận Khả năng Truy xuất
  - 3.2 ĐẶC TẢ YÊU CẦU PHI CHỨC NĂNG
    - 3.2.1 Hiệu năng và Khả năng mở rộng
    - 3.2.2 Bảo mật
    - 3.2.3 Độ sẵn sàng và Tin cậy
    - 3.2.4 Tính khả dụng và Tiếp cận
    - 3.2.5 Ràng buộc và Bảo trì
  - 3.3 TÀI LIỆU WIREFRAMES UI VÀ LUỒNG ĐIỀU HƯỚNG
    - 3.3.1 Cấu trúc Wireframes chi tiết các màn hình cốt lõi
    - 3.3.2 Sơ đồ Luồng Điều Hướng (User Flows)
- Tuần 4: ĐỊNH NGHĨA KIẾN TRÚC HỆ THỐNG
  - 4.1 TÀI LIỆU CÁC YẾU TỐ KIẾN TRÚC (ARCHITECTURAL DRIVERS)
    - 4.1.1 Tóm tắt các yếu tố cốt lõi (Executive Summary)
    - 4.1.2 Yêu cầu chức năng ảnh hưởng kiến trúc (ASFRs)
    - 4.1.3 Các thuộc tính chất lượng (Quality Attribute Drivers)
    - 4.1.4 Ràng buộc (Constraints)
    - 4.1.5 Ma trận ưu tiên các Drivers
  - 4.2 QUYẾT ĐỊNH STACK CÔNG NGHỆ (TECHNOLOGY STACK)
    - 4.2.1 Tổng quan Stack Công nghệ
    - 4.2.2 Quyết định Công nghệ theo Hạng mục
    - 4.2.3 Ma trận Quyết định (Decision Matrix)
    - 4.2.4 Truy xuất nguồn gốc và Rủi ro (Traceability & Risks)
  - 4.3 KIẾN TRÚC HỆ THỐNG (SYSTEM ARCHITECTURE)
    - 4.3.1 Sơ đồ kiến trúc tổng quan (Architecture Overview)
    - 4.3.2 Phân rã thành phần Logic (Component Decomposition)
    - 4.3.3 Kiến trúc Triển khai (Deployment Architecture)
    - 4.3.4 Ma trận giao tiếp (Communication Patterns)
    - 4.3.5 Các Quyết Định Kiến Trúc (Architecture Decision Records - ADRs)
- Tuần 5: THIẾT KẾ CHI TIẾT HỆ THỐNG
  - 5.1 THIẾT KẾ THÀNH PHẦN (COMPONENT DESIGN)
    - 5.1.1 Danh mục các thành phần (Component Catalog)
    - 5.1.2 Ma trận trách nhiệm (Responsibility Matrix)
  - 5.2 THIẾT KẾ GIAO DIỆN LẬP TRÌNH (API DESIGN)
    - 5.2.1 Tổng quan về API
    - 5.2.2 Đặc tả các Endpoint chính
  - 5.3 KIẾN TRÚC DỮ LIỆU VẬT LÝ (PHYSICAL DATA ARCHITECTURE)
    - 5.3.1 Nền tảng Cơ sở dữ liệu
    - 5.3.2 Đặc tả các bảng chính (Table Specifications)
  - 5.4 THIẾT KẾ BẢO MẬT (SECURITY DESIGN)
    - 5.4.1 Cơ chế Xác thực (Authentication)
    - 5.4.2 Cơ chế Phân quyền (Authorization - RBAC)
    - 5.4.3 Bảo vệ dữ liệu (Data Protection)
- PHẦN 6 - THIẾT KẾ CHI TIẾT (LOW-LEVEL DESIGN)
  - 6.1 Thiết Kế Lớp (Class Design)
    - 6.1.1 Các lớp Thực thể (Entity Classes / Domain Model)
    - 6.1.2 Các lớp Controller, Service & Repository chính
    - 6.1.3 Design Patterns Áp Dụng
  - 6.2 Thiết Kế Sơ Đồ Trình Tự (Sequence Diagrams)
    - 6.2.1 Biểu đồ trình tự: UC-R01 - Cư dân tra cứu hóa đơn
    - 6.2.2 Biểu đồ trình tự: UC-R02 - Thanh toán VNPay
    - 6.2.3 Biểu đồ trình tự: UC-M03 - BQL Tính phí đồng loạt
  - 6.3 Thiết Kế UI (High-Fidelity)
    - 6.3.1 Hệ Thống Thiết Kế (UI Kit)
    - 6.3.2 Danh sách các Màn hình Cốt lõi (Web Mockups)
  - 6.4 Chi Tiết Thiết Kế Cơ Sở Dữ Liệu
    - 6.4.1 Script DDL (Data Definition Language)
    - 6.4.2 Chiến Lược Index
- PHẦN 7 - THIẾT KẾ LOGIC CHI TIẾT VÀ KẾ HOẠCH TRIỂN KHAI
  - 7.1 Thiết Kế Thuật Toán (Algorithm Design)
    - 7.1.1 Thuật toán Tính phí điện lũy kế (BR-01)
    - 7.1.2 Thuật toán Tự động nhắc nợ (Auto-Reminder)
  - 7.2 Thiết Kế Xử Lý Ngoại Lệ (Error Handling Design)
    - 7.2.1 Cấu trúc phân cấp ngoại lệ (Exception Hierarchy)
    - 7.2.2 Danh mục mã lỗi hệ thống (Error Code Catalog)
  - 7.3 Chiến Lược Kiểm Thử (Testing Strategy)
    - 7.3.1 Các cấp độ kiểm thử
    - 7.3.2 Kịch bản kiểm thử mẫu (Test Case Specification)
  - 7.4 Tiêu Chuẩn Phát Triển (Development Standards)
    - 7.4.1 Quy tắc đặt tên (Naming Conventions)
    - 7.4.2 Tiêu chuẩn Bảo mật & Code Quality
  - 7.5 Kế Hoạch Triển Khai (Implementation Plan)
    - 7.5.1 Phân chia công việc (WBS)
    - 7.5.2 Quản trị rủi ro (Risk Register)

---

# Phụ lục hình ảnh

- Hình 1 Sơ đồ bối cảnh hệ thống
- Hình 2 Use-case thanh toán trực tuyến
- Hình 3 Use-case tra cứu lịch sử tiêu thụ và thanh toán
- Hình 4 Use-case đăng nhập
- Hình 5 WireFrame Login
- Hình 6 WireFrame Hone
- Hình 7 WireFrame Invoice details
- Hình 8 WireFrame History and Stats
- Hình 9 WireFrame Request and Complaints
- Hình 10 WireFrame Nhập chỉ số ban quản lý
- Hình 11 WireFrame Quản lý hóa đơn
- Hình 12 WireFrame Đối soát dòng tiền kế toán

## Version / Change log

| Ngày | Tác giả | Mô tả |
|---|---|---|
| 2026-05-27 | NGUYEN VAN HAU | Cập nhật nội dung, thêm yêu cầu bảo mật webhook, bổ sung kịch bản E2E và change log |

---

# Tuần 1: Xây dựng tầm nhìn chiến lược ban đầu

## 1.1 TÀI LIỆU TẦM NHÌN DỰ ÁN (PROJECT VISION)

**Dự án:** Hệ thống Quản lý Phí Dịch vụ và Thanh toán Chung cư (SmartFee Apartment)

### 1.1.1 Vấn đề cần giải quyết (The Problem)

Hiện nay, việc quản lý phí tại các chung cư vẫn gặp nhiều bất cập:

- **Thủ công & Sai sót:** Ban quản lý (BQL) tính toán phí thủ công (Excel), dẫn đến nhầm lẫn số liệu điện, nước, phí quản lý.
- **Thiếu minh bạch:** Cư dân khó theo dõi lịch sử thanh toán, không hiểu rõ cách tính phí hoặc thất lạc hóa đơn giấy.
- **Thanh toán bất tiện:** Việc nộp tiền mặt hoặc chuyển khoản thủ công khiến BQL mất thời gian đối soát, cư dân tốn công sức đi lại.
- **Nhắc nợ kém hiệu quả:** Việc nhắc nợ qua loa/giấy dán thường bị bỏ qua, dẫn đến nợ đọng kéo dài.

### 1.1.2 Mục tiêu chính (Main Objectives)

Dự án hướng tới 4 mục tiêu trọng tâm:

- **Tự động hóa:** Tự động tính toán các loại phí định kỳ và gửi thông báo số (Notification/Email) tới cư dân ngay khi có bảng phí.
- **Thanh toán trực tuyến:** Tích hợp các cổng thanh toán (VNPay, Momo, Ngân hàng) để cư dân thanh toán 24/7 chỉ với vài thao tác.
- **Số hóa dữ liệu:** Lưu trữ tập trung toàn bộ lịch sử thu chi, giúp BQL và cư dân dễ dàng tra cứu, đối soát 100% dữ liệu.
- **Nâng cao trải nghiệm:** Giảm thời gian chờ đợi tại văn phòng BQL và tăng sự hài lòng của cư dân thông qua sự minh bạch.

### 1.1.3 Phạm vi dự án (Scope)

| Nằm trong phạm vi (IN Scope) | Nằm ngoài phạm vi (OUT Scope) |
|---|---|
| Phát triển Web cho Cư dân (tra cứu, thanh toán). | Quản lý việc mua bán/cho thuê căn hộ. |
| Phát triển cổng Web dành cho BQL (quản lý chỉ số, xuất báo cáo). | Quản lý kỹ thuật/bảo trì hạ tầng chuyên sâu. |
| Tích hợp cổng thanh toán trực tuyến. | Quản lý lương và nhân sự của Ban quản trị. |
| Hệ thống thông báo nhắc nợ tự động qua Email. | Hệ thống camera an ninh và kiểm soát ra vào. |

## 1.2. XÁC ĐỊNH NGƯỜI DÙNG VÀ CÁC BÊN LIÊN QUAN

### 1.2.1 Danh sách người dùng trực tiếp (Primary Users)

Đây là những người sẽ thao tác trực tiếp trên giao diện của hệ thống:

- **Cư dân (Chủ hộ/Người thuê):** Sử dụng trình duyệt Web (trên điện thoại hoặc máy tính) để nhận thông báo, kiểm tra lịch sử dùng điện nước và thực hiện thanh toán trực tuyến.
- **Nhân viên Ban quản lý (BQL):** Sử dụng hệ thống web để nhập chỉ số điện nước, quản lý danh sách căn hộ, gửi thông báo phí đồng loạt và quản lý yêu cầu từ cư dân.
- **Kế toán chung cư:** Sử dụng hệ thống để đối soát các khoản thanh toán, xác nhận tiền đã về tài khoản và xuất các báo cáo tài chính hàng tháng.
- **Quản trị viên hệ thống (Admin):** Thiết lập các tham số hệ thống, phân quyền người dùng và bảo trì dữ liệu.

### 1.2.2 Các bên liên quan gián tiếp (Secondary Stakeholders)

Những người không trực tiếp thao tác thường xuyên nhưng hưởng lợi hoặc bị ảnh hưởng bởi hệ thống:

- **Ban quản trị chung cư (BQT):** Theo dõi các báo cáo tổng quát về tình hình thu phí và công nợ để giám sát hoạt động của BQL.
- **Chủ đầu tư:** Nâng cao uy tín và giá trị của dự án nhờ dịch vụ quản lý hiện đại, minh bạch.
- **Đối tác thanh toán (Ngân hàng, Momo, VNPay...):** Cung cấp hạ tầng thanh toán tích hợp vào hệ thống.

### 1.2.3 Chân dung người dùng (User Personas)

Dưới đây là 3 chân dung người dùng điển hình để định hình tính năng sản phẩm:

**Persona 1: Anh A**

- **Vai trò:** Cư dân, nhân viên văn phòng.
- **Mục tiêu:** Muốn thanh toán mọi loại phí chỉ trong 1 phút qua điện thoại; cần xem lại lịch sử đóng tiền các tháng trước khi cần đối soát.
- **Pain points:** Hay quên hạn đóng phí vì bận đi công tác; rất ngại phải xuống văn phòng BQL để đóng tiền mặt trong giờ hành chính.

**Persona 2: Anh B**

- **Vai trò:** Nhân viên hành chính Ban quản lý.
- **Mục tiêu:** Giảm bớt thời gian nhập liệu thủ công; gửi thông báo phí đến 100 căn hộ một cách chính xác và nhanh chóng.
- **Pain points:** Mệt mỏi vì phải in và đi phát từng tờ giấy báo phí; thường xuyên bị cư dân khiếu nại do sai sót khi nhập chỉ số điện nước từ sổ tay vào Excel.

**Persona 3: Chị C**

- **Vai trò:** Kế toán trưởng tòa nhà.
- **Mục tiêu:** Dễ dàng đối soát dòng tiền; hệ thống tự động gạch nợ cho cư dân khi tiền về tài khoản để tránh nhầm lẫn.
- **Pain points:** Mất quá nhiều thời gian để tra cứu xem một khoản tiền chuyển khoản lạ (không ghi rõ nội dung) là của căn hộ nào.

## 1.3. XÁC ĐỊNH BỐI CẢNH HỆ THỐNG (SYSTEM CONTEXT)

### 1.3.1 Sơ đồ bối cảnh (Context Diagram)

Trong sơ đồ này, **Hệ thống Quản lý Phí Chung cư** nằm ở trung tâm. Các thực thể bên ngoài tương tác với hệ thống bao gồm:

- **Cư dân:** Nhận thông báo và thực hiện thanh toán.
- **Ban quản lý (BQL) / Kế toán:** Nhập dữ liệu chỉ số và quản lý báo cáo.
- **Cổng thanh toán (VNPay/Momo):** Xử lý giao dịch tài chính.
- **Hệ thống gửi tin nhắn (SMS/Email Gateway):** Chuyển tải thông báo đến cư dân.

### 1.3.2 Các hệ thống/dịch vụ bên ngoài cần tích hợp

Để hệ thống vận hành trơn tru, cần kết nối với các dịch vụ sau:

- **API Cổng thanh toán:** Để xác thực giao dịch và nhận kết quả thanh toán thời gian thực (Webhook).
- **Dịch vụ Email/SMS:** Để gửi tự động hóa đơn và nhắc nợ định kỳ.
- **Hệ thống Ngân hàng (nếu có):** Để đối soát tự động các khoản chuyển khoản qua mã QR định danh (Virtual Account).

### 1.3.3 Danh sách Dữ liệu Đầu vào và Đầu ra chính

| Thực thể tương tác | Dữ liệu Đầu vào (Inputs) | Dữ liệu Đầu ra (Outputs) |
|---|---|---|
| Cư dân | Xác nhận thanh toán, Yêu cầu hỗ trợ/khiếu nại. | Thông báo phí hàng tháng, Biên lai điện tử, Lịch sử dùng dịch vụ. |
| Ban quản lý | Chỉ số điện/nước, Danh sách căn hộ, Biểu giá dịch vụ mới. | Báo cáo công nợ, Thống kê doanh thu, Danh sách cư dân chưa đóng phí. |
| Cổng thanh toán | Kết quả giao dịch (Thành công/Thất bại), Mã tham chiếu. | Yêu cầu thanh toán (Số tiền, Nội dung). |
| Hệ thống Email/SMS | Trạng thái gửi tin (Đã nhận/Lỗi). | Nội dung thông báo phí, Mã OTP xác thực. |

Cài đặt hạn thanh toán (moved to Payment rules section)

Hình 1 Sơ đồ bối cảnh hệ thống

---

# Tuần 2: Xây dựng use-case và các chi tiết sâu hơn

## 2.1 HỆ THỐNG USE CASE CHI TIẾT

### 2.1.1 PHÂN HỆ 1: DÀNH CHO CƯ DÂN

**1. UC-R01: Tra cứu thông báo phí**

- **Mô tả:** Cư dân xem chi tiết các khoản phí cần đóng trong tháng hiện tại và trạng thái của chúng.
- **Tác nhân:** Cư dân.
- **Tiền điều kiện:** Cư dân đã đăng nhập thành công vào ứng dụng.
- **Hậu điều kiện:** Hiển thị rõ ràng, đầy đủ thông tin về phí.
- **Điều kiện kích hoạt:** Cư dân chọn mục "Hóa đơn" hoặc nhấn vào thông báo phí mới nhận được.
- **Luồng chính:**
  1. Cư dân nhấn vào mục "Thông báo phí".
  2. Hệ thống truy vấn dữ liệu từ bảng hóa đơn dựa trên mã căn hộ.
  3. Hệ thống hiển thị bảng kê chi tiết: Tiền điện, nước (số cũ/mới), phí quản lý, phí gửi xe và tổng cộng.
  4. Hệ thống hiển thị hạn chót thanh toán và trạng thái (Chưa thanh toán/Đã thanh toán).
- **Ngoại lệ:** 2. Hệ thống không tìm thấy hóa đơn tháng hiện tại → Hiển thị thông báo "Hóa đơn đang trong quá trình xử lý".
- **Use case liên quan:** UC-R02 (Thanh toán trực tuyến).

**UC-R02: Thanh toán trực tuyến (Cư dân)**

- **Mô tả:** Cư dân thanh toán hóa đơn ngay trên Web Portal (trên giao diện di động).
- **Tác nhân:** Cư dân, Cổng thanh toán.
- **Tiền điều kiện:** Có hóa đơn ở trạng thái "Chưa thanh toán".
- **Hậu điều kiện:** Trạng thái hóa đơn cập nhật thành "Đã thanh toán".

Hình 2 Use-case thanh toán trực tuyến

- **Luồng chính:**
  1. Cư dân mở Web, chọn mục "Hóa đơn".
  2. Cư dân chọn hóa đơn cần đóng và nhấn "Thanh toán".
  3. Hệ thống chuyển hướng tới giao diện Cổng thanh toán.
  4. Cư dân thực hiện xác thực giao dịch trên điện thoại.
  5. Hệ thống nhận xác thực thành công từ cổng thanh toán.
  6. Hệ thống hiển thị thông báo "Thanh toán thành công" và gửi biên lai PDF.
- **Ngoại lệ:** 5. Giao dịch bị hủy/Lỗi mạng → Hệ thống thông báo lỗi và giữ nguyên trạng thái nợ.
- **Use case liên quan:** UC-A01 (Đối soát tự động).

**3. UC-R03: Tra cứu lịch sử tiêu thụ và thanh toán**

- **Mô tả:** Xem lại dữ liệu sử dụng điện, nước và các biên lai đã đóng trong quá khứ.
- **Tác nhân:** Cư dân.
- **Tiền điều kiện:** Cư dân đã sử dụng dịch vụ ít nhất 1 tháng.
- **Hậu điều kiện:** Cư dân xem được biểu đồ và danh sách lịch sử.
- **Điều kiện kích hoạt:** Cư dân chọn mục "Lịch sử" hoặc "Biểu đồ tiêu thụ".

Hình 3 Use-case tra cứu lịch sử tiêu thụ và thanh toán

- **Luồng chính:**
  1. Cư dân chọn khoảng thời gian cần tra cứu (ví dụ: 6 tháng gần nhất).
  2. Hệ thống truy xuất dữ liệu chỉ số điện/nước và các giao dịch đã thực hiện.
  3. Hệ thống hiển thị biểu đồ đường (Line Chart) so sánh mức tiêu thụ giữa các tháng.
  4. Cư dân có thể nhấn vào từng tháng để xem lại biên lai điện tử (E-receipt).
- **Ngoại lệ:** 2. Không có dữ liệu trong khoảng thời gian đã chọn → Hiển thị "Không có dữ liệu".
- **Use case liên quan:** UC-M02 (Nhập chỉ số).

**4. UC-R04: Đăng ký dịch vụ phát sinh**

- **Mô tả:** Đăng ký thêm thẻ xe, thẻ thang máy hoặc các dịch vụ tiện ích khác.
- **Tác nhân:** Cư dân, Ban quản lý (người duyệt).
- **Tiền điều kiện:** Tài khoản cư dân đang hoạt động hợp lệ.
- **Hậu điều kiện:** Yêu cầu được gửi đến BQL chờ phê duyệt.
- **Điều kiện kích hoạt:** Cư dân chọn "Đăng ký dịch vụ mới".
- **Luồng chính:**
  1. Cư dân chọn loại dịch vụ (ví dụ: Đăng ký thêm 1 xe máy).
  2. Cư dân nhập thông tin (Biển số xe, đính kèm ảnh cà vẹt xe).
  3. Cư dân nhấn "Gửi yêu cầu".
  4. Hệ thống lưu yêu cầu vào danh sách chờ duyệt của BQL.
  5. Sau khi BQL duyệt, hệ thống tự động cộng phí gửi xe mới vào hóa đơn tháng sau.
- **Ngoại lệ:** 2. Thông tin nhập thiếu hoặc ảnh đính kèm không hợp lệ → Hệ thống yêu cầu bổ sung.
- **Use case liên quan:** UC-M01 (Quản lý căn hộ/cư dân).

**5. UC-R05: Phản hồi và Khiếu nại**

- **Mô tả:** Gửi thắc mắc về chỉ số sai hoặc yêu cầu hỗ trợ kỹ thuật.
- **Tác nhân:** Cư dân, Ban quản lý.
- **Tiền điều kiện:** Cư dân phát hiện bất thường trong hóa đơn hoặc dịch vụ.
- **Hậu điều kiện:** Khiếu nại được ghi nhận và có mã theo dõi (Ticket).
- **Điều kiện kích hoạt:** Cư dân chọn "Gửi khiếu nại" trong chi tiết hóa đơn.
- **Luồng chính:**
  1. Cư dân nhập nội dung thắc mắc và đính kèm ảnh minh chứng (nếu có).
  2. Hệ thống tạo mã Ticket xử lý và gửi thông báo đến bộ phận hành chính BQL.
  3. Khi BQL phản hồi, cư dân nhận được thông báo trạng thái "Đang xử lý" hoặc "Đã giải quyết".
- **Ngoại lệ:** 1. Nội dung khiếu nại trống → Hệ thống không cho phép gửi.
- **Use case liên quan:** UC-M02 (Nhập chỉ số).

**6. UC-R06: Đăng nhập**

- **Mô tả:** Cư dân đăng nhập.
- **Tác nhân:** Cư dân.
- **Tiền điều kiện:** Cư dân đã có tài khoản.
- **Hậu điều kiện:** Cư dân được xác định, sử dụng được các chức năng.
- **Điều kiện kích hoạt:** Cư dân bấm "Đăng nhập".

Hình 4 Use-case đăng nhập

- **Luồng chính:**
  1. Cư dân nhập thông tin tài khoản.
  2. Cư dân bấm "Đăng nhập".
  3. Hệ thống xác thực:
     - Nếu thông tin đúng, chuyển tới màn hình chính.
     - Nếu thông tin không đúng, thông báo lỗi "Sai tên đăng nhập hoặc mật khẩu. Vui lòng kiểm tra lại".
- **Ngoại lệ:** 1. Cư dân nhập thông tin không hợp lệ về định dạng → Hệ thống không cho phép gửi.
- **Use case liên quan:** Không có.

**7. UC-R07: Đăng ký**

- **Mô tả:** Cư dân đăng ký.
- **Tác nhân:** Cư dân, ban quản lý.
- **Tiền điều kiện:** Cư dân đã có định danh trong chung cư.
- **Hậu điều kiện:** Cư dân được xác định, có thể đăng nhập sau này.
- **Điều kiện kích hoạt:** Cư dân bấm "Đăng ký".
- **Luồng chính:**
  1. Cư dân nhập thông tin tài khoản, nhập *địa chỉ nhà trong chung cư*.
  2. Cư dân bấm "Đăng ký".
  3. Hệ thống tiến hành ghi nhận, gửi thông tin Cư dân đến Ban quản lý.
  4. Thông báo "Vui lòng chờ ban quản lý xác nhận. Yêu cầu đăng ký của bạn sẽ được phản hồi trong vòng [n] giờ". [n] có thể là 24 hoặc khác tùy vào cài đặt của ban quản lý.
  5. Thông báo "Đăng ký thành công".
- **Ngoại lệ:** 1. Nếu *địa chỉ nhà trong chung cư* trùng lặp với nhà đang có người đăng ký hoặc Cư dân nhập thông tin không hợp lệ - chưa được đăng ký định danh trong chung cư thì thông báo lỗi.
- **Use case liên quan:** Không có.

### 2.1.2 PHÂN HỆ 2: BAN QUẢN LÝ

**UC-M02: Nhập chỉ số điện/nước**

- **Mô tả:** Nhân viên BQL nhập số liệu tiêu thụ điện, nước của từng căn hộ vào hệ thống.
- **Tác nhân:** Nhân viên BQL.
- **Tiền điều kiện:** Đã đến kỳ chốt số (hàng tháng).
- **Hậu điều kiện:** Chỉ số mới được lưu và sẵn sàng để tính phí.
- **Điều kiện kích hoạt:** Nhân viên chọn chức năng "Ghi chỉ số".
- **Luồng chính:**
  1. Nhân viên chọn căn hộ hoặc quét mã QR đồng hồ.
  2. Hệ thống hiển thị chỉ số tháng trước.
  3. Nhân viên nhập chỉ số mới.
  4. Hệ thống kiểm tra: Nếu số mới >= số cũ thì cho phép lưu.
  5. Hệ thống ghi nhận giá trị và người thực hiện.
- **Ngoại lệ:** 4. Chỉ số mới thấp hơn chỉ số cũ → Hệ thống báo lỗi và yêu cầu kiểm tra lại đồng hồ.
- **Use case liên quan:** UC-M03 (Tính toán phí tự động).

**UC-M03: Tính toán phí tự động**

- **Mô tả:** Hệ thống tự động quy đổi từ chỉ số tiêu thụ sang số tiền phải nộp dựa trên biểu giá.
- **Tác nhân:** Hệ thống (tự động) hoặc Nhân viên BQL.
- **Tiền điều kiện:** Đã có chỉ số điện/nước và biểu giá đã được thiết lập.
- **Hậu điều kiện:** Hóa đơn (Draft) được tạo ra cho cư dân.
- **Điều kiện kích hoạt:** Nhân viên nhấn "Tính phí tháng [X]".
- **Luồng chính:**
  1. Hệ thống quét danh sách căn hộ.
  2. Với mỗi căn hộ, hệ thống tính tiền điện/nước theo công thức lũy tiến.
  3. Hệ thống tính phí quản lý (Diện tích x Đơn giá).
  4. Hệ thống cộng các phí dịch vụ cố định (Xe máy, ô tô).
  5. Hệ thống lưu kết quả vào bảng hóa đơn nháp.
- **Ngoại lệ:** 3. Căn hộ chưa được nhập chỉ số → Hệ thống thông báo danh sách căn hộ còn thiếu dữ liệu.
- **Use case liên quan:** UC-A02 (Quản lý biểu giá).

### 2.1.3 PHÂN HỆ 3: KẾ TOÁN (FINANCE)

**UC-A01: Đối soát thanh toán tự động**

- **Mô tả:** Hệ thống tự động kiểm tra tiền về tài khoản ngân hàng và gạch nợ trên phần mềm.
- **Tác nhân:** Hệ thống, Ngân hàng.
- **Tiền điều kiện:** Ngân hàng hỗ trợ API hoặc mã định danh (Virtual Account).
- **Hậu điều kiện:** Cư dân được gạch nợ tức thời mà không cần kế toán thao tác tay.
- **Điều kiện kích hoạt:** Có thông báo biến động số dư từ Ngân hàng.
- **Luồng chính:**
  1. Hệ thống nhận tín hiệu từ Ngân hàng qua API.
  2. Hệ thống bóc tách nội dung chuyển khoản để tìm Mã căn hộ/Mã hóa đơn.
  3. Hệ thống đối chiếu số tiền chuyển và số tiền nợ.
  4. Nếu khớp, hệ thống cập nhật hóa đơn là "Đã thanh toán".
  5. Hệ thống tự động xuất biên lai điện tử gửi cho cư dân.
- **Ngoại lệ:** 3. Nội dung chuyển khoản sai/thiếu thông tin → Hệ thống đẩy vào danh sách "Chờ đối soát thủ công" để kế toán xử lý.
- **Use case liên quan:** UC-M05 (Nhắc nợ đa cấp).

**UC-A02: Đối soát thủ công**

- **Mô tả:** Hệ thống thông báo về việc có giao dịch cần đối soát thủ công với kế toán.
- **Tác nhân:** Hệ thống, kế toán.
- **Tiền điều kiện:** Có thông báo "Chờ đối soát thủ công".
- **Hậu điều kiện:** Cư dân được gạch nợ.
- **Điều kiện kích hoạt:** Kế toán chọn giao dịch cần đối soát thủ công.
- **Luồng chính:**
  1. Hệ thống trích xuất giao dịch.
  2. Kế toán xác nhận "Đã thành công" hoặc "Đã thất bại". Nếu thành công thì bước 3, thất bại thì ngoại lệ.
  3. Hệ thống đối chiếu số tiền chuyển và số tiền nợ.
  4. Nếu khớp, hệ thống cập nhật hóa đơn là "Đã thanh toán".
  5. Hệ thống tự động xuất biên lai điện tử gửi cho cư dân.
- **Ngoại lệ:** 1. Không xác thực được giao dịch → Cập nhật "Chưa thanh toán".
- **Use case liên quan:** UC-A02 (Đối soát tự động).

### 2.1.4 PHÂN HỆ 4: QUẢN TRỊ (ADMIN)

**UC-S01: Phân quyền người dùng**

- **Mô tả:** Admin thiết lập quyền hạn cho các nhân viên khác nhau (Kế toán, Kỹ thuật, Lễ tân).
- **Tác nhân:** Quản trị viên (Admin).
- **Tiền điều kiện:** Tài khoản nhân viên đã được tạo.
- **Hậu điều kiện:** Nhân viên chỉ truy cập được các chức năng được cho phép.
- **Điều kiện kích hoạt:** Admin truy cập mục "Quản lý phân quyền".
- **Luồng chính:**
  1. Admin chọn tài khoản nhân viên cần thiết lập.
  2. Admin tích chọn các Module (ví dụ: Kế toán chỉ được xem báo cáo và đối soát).
  3. Admin nhấn "Lưu".
  4. Hệ thống cập nhật bảng quyền (Permissions) trong Database.
- **Ngoại lệ:** 3. Admin tự tước quyền của chính mình → Hệ thống báo lỗi "Cần ít nhất một Admin cao hơn".
- **Use case liên quan:** UC-S03 (Nhật ký hệ thống).

### 2.1.5 TỔNG HỢP CÁC USE CASE KHÁC (TÓM TẮT)

**UC-M05: Nhắc nợ tự động (Hệ thống/BQL)**

- *Mô tả:* Tự động gửi tin nhắn nhắc nợ cho cư dân khi đến hạn.
- *Tác nhân:* Hệ thống (tự động), Nhân viên BQL.
- *Tiền điều kiện:* Đến cấu hình ngày nhắc nợ và căn hộ vẫn đang nợ phí.
- *Hậu điều kiện:* Cư dân nhận được thông báo nhắc nhở qua Email.
- *Luồng chính:*
  1. Hệ thống quét bảng Invoices để tìm các bản ghi quá hạn.
  2. Hệ thống lấy thông tin liên lạc của chủ hộ tương ứng.
  3. Hệ thống áp dụng mẫu tin nhắn nhắc nợ đã soạn sẵn.
  4. Hệ thống thực hiện gửi thông báo qua Email.
  5. Hệ thống ghi nhật ký: "Đã gửi nhắc nợ lần X cho căn hộ Y".

**UC-S02 (Cấu hình tham số):**

- *Tiền điều kiện:* Quyền Admin.
- *Luồng chính:* Thay đổi ngày hạn chót, cách tính phí → Lưu cấu hình toàn hệ thống.

## 2.2 MÔ HÌNH HÓA QUY TRÌNH (PROCESS MODELING)

Phần này trực quan hóa luồng nghiệp vụ của các quy trình có tính chất liên phòng ban hoặc tương tác với hệ thống bên ngoài. Mỗi biểu đồ được thiết kế với các làn bơi (Swimlanes) để phân định rõ trách nhiệm của từng tác nhân.

### 2.2.1 Lựa chọn quy trình mô hình hóa

Dựa trên danh mục Use Case tại mục 2.1, 5 quy trình sau được lựa chọn để mô hình hóa do có luồng rẽ nhánh phức tạp và yêu cầu tính toàn vẹn dữ liệu cao:

- UC-R01: Tra cứu thông báo phí
- UC-R02: Thanh toán trực tuyến (Cư dân)
- UC-R07: Đăng ký
- UC-M03: Tính toán phí tự động
- UC-A01: Đối soát thanh toán tự động

## 2.3 MÔ HÌNH HÓA DỮ LIỆU KHÁI NIỆM (CONCEPTUAL DATA MODELING)

### 2.3.1 Danh mục Thực thể (Entity Catalog)

| Tên Thực thể (Entity) | Định nghĩa | Phân loại | Ước tính Khối lượng | Ví dụ |
|---|---|---|---|---|
| Resident (Cư dân) | Thông tin liên lạc, tài khoản của chủ hộ/người thuê | Core | Vài trăm | Nguyễn Văn A, 090xxxx |
| Apartment (Căn hộ) | Thông tin vật lý của phòng (diện tích, mã căn) | Core | Theo số lượng căn hộ | A1-05, 75m2 |
| Invoice (Hóa đơn) | Phiếu thu tiền tổng hợp hàng tháng của 1 căn | Core | Hàng chục ngàn | Hóa đơn tháng 5/2026 |
| MeterReading (Chỉ số) | Bản ghi lưu số điện, nước chốt hàng tháng | Associative | Hàng chục ngàn | Số cũ 100, mới 150 |
| Payment (Giao dịch) | Lịch sử thanh toán từ các cổng/ngân hàng | Core | Hàng chục ngàn | Giao dịch VNPay 500k |

### 2.3.2 Danh mục Mối quan hệ (Relationship Catalog)

| Thực thể (Entities) | Tên mối quan hệ (A->B / B->A) | Bản số (Cardinality) | Tham chiếu quy tắc (BR Reference) |
|---|---|---|---|
| User - Apartment | Người dùng Sở hữu / Căn hộ Thuộc về | 1 : M | BR-06, BR-09 |
| Apartment - MeterReadings | Căn hộ Có / Chỉ số Ghi nhận cho | 1 : M | BR-03, BR-04 |
| Apartment - Invoice | Căn hộ Phát sinh / Hóa đơn Gửi tới | 1 : M | BR-07 |
| MeterReadings - Invoice | Chỉ số Căn cứ để tính / Hóa đơn Dựa trên | 1 : 1 | BR-01, BR-02 |
| Invoice - Payment | Hóa đơn Được trả bởi / Giao dịch Thanh toán cho | 1 : M | BR-05, BR-08 |
| User - Notification | Người dùng Nhận / Thông báo Gửi đến | 1 : M | BR-07 |
| Admin (User) - Invoice | Quản trị viên Quản lý / Hóa đơn Được duyệt bởi | 1 : M | BR-05 |

### 2.3.3 Các thuộc tính và Định danh chính (Key Attributes & Identifiers)

- **Resident:** ResidentID (FK), FullName, Phone, Email, Status.
- **Apartment:** ApartmentID (FK), RoomNumber, Area, OccupancyStatus.
- **Invoice:** InvoiceID (FK), BillingMonth, TotalAmount (Thuộc tính dẫn xuất), Status, DueDate.
- **Payment:** PaymentID (FK), TransactionRef (từ VNPay), Amount, PaymentDate.

### 2.3.4 Danh mục Quy tắc Nghiệp vụ (Business Rules Catalog)

| Rule ID | Nội dung (Rule Statement) | Loại (Type) | Thực thể ảnh hưởng (Entities Affected) | Nguồn (Source) |
|---|---|---|---|---|
| BR-01 | Tính phí điện bậc thang: Tiền điện được tính theo lũy kế 6 bậc dựa trên tổng lượng tiêu thụ (Mới - Cũ) theo quy định của EVN. | Tính toán | Invoice, MeterReadings | UC-M03 |
| BR-02 | Định mức nước: Phí nước tính theo đơn giá cố định trên mỗi m3. Nếu căn hộ có đăng ký định mức, phần trong định mức tính giá thấp, phần vượt định mức tính giá cao. | Tính toán | Invoice, Apartment | UC-M03 |
| BR-03 | Kiểm tra chỉ số: Chỉ số điện/nước mới nhập vào hệ thống bắt buộc phải lớn hơn hoặc bằng chỉ số cũ của tháng liền kề trước đó. | Xác thực | MeterReadings | UC-M02 |
| BR-04 | Chốt dữ liệu hàng tháng: Chỉ cho phép nhập/chỉnh sửa chỉ số tiêu thụ từ ngày 25 đến ngày cuối cùng của tháng để đảm bảo tính đồng nhất dữ liệu hóa đơn. | Quy trình | MeterReadings, Invoice | UC-M02 |
| BR-05 | Tính toàn vẹn hóa đơn: Hóa đơn sau khi đã chuyển sang trạng thái "Đã thanh toán" (PAID) thì không được phép xóa hoặc sửa đổi bất kỳ thông số tài chính nào. | Xác thực | Invoice, Payment | UC-R02, UC-M04 |
| BR-06 | Bảo mật dữ liệu cư dân: Người dùng với vai trò Resident chỉ có quyền truy cập và xem dữ liệu (hóa đơn, lịch sử) thuộc về căn hộ mà họ được định danh làm chủ. | Phân quyền | User, Apartment, Invoice | UC-R03, UC-R06 |
| BR-07 | Thời hạn thanh toán: Hóa đơn phát hành vào ngày 1 hàng tháng phải được thanh toán trước ngày 15. Sau ngày này, hệ thống sẽ tự động gửi thông báo nhắc nợ. | Quy trình | Invoice (due_date), Notification | UC-M03, UC-R04 |
| BR-08 | Xác thực thanh toán trực tuyến: Mọi giao dịch qua cổng thanh toán (VNPay/Momo) phải được đối soát mã giao dịch (Transaction ID) và chữ ký số trước khi cập nhật trạng thái hóa đơn. | Xác thực | Payment, Invoice | UC-R02 |
| BR-09 | Quản lý cư trú: Một căn hộ tại một thời điểm chỉ có duy nhất một người dùng được đăng ký là "Chủ hộ" để chịu trách nhiệm pháp lý về hóa đơn. | Cấu trúc | Apartment, User | UC-M01 |
| BR-10 | Mã hóa mật khẩu: Thông tin mật khẩu người dùng bắt buộc phải được băm (hashing) trước khi lưu trữ vào cơ sở dữ liệu, không lưu văn bản thuần túy. | Bảo mật | User (password) | UC-R06 |

### 2.3.5 Các ghi chú và giả định (Notes & Assumptions):

- **Giả định 1:** Hệ thống coi mỗi đồng hồ điện/nước gắn liền với một căn hộ cố định. Nếu thay đồng hồ, quản trị viên phải thực hiện quy trình cập nhật chỉ số đầu kỳ thủ công.
- **Giả định 2:** Các đơn giá (điện, nước, phí quản lý) được cấu hình theo bảng giá chung của tòa nhà và có thể thay đổi theo từng thời điểm bởi Ban quản lý.
- **Ghi chú:** Mô hình dữ liệu hiện tại tập trung vào luồng nghiệp vụ chính là Thu phí. Các thực thể liên quan đến quản lý cơ sở hạ tầng chi tiết (bảo trì, sửa chữa) nằm ngoài phạm vi của mô hình này.

### 2.3.6 Sơ đồ ERD khái niệm (Conceptual ERD)

*(Chèn ERD vào đây)*

---

# Tuần 3: Hoàn thành yêu cầu chi tiết

## 3.1 TÀI LIỆU DANH SÁCH YÊU CẦU CHỨC NĂNG

**Mục đích:** Chuyển đổi các Use Case thành những phát biểu hệ thống cụ thể, có thể kiểm thử và truy xuất được, phục vụ cho việc phát triển và nghiệm thu.

### 3.1.1 Yêu cầu theo lĩnh vực tính năng

**A. Phân hệ Cư dân (Web)**

- **REQ-001: Tra cứu danh sách hóa đơn**
  - **Phát biểu:** Hệ thống phải cho phép cư dân xem danh sách toàn bộ hóa đơn (đã thanh toán và chưa thanh toán) của căn hộ mình.
  - **Nguồn:** UC-R01
  - **Tiêu chí chấp nhận:** Cư dân đã đăng nhập thành công. Khi truy cập menu "Hóa đơn", sau đó hệ thống hiển thị danh sách hóa đơn sắp xếp theo tháng gần nhất.
  - **Quy tắc nghiệp vụ:** BR-04 (Chỉ hiển thị hóa đơn thuộc căn hộ người dùng đang cư trú).

- **REQ-002: Xem chi tiết khoản phí**
  - **Phát biểu:** Hệ thống phải hiển thị phân rã chi tiết các loại phí trong một hóa đơn: Tiền điện, tiền nước, phí quản lý, phí gửi xe.
  - **Nguồn:** UC-R01
  - **Tiêu chí chấp nhận:** Cư dân đang ở màn hình danh sách, khi nhấn chọn 1 hóa đơn, khi đó hệ thống hiển thị chi tiết số lượng tiêu thụ (chỉ số cũ/mới) và thành tiền từng loại.

- **REQ-003: Khởi tạo thanh toán trực tuyến**
  - **Phát biểu:** Hệ thống phải cho phép người dùng chọn hóa đơn chưa thanh toán và khởi tạo yêu cầu thanh toán qua cổng trung gian.
  - **Nguồn:** UC-R02
  - **Tiêu chí chấp nhận:** Khi hóa đơn ở trạng thái "Chưa thanh toán", và có cư dân nhấn nút "Thanh toán ngay". Hệ thống hiển thị các phương thức thanh toán khả dụng (VNPay/Momo).

- **REQ-004: Tích hợp Cổng thanh toán**
  - **Phát biểu:** Hệ thống phải chuyển hướng người dùng an toàn sang ứng dụng hoặc trang web của đối tác thanh toán với đầy đủ thông tin mã giao dịch và số tiền.
  - **Nguồn:** UC-R02
  - **Tiêu chí chấp nhận:** Cư dân chọn VNPay, nhấn xác nhận thanh toán, lúc đó hệ thống mở SDK/Deep link của VNPay.

- **REQ-005: Hiển thị biểu đồ tiêu thụ điện/nước**
  - **Phát biểu:** Hệ thống phải tổng hợp dữ liệu và hiển thị biểu đồ so sánh mức tiêu thụ 6 tháng liên tiếp.
  - **Nguồn:** UC-R03
  - **Tiêu chí chấp nhận:** Khi có dữ liệu chỉ số của ít nhất 2 tháng. Cư dân vào mục "Thống kê", hệ thống sẽ hiển thị biểu đồ đường thể hiện sự biến động tiêu thụ.

- **REQ-006: Đăng ký dịch vụ mới**
  - **Phát biểu:** Hệ thống phải cung cấp form đăng ký các dịch vụ chung cư (thẻ xe, thẻ thang máy, sửa chữa).
  - **Nguồn:** UC-R04
  - **Tiêu chí chấp nhận:** Cư dân cần thẻ gửi xe mới, sẽ điền thông tin và đính kèm ảnh giấy tờ, rồi hệ thống lưu yêu cầu ở trạng thái "Chờ duyệt".

- **REQ-007: Gửi phản hồi và khiếu nại**
  - **Phát biểu:** Hệ thống phải cho phép cư dân gửi phản hồi kèm hình ảnh và cấp mã Ticket tự động để theo dõi.
  - **Nguồn:** UC-R05

- **REQ-008: Nhận thông báo nhắc nợ**
  - **Phát biểu:** Hệ thống phải gửi thông báo tự động tới thiết bị cư dân khi có hóa đơn mới hoặc sắp đến hạn chót.
  - **Nguồn:** Sprint 4

**B. Phân hệ Ban Quản Lý**

- **REQ-009: Quản lý thông tin cư dân**
  - **Phát biểu:** Hệ thống phải cho phép BQL thêm, sửa, xóa và cập nhật trạng thái cư trú của cư dân theo từng căn hộ.
  - **Nguồn:** UC-M01

- **REQ-010: Ghi nhận chỉ số tiêu thụ định kỳ**
  - **Phát biểu:** Hệ thống phải cho phép nhân viên BQL nhập chỉ số điện, nước mới cho từng căn hộ theo tháng.
  - **Nguồn:** UC-M02
  - **Tiêu chí chấp nhận:** Khi nhân viên nhập số mới, nhưng số mới thấp hơn số cũ, thì hệ thống báo lỗi và yêu cầu kiểm tra lại.

- **REQ-011: Tính toán phí tự động**
  - **Phát biểu:** Hệ thống phải tự động tính toán tổng phí dựa trên chỉ số đã nhập và các quy tắc giá lũy tiến.
  - **Nguồn:** UC-M03
  - **Quy tắc nghiệp vụ:** BR-01 (Giá điện theo bậc thang), BR-02 (Giá nước theo định mức).

- **REQ-012: Phê duyệt yêu cầu dịch vụ**
  - **Phát biểu:** Hệ thống phải cho phép BQL duyệt hoặc từ chối các yêu cầu đăng ký dịch vụ/khiếu nại của cư dân.
  - **Nguồn:** UC-R04, UC-R05

**C. Phân hệ Kế toán & Hệ thống**

- **REQ-013: Xử lý phản hồi từ Cổng thanh toán**
  - **Phát biểu:** Hệ thống phải tự động cập nhật trạng thái hóa đơn sang "Đã thanh toán" ngay khi nhận được tín hiệu thành công từ đối tác.
  - **Nguồn:** UC-A01

- **REQ-013a: Bảo mật Webhook & Idempotency**
  - **Phát biểu:** Hệ thống phải đảm bảo an toàn và tính đúng đắn khi nhận Webhook từ cổng thanh toán:
    - Bắt buộc cung cấp `payment.webhook.secret` dưới dạng system property hoặc secret quản lý cấu hình; nếu không có, webhook bị từ chối (strict mode).
    - Xác thực Webhook bằng HMAC-SHA256(secret, transactionRef) và so sánh với chữ ký do cổng thanh toán gửi (Base64 hoặc hex theo thỏa thuận).
    - Đảm bảo idempotency: webhook trùng `transactionRef` không được xử lý nhiều lần; nếu đã tồn tại giao dịch đã ghi `PAID`, trả về 200 nhưng không lặp cập nhật.
    - Hỗ trợ cơ chế retry theo SLO: nếu xử lý nội bộ lỗi (DB unavailable), trả lỗi tạm thời để cổng thanh toán có thể retry; nếu lỗi xác thực, trả 4xx và từ chối.
  - **Nguồn:** REQ-013, RSK-01

- **REQ-014: Gạch nợ thủ công**
  - **Phát biểu:** Hệ thống phải cho phép kế toán đánh dấu "Đã thanh toán" thủ công cho các trường hợp chuyển khoản trực tiếp hoặc nộp tiền mặt.
  - **Nguồn:** RSK-01

- **REQ-015: Đối soát cuối ngày**
  - **Phát biểu:** Hệ thống phải cung cấp báo cáo đối soát tổng tiền nhận được trên hệ thống so với số dư thực tế tại cổng thanh toán.
  - **Nguồn:** UC-A01

- **REQ-016: Cơ chế Retry Webhook**
  - **Phát biểu:** Hệ thống phải tự động gọi lại API cập nhật trạng thái nếu lần đầu xử lý bị lỗi do mạng.
  - **Nguồn:** RSK-01

### 3.1.2 Ma trận CRUD hệ thống

| Thực thể (Entity) | Create | Read | Update | Delete | Ghi chú |
|---|---|---|---|---|---|
| Cư dân (Resident) | REQ-009 | REQ-009 | REQ-009 | REQ-009 | Xóa logic (Status = Inactive) |
| Hóa đơn (Invoice) | REQ-011 | REQ-001 | REQ-013, 014 | - | Không được xóa hóa đơn |
| Chỉ số (Meter) | REQ-010 | REQ-005 | REQ-010 | - | Chỉ sửa khi chưa chốt phí |
| Giao dịch (Payment) | REQ-003 | REQ-015 | REQ-013 | - | Dữ liệu tài chính không xóa |
| Khiếu nại (Ticket) | REQ-007 | REQ-012 | REQ-012 | REQ-012 | |

### 3.1.3 Ma trận Khả năng Truy xuất

| ID Yêu Cầu | Nguồn Use Case | Phụ thuộc | Thực thể chính |
|---|---|---|---|
| REQ-001 | UC-R01 | REQ-011 | Invoice |
| REQ-003 | UC-R02 | REQ-001 | Payment |
| REQ-010 | UC-M02 | - | Meter |
| REQ-011 | UC-M03 | REQ-010 | Invoice, Meter |
| REQ-013 | UC-A01 | REQ-003 | Payment, Invoice |

## 3.2 ĐẶC TẢ YÊU CẦU PHI CHỨC NĂNG

**Mục đích:** Đảm bảo hệ thống hoạt động ổn định, an toàn và mang lại trải nghiệm tốt nhất cho người dùng thông qua các tiêu chuẩn kỹ thuật.

### 3.2.1 Hiệu năng và Khả năng mở rộng

- **NFR-001:** Hệ thống phải phản hồi kết quả truy vấn hóa đơn trên Web trong vòng dưới 2 giây đối với 95% số lần yêu cầu trong điều kiện mạng ổn định.
- **NFR-002:** Module tính phí phải có khả năng xử lý tính toán và xuất đồng loạt 10 hóa đơn căn hộ trong thời gian không quá 2 phút.

### 3.2.2 Bảo mật

- **NFR-003:** Toàn bộ mật khẩu người dùng và thông tin cá nhân nhạy cảm phải được mã hóa bằng thuật toán SHA-256 hoặc Bcrypt. Không lưu plain-text dưới mọi hình thức.
- **NFR-004:** Hệ thống phải triển khai cơ chế RBAC (Role-based Access Control). Nhân viên BQL không thể truy cập các tính năng đối soát tài chính của Kế toán.

### 3.2.3 Độ sẵn sàng và Tin cậy

- **NFR-005:** Hệ thống phải duy trì thời gian hoạt động tối thiểu 95% trong một tháng (ngoại trừ thời gian bảo trì đã thông báo trước).
- **NFR-006:** Trong trường hợp mất kết nối với cổng thanh toán, hệ thống phải ghi lại nhật ký lỗi chi tiết và cung cấp cơ chế Retry tự động.

### 3.2.4 Tính khả dụng và Tiếp cận

- **NFR-007:** Giao diện Web phải tuân thủ nguyên tắc thiết kế tối giản, hỗ trợ phông chữ lớn và độ tương phản cao để người cao tuổi có thể sử dụng dễ dàng.
- **NFR-008:** Web Portal phải hiển thị chính xác trên các trình duyệt Chrome, Edge, Safari phiên bản mới nhất. Giao diện Web phải tuân thủ chuẩn Responsive Design (Mobile-first) để hiển thị tốt trên trình duyệt của các thiết bị di động.

### 3.2.5 Ràng buộc và Bảo trì

- **NFR-009:** Mọi tích hợp với bên thứ ba (VNPay, Firebase) phải được thực hiện qua Restful API và trả về dữ liệu định dạng JSON tiêu chuẩn.
- **NFR-010:** Hệ thống phải lưu trữ nhật ký (logs) các thay đổi dữ liệu hóa đơn và lịch sử thanh toán trong ít nhất 2 năm để phục vụ thanh tra/đối soát.

## 3.3 TÀI LIỆU WIREFRAMES UI VÀ LUỒNG ĐIỀU HƯỚNG

Tài liệu thiết kế giao diện này bám sát các luồng Use-case đã vạch ra nhằm đảm bảo tính khả dụng cao nhất cho 3 nhóm Persona chính: Cư dân, Nhân viên BQL và Kế toán.

### 3.3.1 Cấu trúc Wireframes chi tiết các màn hình cốt lõi

**A. Phân hệ Web (Dành cho Cư dân - Persona 1)**

Màn hình đăng nhập

Hình 5 WireFrame Login

Màn hình Trang chủ (Home):

- Khu vực trên cùng hiển thị thông báo đẩy (Push Notification) mới nhất (nhắc nợ, thông báo phí).
- Hiển thị tóm tắt Hóa đơn tháng hiện tại với tổng tiền nổi bật.
- Nút "Thanh toán nhanh" (Call-to-Action chính).
- Widget Biểu đồ tiêu thụ thu nhỏ (hiển thị nhanh số điện/nước tháng này so với tháng trước).

Hình 6 WireFrame Home

Màn hình Chi tiết Hóa đơn (Invoice Details):

- Bảng kê chi tiết phân rã các loại phí: Tiền điện (số cũ/mới), tiền nước (số cũ/mới), phí quản lý, phí gửi xe.
- Trạng thái hóa đơn hiển thị rõ ràng: Chưa thanh toán / Đã thanh toán / Quá hạn.
- Cụm nút CTA: Nút "Thanh toán qua VNPay/Momo" màu xanh dương nổi bật và Nút "Gửi khiếu nại" (dành cho trường hợp thấy chỉ số sai lệch).

Hình 7 WireFrame Invoice details

Màn hình Lịch sử & Thống kê:

- Hiển thị biểu đồ đường (Line Chart) cho phép so sánh mức tiêu thụ điện/nước giữa các tháng đã chọn (ví dụ: 6 tháng gần nhất).
- Danh sách các biên lai điện tử (E-receipt) đã thanh toán trong quá khứ, cho phép bấm vào để xem hoặc tải PDF.

Hình 8 WireFrame History and Stats

Màn hình Gửi yêu cầu/Khiếu nại:

- Form nhập liệu nội dung thắc mắc hoặc yêu cầu dịch vụ (đăng ký thêm xe).
- Khu vực đính kèm hình ảnh (ảnh đồng hồ nước, ảnh cà vẹt xe).

Hình 9 WireFrame Request and Complaints

**B. Phân hệ Web Portal (Dành cho BQL & Kế toán - Persona 2 & 3)**

Màn hình Nhập Chỉ Số (BQL):

- Giao diện dạng bảng dữ liệu (Data Grid) hiển thị danh sách các căn hộ theo từng tầng/tòa.
- Các cột thông tin bao gồm: Mã căn hộ, Chỉ số điện cũ, [Ô nhập: Chỉ số điện mới], Chỉ số nước cũ, [Ô nhập: Chỉ số nước mới].
- Cột cảnh báo hiển thị màu đỏ tự động nếu "chỉ số mới" nhập vào nhỏ hơn "chỉ số cũ".
- Nút thao tác hàng loạt: "Tính phí toàn bộ" sau khi chốt xong chỉ số.

Hình 10 WireFrame Nhập chỉ số ban quản lý

Màn hình Quản lý Hóa đơn & Nhắc nợ (BQL):

- Danh sách hóa đơn (nháp, chờ thanh toán, nợ đọng).
- Chức năng "Chốt bảng phí" để hệ thống tự động gửi Email/Notification cho toàn bộ cư dân.

Hình 11 WireFrame Quản lý hóa đơn

Màn hình Đối soát dòng tiền (Kế Toán):

- Danh sách các khoản tiền nhận được từ API Ngân hàng / Cổng thanh toán.
- Hệ thống đánh dấu màu xanh cho các giao dịch tự động khớp (gạch nợ thành công).
- Đánh dấu màu đỏ và đẩy vào danh sách "Chờ đối soát thủ công" đối với các khoản tiền chuyển khoản sai/thiếu nội dung mã căn hộ.
- Có nút để Kế toán tự chọn căn hộ và xác nhận gạch nợ bằng tay.

Hình 12 WireFrame Đối soát dòng tiền kế toán

### 3.3.2 Sơ đồ Luồng Điều Hướng (User Flows)

Dưới đây là mô tả luồng điều hướng của các nghiệp vụ phức tạp nhất cần sự phối hợp giữa nhiều tác nhân:

**Luồng 1 — Thanh toán & Gạch nợ tự động**

1. Cư dân đăng nhập, vào trang chủ, chọn hóa đơn tháng hiện tại.
2. Nhấn "Thanh toán", chọn VNPay hoặc Momo → hệ thống chuyển hướng sang cổng thanh toán.
3. Cư dân hoàn tất giao dịch trên ví; cổng thanh toán gọi Webhook báo kết quả về hệ thống.
4. Hệ thống xử lý theo kết quả nhận được:
   - Thành công: Hóa đơn → "Đã thanh toán", xuất biên lai PDF, gạch nợ tự động, đẩy thông báo cho cư dân.
   - Không có phản hồi: Hóa đơn → "Đang thanh toán", nhân viên BQL xử lý thủ công.
   - Thất bại: Thông báo "Thanh toán thất bại" đến cư dân.

**Luồng 2 — Chốt phí thủ công cuối tháng**

1. Nhân viên BQL đăng nhập Web Portal → vào "Ghi chỉ số", chọn tòa nhà, nhập chỉ số điện/nước từng căn.
2. Hệ thống kiểm tra ngay: số mới ≥ số cũ, báo lỗi nếu không hợp lệ.
3. Nhân viên nhấn "Tính phí toàn bộ" → hệ thống quy đổi ra tiền, cộng phí quản lý/xe, tạo hóa đơn nháp.
4. Nhân viên kiểm tra nháp, nhấn "Chốt bảng phí".
5. Hóa đơn → "Chờ thanh toán", hệ thống gửi thông báo + email đồng loạt đến toàn bộ cư dân.

**Luồng 3 — Xử lý khiếu nại**

1. Cư dân mở hóa đơn, phát hiện sai sót → nhấn "Gửi khiếu nại", điền lý do và đính kèm ảnh đồng hồ.
2. Hệ thống tạo Ticket trạng thái "Đang xử lý", hiển thị trên Web Portal BQL.
3. BQL xem ảnh, sửa lại chỉ số trên hệ thống, phản hồi Ticket.
4. Hệ thống cập nhật lại tổng tiền hóa đơn, đóng Ticket → "Đã giải quyết", thông báo kết quả cho cư dân.

---

# Tuần 4: ĐỊNH NGHĨA KIẾN TRÚC HỆ THỐNG

## 4.1 TÀI LIỆU CÁC YẾU TỐ KIẾN TRÚC (ARCHITECTURAL DRIVERS)

### 4.1.1 Tóm tắt các yếu tố cốt lõi (Executive Summary)

Hệ thống SmartFee Apartment được định hướng phát triển theo mô hình Web-only nhằm tối ưu hóa nguồn lực và thời gian triển khai. Yếu tố cốt lõi định hình kiến trúc là khả năng xử lý nghiệp vụ tài chính đồng loạt (batch processing), tính bảo mật và khả năng thích ứng màn hình đa thiết bị (Responsive) để cư dân sử dụng trên điện thoại di động mượt mà như một ứng dụng gốc (Native App).

### 4.1.2 Yêu cầu chức năng ảnh hưởng kiến trúc (ASFRs)

Các yêu cầu chức năng có tính chất quyết định đến thiết kế kiến trúc hệ thống:

| ID Yêu cầu | Mô tả | Ý nghĩa Kiến trúc & Số liệu cụ thể |
|---|---|---|
| ASFR-1 | Tính phí tự động (REQ-011) | Yêu cầu xử lý đồng loạt (Batch Processing) cho 10+ căn hộ trong cùng một thời điểm chốt sổ mà không làm treo hệ thống. |
| ASFR-2 | Thanh toán trực tuyến (REQ-003, REQ-013) | Tích hợp cổng thanh toán (VNPay/Momo) và xử lý Webhook đối soát. Đòi hỏi tính toàn vẹn dữ liệu (ACID) tuyệt đối và tích hợp API bên thứ 3. |
| ASFR-3 | Gửi thông báo nhắc nợ (REQ-008) | Cần cơ chế xử lý bất đồng bộ (Async) để gửi Email/SMS/Push Notification số lượng lớn. |

### 4.1.3 Các thuộc tính chất lượng (Quality Attribute Drivers)

Các yêu cầu phi chức năng (NFR) ràng buộc sự lựa chọn công nghệ:

- **QA-01 (Bảo mật - Security):** Phân quyền nghiêm ngặt giữa Cư dân và Ban Quản Lý/Kế toán trên cùng một hệ thống Web (RBAC) để tránh leo thang đặc quyền. Toàn bộ mật khẩu phải mã hóa (Bcrypt/SHA-256). Mức độ: CRITICAL.
- **QA-02 (Độ tin cậy - Reliability):** Đảm bảo không mất mát dữ liệu giao dịch tài chính ngay cả khi kết nối mạng chập chờn. Yêu cầu uptime 95% và cơ chế Retry Webhook tự động. Mức độ: CRITICAL.
- **QA-03 (Tính tương thích - Portability):** Giao diện Resident Web phải áp dụng thiết kế Mobile-First (Responsive), co giãn tùy kích thước màn hình mà không cần ứng dụng Native. Mức độ: HIGH.
- **QA-04 (Hiệu năng - Performance):** Thời gian phản hồi API tra cứu hóa đơn < 2s cho 95% yêu cầu. Module tính phí không quá 2 phút cho một đợt tính. Mức độ: HIGH.

### 4.1.4 Ràng buộc (Constraints)

| Ràng buộc | Phân loại | Độ linh hoạt | Nguồn & Tác động |
|---|---|---|---|
| CON-01 (Nguồn lực) | Kỹ thuật | Cứng (Hard) | Đội ngũ dự án nhỏ, buộc phải phát triển Web-only thay vì làm cả Native App. |
| CON-02 (Kinh phí) | Hạ tầng | Ưu tiên (Preference) | Triển khai trên Cloud cơ bản (AWS EC2, RDS, hoặc Render) với chi phí thấp. |

### 4.1.5 Ma trận ưu tiên các Drivers

- **CRITICAL:** Đảm bảo toàn vẹn giao dịch và đối soát thanh toán (ASFR-2, QA-02).
- **CRITICAL:** Trải nghiệm UX trên Mobile Web cho Cư dân (QA-03, CON-01).
- **HIGH:** Phân quyền và Bảo mật dữ liệu cá nhân (QA-01).
- **HIGH:** Xử lý hàng loạt hóa đơn cuối tháng (ASFR-1).

## 4.2 QUYẾT ĐỊNH STACK CÔNG NGHỆ (TECHNOLOGY STACK)

### 4.2.1 Tổng quan Stack Công nghệ

Kiến trúc tổng thể được phân tách rõ ràng giữa Frontend (Client) và Backend (Server) giao tiếp qua RESTful API. Hệ thống loại bỏ hoàn toàn các framework phát triển Mobile (như React Native) để tối ưu nguồn lực.

### 4.2.2 Quyết định Công nghệ theo Hạng mục

- **Frontend (Web Application):** Sử dụng ReactJS kết hợp Tailwind CSS.
  - *Lý do:* Phù hợp xây dựng Single Page Application (SPA), giúp chuyển trang mượt mà. Tailwind CSS hỗ trợ Responsive Design (Mobile-First) cực kỳ tốt để phục vụ Cư dân.
- **Backend (API Server):** Sử dụng Spring Boot (Java).
  - *Lý do:* Hệ sinh thái Java mạnh mẽ trong việc xử lý các bài toán tài chính, đảm bảo ACID chặt chẽ. Spring Security và Spring Data JPA hỗ trợ đắc lực cho phân quyền (RBAC).
- **Data Storage (Cơ sở dữ liệu):** Sử dụng MySQL (CSDL Quan hệ).
  - *Lý do:* Cấu trúc dữ liệu có tính liên kết cao (Cư dân -> Căn hộ -> Chỉ số -> Hóa đơn -> Thanh toán), yêu cầu đảm bảo an toàn giao dịch.
- **Bảo mật (Security):** JWT (JSON Web Tokens) cho Authentication; thuật toán Bcrypt cho mã hóa mật khẩu.
- **DevOps & Hạ tầng:** Đóng gói bằng Docker, tự động hóa CI/CD qua GitHub Actions.

### 4.2.3 Ma trận Quyết định (Decision Matrix)

*Ma trận so sánh cho Database:*

| Tiêu chí đánh giá | MySQL (Quan hệ) | MongoDB (NoSQL) |
|---|---|---|
| Tính toàn vẹn (ACID) | Cực kỳ tốt (Bắt buộc cho tài chính) | Trung bình |
| Bảo mật & Cấu trúc | Rất cao, cấu trúc chuẩn mực | Khá |
| Khả năng mở rộng | Trung bình (cần chiến lược Index) | Tốt (Scale ngang dễ) |
| Quyết định | **ĐƯỢC CHỌN** | Loại bỏ |

### 4.2.4 Truy xuất nguồn gốc và Rủi ro (Traceability & Risks)

- **Truy xuất:** Spring Boot và MySQL được chọn trực tiếp để giải quyết Driver **QA-02** và **ASFR-2** (Đảm bảo an toàn giao dịch tài chính). ReactJS + Tailwind giải quyết Constraint **CON-01** (Nguồn lực nhỏ) và Driver **QA-03** (Mobile-first).
- **Rủi ro:** Trải nghiệm người dùng truy cập Mobile Web có thể không phản hồi nhanh và thiếu Push Notification gốc (Native) như trên iOS/Android.
- **Biện pháp giảm thiểu (Mitigation):** Áp dụng thiết kế UI tối giản, các nút CTA lớn trên CSS (Tailwind) để giả lập trải nghiệm Native App. Tận dụng Email Gateway / Zalo ZNS để thay thế Native Push.

## 4.3 KIẾN TRÚC HỆ THỐNG (SYSTEM ARCHITECTURE)

### 4.3.1 Sơ đồ kiến trúc tổng quan (Architecture Overview)

Hệ thống sử dụng mẫu kiến trúc **N-Tier Monolithic (Nguyên khối phân tầng)**. Mẫu Monolithic là lựa chọn phù hợp nhất cho quy mô quản lý một tòa chung cư (vài ngàn người dùng), giúp dễ triển khai, quản lý cấu hình và kiểm soát dữ liệu tập trung.

- **Tầng Presentation:** ReactJS thực hiện định tuyến, chia làm Resident Layout (Mobile-first) và Admin Layout (Desktop-first).
- **Tầng Application:** Spring Boot xử lý Core Business logic.
- **Tầng Data:** Cơ sở dữ liệu MySQL.

### 4.3.2 Phân rã thành phần Logic (Component Decomposition)

Hệ thống Monolithic được module hóa thành các thành phần (Components) độc lập về mặt logic ở tầng Backend:

- **AuthComponent:** Chịu trách nhiệm xác thực, cấp JWT và RBAC.
- **ResidentComponent:** Quản lý thông tin cư dân, căn hộ, yêu cầu dịch vụ.
- **BillingComponent:** Quản lý chỉ số điện/nước, thực thi thuật toán tính phí đồng loạt.
- **PaymentComponent:** Tạo URL thanh toán, tích hợp VNPay/Momo, đối soát và gạch nợ.
- **NotificationComponent:** Lập lịch gửi nhắc nợ qua Email/Zalo.

### 4.3.3 Kiến trúc Triển khai (Deployment Architecture)

Dựa trên ràng buộc tài chính (CON-02):

- **Web Server (ReactJS):** Build thành dạng tĩnh (static assets) và triển khai trên các CDN như Vercel hoặc AWS S3.
- **API Server (Spring Boot):** Chạy bên trong Docker Container, triển khai trên AWS EC2 hoặc Render.
- **Database:** Managed Database Service (như AWS RDS cho MySQL) để tự động sao lưu.

### 4.3.4 Ma trận giao tiếp (Communication Patterns)

| Từ Thành Phần | Đến Thành Phần | Giao Thức | Thể Loại | Mục Đích |
|---|---|---|---|---|
| React Frontend | Spring Boot API | HTTPS/REST | Đồng bộ (Sync) | Lấy hóa đơn, xác thực user, tạo link thanh toán. |
| Spring Boot API | VNPay/Momo API | HTTPS/REST | Đồng bộ (Sync) | Gửi dữ liệu đơn hàng lấy URL thanh toán. |
| VNPay/Momo | Spring Boot API | HTTP/Webhook | Bất đồng bộ (Async) | Cổng thanh toán gọi API hệ thống để chốt kết quả. |
| Spring Boot API | Email Gateway | SMTP | Bất đồng bộ (Async) | Gửi thông báo nhắc nợ không làm chặn luồng hệ thống. |

### 4.3.5 Các Quyết Định Kiến Trúc (Architecture Decision Records - ADRs)

**ADR-01: Chuyển đổi kiến trúc sang Web-only**

- **Status:** Đã chấp thuận (Accepted).
- **Context:** Tài nguyên có hạn (CON-01). Việc duy trì 2 codebase song song (Web cho BQL và Native App cho Cư dân) tiềm ẩn rủi ro trễ tiến độ.
- **Options Considered:** (1) React Web + React Native App; (2) Hệ thống thuần Web Responsive.
- **Decision:** Chọn phương án 2. Sử dụng duy nhất ReactJS. Giao diện cư dân tối ưu theo Mobile-First.
- **Consequences:** Tiết kiệm thời gian, không cần publish app lên Store. Rủi ro: Không có Native Push Notification, phải bù đắp bằng SMS/Email.

**ADR-02: Lựa chọn Kiến trúc Monolithic**

- **Status:** Đã chấp thuận (Accepted).
- **Context:** Quy mô hệ thống tập trung cho BQL chung cư, số lượng users đồng thời thấp (vài ngàn).
- **Decision:** Thiết kế theo kiến trúc N-Tier Monolithic thay vì Microservices.
- **Consequences:** Chi phí vận hành thấp, dễ cấu hình và duy trì. Đánh đổi lại, nếu luồng Billing bị quá tải có thể làm chậm toàn hệ thống (giải quyết bằng việc thiết lập Batch Job vào ban đêm).

---

# Tuần 5: THIẾT KẾ CHI TIẾT HỆ THỐNG

## 5.1 THIẾT KẾ THÀNH PHẦN (COMPONENT DESIGN)

### 5.1.1 Danh mục các thành phần (Component Catalog)

Dựa trên kiến trúc Monolithic đã xác định ở Tuần 4, hệ thống được chia thành các thành phần logic chính sau:

| Tên thành phần | Tầng (Layer) | Trách nhiệm chính | Phụ thuộc (Dependencies) |
|---|---|---|---|
| AuthComponent | Application | Xác thực người dùng, cấp phát JWT, phân quyền RBAC. | Data Access |
| ResidentComponent | Application | Quản lý hồ sơ cư dân, thông tin căn hộ và phương tiện. | Data Access |
| BillingComponent | Application | Ghi nhận chỉ số điện/nước, tính toán hóa đơn theo công thức. | ResidentComponent, Data Access |
| PaymentComponent | Application | Xử lý giao dịch thanh toán, tích hợp VNPAY, cập nhật trạng thái hóa đơn. | BillingComponent, External API |
| NotificationComponent | Application | Gửi thông báo nhắc nợ, xác nhận thanh toán qua Email/Zalo. | BillingComponent, PaymentComponent |
| Data Access Layer | Data Access | Tương tác trực tiếp với MySQL qua Spring Data JPA. | MySQL Database |

### 5.1.2 Ma trận trách nhiệm (Responsibility Matrix)

Đảm bảo mọi yêu cầu chức năng (REQ) đều được thực hiện bởi ít nhất một thành phần:

| Mã yêu cầu | Mô tả | Thành phần chịu trách nhiệm chính |
|---|---|---|
| REQ-001 | Đăng nhập hệ thống | AuthComponent |
| REQ-003 | Xem hóa đơn (Cư dân) | ResidentComponent, BillingComponent |
| REQ-011 | Tính phí tự động | BillingComponent |
| REQ-013 | Thanh toán trực tuyến | PaymentComponent |
| REQ-008 | Gửi thông báo nhắc nợ | NotificationComponent |

## 5.2 THIẾT KẾ GIAO DIỆN LẬP TRÌNH (API DESIGN)

### 5.2.1 Tổng quan về API

Toàn bộ giao tiếp giữa Frontend (ReactJS) và Backend (Spring Boot) được thực hiện qua giao thức **RESTful API**, định dạng dữ liệu **JSON**.

- **Base URL:** `https://api.smartfee-apartment.vn/api/v1`
- **Xác thực:** Header `Authorization: Bearer <JWT_TOKEN>`

### 5.2.2 Đặc tả các Endpoint chính

| Method | Endpoint | Mô tả | Người dùng |
|---|---|---|---|
| POST | /auth/login | Xác thực người dùng và trả về JWT. | Tất cả |
| GET | /resident/invoices | Danh sách hóa đơn của cư dân hiện tại. | Cư dân |
| POST | /admin/meter-readings | Nhập chỉ số điện nước cho căn hộ. | BQL |
| POST | /billing/calculate | Kích hoạt luồng tính phí hàng loạt. | Kế toán |
| POST | /payment/vnpay-url | Tạo đường dẫn thanh toán qua VNPAY. | Cư dân |
| GET | /payment/callback | Xử lý kết quả trả về từ cổng thanh toán. | Hệ thống |

## 5.3 KIẾN TRÚC DỮ LIỆU VẬT LÝ (PHYSICAL DATA ARCHITECTURE)

### 5.3.1 Nền tảng Cơ sở dữ liệu

- **Hệ quản trị:** MySQL 8.0.
- **Đặc điểm:** Đảm bảo tính toàn vẹn dữ liệu giao dịch (ACID).

### 5.3.2 Đặc tả các bảng chính (Table Specifications)

**Bảng: users (Thông tin tài khoản)**

- id (PK): BIGINT, Auto Increment.
- username: VARCHAR(50), Unique, Not Null.
- password: VARCHAR(255) (Lưu hash Bcrypt).
- role: ENUM('RESIDENT', 'ADMIN', 'ACCOUNTANT').

**Bảng: apartments (Thông tin căn hộ)**

- id (PK): BIGINT.
- room_number: VARCHAR(10), Unique.
- floor: INT.
- owner_id (FK): Liên kết tới bảng users.

**Bảng: meter_readings (Chỉ số điện nước)**

- id (PK): BIGINT.
- apartment_id (FK): Liên kết apartments.
- month_year: VARCHAR(7) (Định dạng MM-YYYY).
- elec_new, water_new: INT.

**Bảng: invoices (Hóa đơn)**

- id (PK): BIGINT.
- total_amount: DECIMAL(12,2).
- status: ENUM('UNPAID', 'PAID', 'PENDING').
- due_date: DATE.

## 5.4 THIẾT KẾ BẢO MẬT (SECURITY DESIGN)

### 5.4.1 Cơ chế Xác thực (Authentication)

Sử dụng **JSON Web Token (JWT)** theo quy trình:

1. Người dùng gửi tài khoản/mật khẩu.
2. Backend kiểm tra, nếu đúng sẽ tạo JWT chứa userId và role.
3. Frontend lưu JWT vào localStorage hoặc Cookie và gửi kèm trong Header của các request tiếp theo.

Quy trình tạo tài khoản được kiểm soát như sau:

- Tài khoản quản trị, kế toán và nhân viên được tạo sẵn bởi hệ thống hoặc admin.
- Người dùng tự đăng ký chỉ tạo yêu cầu cho role cư dân.
- Khi đăng ký cư dân phải cung cấp mã căn hộ, họ tên và số điện thoại để admin xác minh.
- Tài khoản mới ở trạng thái `PENDING` và chỉ đăng nhập được sau khi admin duyệt sang `APPROVED`.

### 5.4.2 Cơ chế Phân quyền (Authorization - RBAC)

Hệ thống áp dụng mô hình phân quyền dựa trên vai trò (Role-based Access Control):

| Chức năng | Cư dân (Resident) | Kế toán (Accountant) | Nhân viên BQL (Staff) | Quản trị viên (Admin) |
|---|---|---|---|
| Xem hóa đơn cá nhân | **Có** | **Có** | **Có** | **Có** |
| Thanh toán hóa đơn | **Có** | Không | Không | **Có** |
| Gửi yêu cầu hỗ trợ/khiếu nại | **Có** | Không | **Có** | **Có** |
| Nhập chỉ số điện nước | Không | Không | **Có** | **Có** |
| Duyệt/Chốt hóa đơn | Không | **Có** | Không | **Có** |
| Quản lý cư dân và căn hộ | Không | Không | **Có** | **Có** |
| Quản lý người dùng và phân quyền | Không | Không | Không | **Có** |

> Mỗi tài khoản chỉ được gán một role duy nhất tại thời điểm tạo tài khoản. Role không thay đổi trong vòng đời của cùng một tài khoản.

### 5.4.3 Bảo vệ dữ liệu (Data Protection)

- **Mật khẩu:** Được băm (hash) bằng thuật toán **Bcrypt** trước khi lưu vào DB.
- **Giao tiếp:** Toàn bộ các API phải chạy trên giao thức **HTTPS (TLS 1.2+)**.
- **Input Validation:** Sử dụng Spring Validation để ngăn chặn SQL Injection và XSS tại tầng Controller.
- **Sensitive Data:** Các thông tin như số điện thoại, số tiền trong lịch sử thanh toán được bảo vệ nghiêm ngặt qua phân quyền API.

---

# PHẦN 6 - THIẾT KẾ CHI TIẾT (LOW-LEVEL DESIGN)

## 6.1 Thiết Kế Lớp (Class Design)

*Mục đích: Thiết kế cấu trúc lớp chi tiết cho từng thành phần bao gồm thuộc tính, phương thức và các mối quan hệ. Bước này chuyển đổi các thành phần kiến trúc từ Tuần 5 thành các bản thiết kế hướng đối tượng cụ thể mà lập trình viên có thể trực tiếp triển khai thành mã nguồn.*

### 6.1.1 Các lớp Thực thể (Entity Classes / Domain Model)

Dựa trên mô hình ERD khái niệm và thiết kế vật lý, các lớp thực thể đóng vai trò ánh xạ trực tiếp (ORM Mapping) với các bảng trong cơ sở dữ liệu:

- **User**:
  - *Thuộc tính*: + id: Long, + username: String, - password: String, + role: RoleEnum.
  - *Mối quan hệ*: 1-N với Apartment (Một user có thể sở hữu nhiều căn hộ).

- **Apartment**:
  - *Thuộc tính*: + id: Long, + roomNumber: String, + floor: Integer, + ownerId: Long.
  - *Mối quan hệ*: 1-N với MeterReading và Invoice.

- **MeterReading**:
  - *Thuộc tính*: + id: Long, + apartmentId: Long, + monthYear: String, + elecNew: Integer, + waterNew: Integer.

- **Invoice**:
  - *Thuộc tính*: + id: Long, + totalAmount: BigDecimal, + status: InvoiceStatusEnum, + dueDate: LocalDate.
  - *Mối quan hệ*: 1-N với Payment.

- **Payment**:
  - *Thuộc tính*: + id: Long, + invoiceId: Long, + transactionRef: String, + amount: BigDecimal.

### 6.1.2 Các lớp Controller, Service & Repository chính

Tổ chức kiến trúc theo mô hình 3 lớp (3-Tier Architecture) cho các thành phần (Components) cốt lõi:

**BillingComponent (Xử lý tính phí & Hóa đơn):**

- **InvoiceController**: Expose API cho Frontend.
  - `+ getInvoices(residentId: Long): List<InvoiceDTO>`
  - `+ calculateMonthlyFee(monthYear: String): ResponseDTO`
- **InvoiceService**: Chứa Business Logic.
  - `+ generateInvoices(monthYear: String): void` (Thực thi BR-01, BR-02 tính tiền điện nước).
- **InvoiceRepository**: Giao tiếp DB.
  - `+ findByApartmentId(id: Long): List<Invoice>`
  - `+ saveAll(invoices: List<Invoice>): void`

**PaymentComponent (Xử lý Thanh toán):**

- **PaymentController**:
  - `+ createVNPayUrl(invoiceId: Long): String`
  - `+ handleVNPayCallback(params: Map): PaymentResultDTO`
- **PaymentService**:
  - `+ processPayment(invoiceId: Long): String`
  - `+ verifyTransaction(txRef: String): boolean` (Thực thi BR-08 đối soát giao dịch).

### 6.1.3 Design Patterns Áp Dụng

- **Repository Pattern**: Tách biệt hoàn toàn logic truy xuất cơ sở dữ liệu khỏi tầng Business Logic. Giúp dễ dàng thay đổi cấu trúc truy vấn mà không ảnh hưởng tới Service.
- **DTO (Data Transfer Object) Pattern**: Sử dụng các lớp như InvoiceDTO, UserDTO để đóng gói dữ liệu giữa Frontend và Backend, ngăn chặn việc lộ cấu trúc Entity thực tế ra bên ngoài.
- **Strategy Pattern**: Áp dụng tại PaymentService bằng việc định nghĩa interface PaymentStrategy cùng các lớp triển khai VNPayStrategy, MomoStrategy. Hỗ trợ việc mở rộng các cổng thanh toán sau này mà không phải sửa đổi code cốt lõi.

## 6.2 Thiết Kế Sơ Đồ Trình Tự (Sequence Diagrams)

*Mục đích: Thể hiện chi tiết sự tương tác giữa các đối tượng theo thời gian cho các Use Case chính, làm rõ lời gọi hàm, tham số, dữ liệu trả về và luồng điều khiển trước khi lập trình.*

### 6.2.1 Biểu đồ trình tự: UC-R01 - Cư dân tra cứu hóa đơn

1. **Cư dân (Client)** gửi yêu cầu `GET /resident/invoices` kèm JWT Token.
2. AuthFilter xác thực tính hợp lệ của Token.
3. InvoiceController nhận request hợp lệ và gọi `InvoiceService.getInvoices(userId)`.
4. InvoiceService truy xuất ApartmentRepository để lấy danh sách căn hộ của User.
5. InvoiceService tiếp tục gọi `InvoiceRepository.findByApartmentId()` để lấy dữ liệu hóa đơn.
6. Database trả về danh sách Invoice Entity.
7. InvoiceService ánh xạ (map) sang InvoiceDTO và trả về InvoiceController.
8. InvoiceController trả JSON Response (HTTP 200) về cho Frontend hiển thị.

### 6.2.2 Biểu đồ trình tự: UC-R02 - Thanh toán VNPay

1. **Cư dân** click thanh toán, Client gọi `POST /payment/vnpay-url` truyền lên invoiceId.
2. PaymentController gọi `PaymentService.processPayment(invoiceId)`.
3. PaymentService lấy chi tiết Invoice từ Database, tạo mã giao dịch và mã băm chữ ký số (Checksum/Hash).
4. Hệ thống trả về paymentUrl của VNPay. Client tự động chuyển hướng (Redirect) người dùng sang cổng VNPay.
5. Sau khi thanh toán, VNPay gửi Webhook callback về `GET /payment/callback`.
6. PaymentController tiếp nhận, gọi `PaymentService.verifyTransaction()` để kiểm tra tính toàn vẹn chữ ký và số tiền.
7. Nếu hợp lệ, PaymentService gọi InvoiceRepository cập nhật trạng thái hóa đơn thành PAID và lưu lịch sử giao dịch vào PaymentRepository.

### 6.2.3 Biểu đồ trình tự: UC-M03 - BQL Tính phí đồng loạt

1. **Kế toán / BQL** nhấn "Tính phí tháng", Client gửi `POST /billing/calculate` với tham số month_year.
2. BillingController gọi `InvoiceService.generateInvoices(month_year)`.
3. InvoiceService gọi `MeterReadingRepository.findByMonth()` lấy toàn bộ chỉ số điện nước đã chốt.
4. [Vòng lặp Loop] Với mỗi căn hộ: InvoiceService áp dụng quy tắc lũy kế (BR-01) tính tiền điện, định mức (BR-02) tính tiền nước, và cộng phí quản lý cố định.
5. InvoiceService khởi tạo danh sách Entity Invoice trạng thái UNPAID.
6. Gọi `InvoiceRepository.saveAll(invoices)` lưu đồng loạt vào DB (Batch Insert tối ưu hiệu năng).
7. Gửi bất đồng bộ (Async) thông điệp sang NotificationService để gửi Email/SMS thông báo cho cư dân.
8. Trả về kết quả thành công cho Client.

## 6.3 Thiết Kế UI (High-Fidelity)

*Mục đích: Thiết lập bộ nguyên tắc thiết kế trực quan (Visual Design System) và các màn hình độ phân giải cao (Pixel-perfect), biến Wireframes (Tuần 3) thành giao diện chuẩn xác cho lập trình viên Frontend triển khai.*

### 6.3.1 Hệ Thống Thiết Kế (UI Kit)

Để đảm bảo trải nghiệm đồng nhất và chuyên nghiệp cho một nền tảng quản lý:

- **Màu sắc (Color System)**:
  - *Primary Color (Chính)*: Xanh dương đậm (#1D4ED8) - Mang lại cảm giác an toàn, tin cậy trong các thao tác tài chính.
  - *Secondary Color (Nền)*: Xám nhạt (#F3F4F6) - Phù hợp để làm nền bảng biểu, hạn chế mỏi mắt cho Kế toán khi làm việc lâu.
  - *Semantic Colors*: Xanh lá (#10B981) cho trạng thái "Đã thanh toán" (Thành công); Đỏ (#EF4444) cho "Chưa thanh toán/Quá hạn" (Cảnh báo).
- **Typography System**: Sử dụng font chữ Inter (sans-serif), tối ưu hiển thị trên màn hình kỹ thuật số. Kích thước linh hoạt từ 14px (Data table) đến 24px (Page headers).
- **Spacing & Grid**: Áp dụng hệ thống lưới 12 cột. Khoảng cách (Padding/Margin) theo chuẩn bội số của 4 (4px, 8px, 16px, 24px...).

### 6.3.2 Danh sách các Màn hình Cốt lõi (Web Mockups)

- **Giao diện Cư dân (Mobile-first)**:
  - Màn hình Trang chủ: Thẻ Dashboard hiển thị số dư, biểu đồ tiêu thụ tháng.
  - Màn hình Hóa đơn chi tiết: Tích hợp nút Thanh toán ngay hiển thị nổi bật với màu Accent.
- **Giao diện BQL/Kế toán (Desktop-optimized)**:
  - Màn hình Nhập chỉ số: Thiết kế dạng Data-Grid cho phép nhân viên BQL tab qua các ô input nhanh chóng, có validate cảnh báo đỏ nếu số mới bé hơn số cũ (BR-03).
  - Màn hình Quản lý Công nợ: Bảng dữ liệu có thể sort/filter theo trạng thái thanh toán, hỗ trợ xuất Excel.

*(Chi tiết layout tham khảo tại các Hình 7, Hình 8, Hình 9 trong Phụ lục hình ảnh).*

## 6.4 Chi Tiết Thiết Kế Cơ Sở Dữ Liệu

*Mục đích: Chuyển đổi mô hình dữ liệu ở Tuần 5 thành kịch bản khởi tạo (DDL) và tối ưu hóa truy vấn sẵn sàng cho môi trường Production.*

### 6.4.1 Script DDL (Data Definition Language)

Dưới đây là kịch bản SQL khởi tạo các bảng trọng tâm với đầy đủ Constraints đảm bảo quy tắc nghiệp vụ:

```sql
-- Bảng Người dùng (Lưu trữ xác thực)
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- BR-10: Lưu mã hash
    role ENUM('RESIDENT', 'ADMIN', 'ACCOUNTANT') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng Căn hộ
CREATE TABLE apartments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    room_number VARCHAR(10) NOT NULL UNIQUE,
    floor INT,
    owner_id BIGINT,
    FOREIGN KEY (owner_id) REFERENCES users(id)
);

-- Bảng Chỉ số Điện Nước
CREATE TABLE meter_readings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    apartment_id BIGINT NOT NULL,
    month_year VARCHAR(7) NOT NULL, -- Format: 'MM-YYYY'
    elec_old INT NOT NULL,
    elec_new INT NOT NULL,
    water_old INT NOT NULL,
    water_new INT NOT NULL,
    FOREIGN KEY (apartment_id) REFERENCES apartments(id),
    UNIQUE(apartment_id, month_year) -- BR-04: Một phòng chỉ có 1 chỉ số/tháng
);

-- Bảng Hóa đơn
CREATE TABLE invoices (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    apartment_id BIGINT NOT NULL,
    month_year VARCHAR(7) NOT NULL,
    elec_fee DECIMAL(10,2),
    water_fee DECIMAL(10,2),
    management_fee DECIMAL(10,2),
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'UNPAID', -- 'UNPAID', 'PAID'
    due_date DATE,
    FOREIGN KEY (apartment_id) REFERENCES apartments(id)
);

-- Bảng Lịch sử Thanh toán
CREATE TABLE payments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    invoice_id BIGINT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(50), -- 'VNPAY', 'CASH'
    transaction_id VARCHAR(100),
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'SUCCESS',
    FOREIGN KEY (invoice_id) REFERENCES invoices(id)
);
```

### 6.4.2 Chiến Lược Index

Để đáp ứng các yêu cầu phi chức năng về hiệu suất phản hồi (NFR-001) và tối ưu hóa quá trình tính phí đồng loạt, hệ thống cài đặt các Index sau:

- `CREATE INDEX idx_user_username ON users(username);` — Tăng tốc độ cho quá trình xác thực và đăng nhập tài khoản.
- `CREATE INDEX idx_apartment_room ON apartments(room_number);` — Hỗ trợ BQL tra cứu nhanh thông tin phòng khi cần đối soát.
- `CREATE INDEX idx_invoice_apt_month ON invoices(apartment_id, month_year);` — Tối ưu hóa các câu truy vấn lấy lịch sử hóa đơn của một cư dân trong tháng cụ thể (UC-R01).
- `CREATE INDEX idx_invoice_status ON invoices(status);` — Đẩy nhanh tốc độ lọc danh sách các hóa đơn UNPAID nhằm phục vụ việc xuất báo cáo công nợ cho kế toán và hệ thống gửi Email nhắc nợ tự động.

---

# PHẦN 7 - THIẾT KẾ LOGIC CHI TIẾT VÀ KẾ HOẠCH TRIỂN KHAI

## 7.1 Thiết Kế Thuật Toán (Algorithm Design)

*Mục đích: Đặc tả các logic nghiệp vụ phức tạp bằng mã giả (pseudocode) để đảm bảo tính chính xác trước khi lập trình, tập trung vào các bài toán tính toán và xử lý dữ liệu lớn.*

### 7.1.1 Thuật toán Tính phí điện lũy kế (BR-01)

- **Đầu vào:** oldIndex, newIndex, priceMap (danh sách các bậc giá).
- **Đầu ra:** totalAmount.
- **Mã giả:**

```text
Function CalculateElectricFee(oldIndex, newIndex, priceMap):
    usage = newIndex - oldIndex
    If usage < 0 Then Return Error("Chỉ số mới không được nhỏ hơn chỉ số cũ")
    totalAmount = 0
    RemainingUsage = usage
    For each tier in priceMap (sorted by range):
        If RemainingUsage > tier.limit Then
            totalAmount += tier.limit * tier.price
            RemainingUsage -= tier.limit
        Else
            totalAmount += RemainingUsage * tier.price
            RemainingUsage = 0
            Break
    Return totalAmount
```

### 7.1.2 Thuật toán Tự động nhắc nợ (Auto-Reminder)

- **Mục đích:** Quét các hóa đơn quá hạn và gửi thông báo.
- **Mã giả:**

```text
Function AutoDebtReminder():
    today = GetCurrentDate()
    unpaidInvoices = InvoiceRepository.findAllByStatus("UNPAID")
    For each invoice in unpaidInvoices:
        If today > invoice.dueDate Then
            resident = UserRepository.findById(invoice.residentId)
            Message = "Thông báo: Hóa đơn " + invoice.id + " của bạn đã quá hạn."
            NotificationService.sendEmail(resident.email, "Nhắc nợ", Message)
            NotificationService.pushApp(resident.id, Message)
```

## 7.2 Thiết Kế Xử Lý Ngoại Lệ (Error Handling Design)

*Mục đích: Xây dựng cấu trúc quản lý lỗi thống nhất để hệ thống hoạt động ổn định và không lộ thông tin nhạy cảm.*

### 7.2.1 Cấu trúc phân cấp ngoại lệ (Exception Hierarchy)

- **AppException** (Base Class): Chứa errorCode, message, timestamp.
- **ValidationException**: Lỗi dữ liệu đầu vào không hợp lệ (HTTP 400).
- **BusinessException**: Vi phạm quy tắc nghiệp vụ, ví dụ: "Hóa đơn đã thanh toán không được sửa" (HTTP 409).
- **SecurityException**: Lỗi xác thực hoặc truy cập trái phép (HTTP 401/403).
- **SystemException**: Lỗi kết nối DB hoặc lỗi bên thứ ba như VNPay (HTTP 500).

### 7.2.2 Danh mục mã lỗi hệ thống (Error Code Catalog)

| Mã lỗi | Trạng thái HTTP | Thông điệp cho người dùng | Mô tả kỹ thuật |
|---|---|---|---|
| VAL-001 | 400 Bad Request | Chỉ số mới phải lớn hơn chỉ số cũ. | Meter reading validation failed. |
| BUS-002 | 409 Conflict | Hóa đơn này đã được thanh toán. | Transaction exists for this invoice. |
| SEC-001 | 401 Unauthorized | Phiên đăng nhập hết hạn. | JWT Token expired or invalid. |
| SYS-001 | 500 Internal Error | Kết nối ngân hàng bị gián đoạn. | VNPay API connection timeout. |

## 7.3 Chiến Lược Kiểm Thử (Testing Strategy)

*Mục đích: Xác định phương pháp kiểm chứng để đảm bảo hệ thống đáp ứng mọi yêu cầu chức năng và phi chức năng đã đề ra.*

### 7.3.1 Các cấp độ kiểm thử

- **Unit Test (Kiểm thử đơn vị):** Sử dụng JUnit/Mockito để kiểm tra các hàm tính phí (7.1) và các Service logic. Mục tiêu độ bao phủ (Coverage) > 80%.
- **Integration Test (Kiểm thử tích hợp):** Kiểm tra luồng dữ liệu giữa API Backend và Cơ sở dữ liệu SQL, đảm bảo Transaction không bị lỗi khi lưu Hóa đơn + Thanh toán.
- **System Test (Kiểm thử hệ thống):** Kiểm thử luồng đi từ Cư dân thanh toán VNPay -> VNPay phản hồi -> Hệ thống cập nhật trạng thái "Đã thanh toán".
- **UAT (Kiểm thử chấp nhận):** Ban quản lý và Cư dân thực tế thao tác để xác nhận sự hài lòng về giao diện (UI High-Fidelity ở Tuần 6).

### 7.3.2 Kịch bản kiểm thử mẫu (Test Case Specification)

- **TC-ID:** TC-PAY-01
- **Tên:** Thanh toán hóa đơn thành công qua VNPay.
- **Tiền điều kiện:** Hóa đơn trạng thái "UNPAID", người dùng đã đăng nhập.
- **Các bước:** (1) Chọn hóa đơn -> (2) Chọn VNPay -> (3) Nhập thẻ test -> (4) Xác nhận.
- **Kết quả mong đợi:** Trạng thái hóa đơn chuyển sang "PAID", email xác nhận được gửi đi.

---

Additional E2E test cases for webhook and retry/idempotency:

- **TC-ID:** TC-PAY-02
  - **Tên:** Webhook xử lý thành công (backend có `payment.webhook.secret`).
  - **Tiền điều kiện:** Backend chạy với `-Dpayment.webhook.secret=<secret>` và có kết nối DB; có `transactionRef` hợp lệ vừa tạo.
  - **Các bước:** (1) Tạo payment transactionRef; (2) Tính toán chữ ký HMAC-SHA256(secret, transactionRef); (3) POST webhook payload tới `/api/payments/webhook` với signature.
  - **Kết quả mong đợi:** HTTP 200, body success=true, Invoice trạng thái `PAID`, bản ghi Payment tồn tại trong DB.

- **TC-ID:** TC-PAY-03
  - **Tên:** Webhook bị từ chối khi backend thiếu `payment.webhook.secret` (strict mode).
  - **Tiền điều kiện:** Backend KHÔNG chạy với `payment.webhook.secret`.
  - **Các bước:** Gửi webhook hợp lệ như TC-PAY-02.
  - **Kết quả mong đợi:** HTTP 4xx (400/401), body mô tả lỗi, Invoice vẫn `UNPAID`.

- **TC-ID:** TC-PAY-04
  - **Tên:** Idempotency — xử lý webhook lặp (duplicate transactionRef).
  - **Tiền điều kiện:** Webhook đầu tiên đã xử lý thành công và đánh dấu invoice `PAID`.
  - **Các bước:** Gửi lại cùng payload webhook (same transactionRef + signature).
  - **Kết quả mong đợi:** HTTP 200 (or 409 depending policy) nhưng không thay đổi trạng thái/ghi chép thêm; hệ thống log rõ ràng đã bỏ qua duplicate.

- **TC-ID:** TC-PAY-05
  - **Tên:** Retry khi DB lỗi tạm thời.
  - **Tiền điều kiện:** Giả lập DB unreachable (tạm thời), backend vẫn có `payment.webhook.secret`.
  - **Các bước:** Gửi webhook hợp lệ.
  - **Kết quả mong đợi:** Backend trả 5xx (trigger retry từ cổng thanh toán); khi DB phục hồi, webhook retry được xử lý thành công và invoice `PAID`.

## 7.4 Tiêu Chuẩn Phát Triển (Development Standards)

*Mục đích: Thiết lập quy tắc chung để mã nguồn dễ bảo trì và làm việc nhóm hiệu quả.*

### 7.4.1 Quy tắc đặt tên (Naming Conventions)

- **Class/Interface:** PascalCase (Ví dụ: InvoiceService, PaymentController).
- **Method/Variable:** camelCase (Ví dụ: calculateTotalFee(), isPaid).
- **Database Table:** snake_case (Ví dụ: meter_readings, users).
- **Constants:** UPPER_SNAKE_CASE (Ví dụ: MAX_ELECTRIC_TIER).

### 7.4.2 Tiêu chuẩn Bảo mật & Code Quality

- **Bảo mật:** Không lưu mật khẩu dạng text; sử dụng Bcrypt để băm mật khẩu. Chống SQL Injection bằng cách sử dụng Prepared Statements (JPA/Hibernate).
- **Tổ chức code:** Tuân thủ mô hình 3 lớp (Controller -> Service -> Repository). Mỗi class không quá 500 dòng code.

## 7.5 Kế Hoạch Triển Khai (Implementation Plan)

*Mục đích: Phân rã công việc và lộ trình thực hiện dự án.*

### 7.5.1 Phân chia công việc (WBS)

- **Giai đoạn 1 (Tuần 8-9): Infrastructure & Auth**
  - Thiết lập Database, triển khai chức năng Đăng ký/Đăng nhập (Spring Security/JWT).
- **Giai đoạn 2 (Tuần 10-11): Core Features**
  - Xây dựng module Quản lý căn hộ, nhập chỉ số điện nước.
  - Cài đặt thuật toán tính phí tự động (7.1).
- **Giai đoạn 3 (Tuần 12-13): Payment Integration & Mobile**
  - Tích hợp cổng VNPay. Xây dựng giao diện di động cho cư dân.
- **Giai đoạn 4 (Tuần 14): Testing & Deployment**
  - Fix bug, triển khai lên môi trường Cloud (AWS/Heroku).

### 7.5.2 Quản trị rủi ro (Risk Register)

| ID | Rủi ro | Mức độ | Giải pháp giảm thiểu |
|---|---|---|---|
| R-01 | Chậm tiến độ tích hợp thanh toán VNPay. | Cao | Nghiên cứu tài liệu Sandbox sớm, liên hệ support kỹ thuật của VNPay. |
| R-02 | Dữ liệu chỉ số điện nước bị sai sót do nhập liệu thủ công. | Trung bình | Cài đặt Validation chặt chẽ (BR-03) và chức năng import từ Excel. |
| R-03 | Hệ thống quá tải khi tính phí đồng loạt 1000 căn hộ. | Thấp | Sử dụng xử lý bất đồng bộ (Async) và Batch Processing trong Database. |