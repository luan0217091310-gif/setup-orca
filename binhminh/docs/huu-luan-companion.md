# Doraemon và Luffy trong Góc Hữu Luân

Mở Cài đặt → Góc Hữu Luân → Thú cưng, chọn **Doraemon** và kiểu **3D**. Tên thú cưng vẫn chỉnh ở ô Tên thú cưng; mặc định của bản cá nhân hóa là Bekane.

Đầu Góc Hữu Luân hiển thị tên bạn đã đặt và trạng thái agent: đang làm, cần bạn hoặc yên tĩnh. Thú cưng nằm trong một thẻ riêng ngay bên dưới.

- Avatar có khung 60 × 60 px. Doraemon có chong chóng quay, chớp mắt, nhấp nhô và phản ứng khi bấm.
- Luffy là ảnh trang trí 78 × 78 px ở cột riêng trong hàng cao 84 px. Ảnh không bắt chuột và được giới hạn trong hàng, không phủ thẻ hạn mức hay CPU/RAM.
- **Luffy Gear 5** bật/tắt ảnh trang trí. **Giọng nói tiếng Việt** bật/tắt lời thoại, độc lập với hiệu ứng ngắn khi Âm thanh đang bật.
- Bấm nhân vật hoặc Nghe thử để phát âm thanh. Agent chờ, hoàn thành và chuyển sang giờ khuya có lời thoại tương ứng. Các thông báo tự động có khoảng nghỉ; chế độ Im lặng khi khuya vẫn được tôn trọng.
- Dùng giọng Việt của Web Speech nếu có. Máy này chưa cài giọng Việt, nên có các câu thoại MP3 tiếng Việt được tạo sẵn bằng gTTS và đóng gói trong app, không cần mạng lúc phát. Đây là giọng TTS, không phải giọng diễn viên lồng tiếng chính thức.
- Giảm chuyển động theo cài đặt hệ thống; tạm dừng hoạt ảnh khi cửa sổ không hoạt động. Khi WebGL không dùng được, có hình Doraemon phẳng thay thế.

Nguồn hình Luffy là dữ liệu đã có trong tệp `doraemon-3d-luffy.ts` trước khi chỉnh. Tệp WebP bị thiếu một byte đệm ở cuối đã được sửa để trình duyệt đọc được. Canvas xóa nền tối/tím nối với mép ảnh và giữ nét đen nằm bên trong nhân vật. Độ rõ bị giới hạn bởi ảnh gốc 156 × 156 px.

Mô hình bắt đầu từ dữ liệu tọa độ trong tài liệu người dùng cung cấp, thêm khối tròn và râu để đọc rõ ở kích thước nhỏ. Các màu của nhân vật được giữ theo yêu cầu.

Kiểm tra: biên bố cục, không chồng thẻ Codex 97% và dòng hạn mức tuần, khung CPU/RAM, chế độ sáng/tối, chọn Doraemon, phát lời thoại khi bấm, lưu lựa chọn Luffy qua khởi động lại, bốn nhóm lời thoại giải mã MP3, chỉ một AudioContext, tắt giọng và âm lượng bằng 0. Kiểm tra mã thuần xác nhận xóa nền giữ nét trong, tương thích hồ sơ cũ, quay chong chóng và nhắm mắt khi ngủ. Các lần chạy app thử đều ẩn và dùng hồ sơ riêng.

Build hiện tại biên dịch các thành phần companion từ source bằng esbuild, dùng chung React của bản Orca 1.4.220 và giữ runtime native của bản đang dùng. Chưa chạy build toàn bộ checkout. Oxfmt và Oxlint không chạy được do Windows Application Control chặn native binding; source đã được định dạng bằng Prettier và kiểm tra `git diff --check`.

Các công cụ và báo cáo cục bộ nằm trong `C:\Users\Edit\orca-companion`. Không tự commit hoặc push các thay đổi của người dùng.
