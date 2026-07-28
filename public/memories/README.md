# Thêm ảnh, video và nhạc

Toàn bộ website hoạt động bình thường khi chưa có file thật: mỗi vị trí trống sẽ tự dùng ảnh dự phòng. Chỉ cần chép file vào đúng thư mục theo đúng tên, không phải sửa code.

## Ảnh từng chặng

Mỗi chặng có 12 vị trí ảnh: `stage-n/photo-01.jpg` … `photo-12.jpg`

Số ảnh thực sự đang được dùng ở mỗi chặng:

| Chặng | Nội dung | Ảnh đang dùng |
|-------|----------|---------------|
| `stage-1` | Những ngày đầu, Mộc Châu | `photo-01` … `photo-08` |
| `stage-2` | Mùa hè bình yên | `photo-01` … `photo-08` |
| `stage-3` | Sinh nhật đầu tiên | `photo-01` … `photo-05` |
| `stage-4` | Mùa đông | không dùng ảnh (chỉ hội thoại) |
| `stage-5` | Xa cách, sinh nhật online | `photo-01` … `photo-04` |
| `stage-6` | Tết và chuyến đi mới | `photo-01` … `photo-08` |
| `stage-7` | Đốm lửa | `photo-01` |
| `stage-8` | Cánh đồng hoa | dùng ảnh của 7 chặng trước |

Màn mở quà lấy `photo-01.jpg` của các chặng 1–7 để tạo vòng ký ức, nên nếu chỉ có thời gian chuẩn bị ít ảnh thì hãy ưu tiên `photo-01.jpg` của mỗi chặng.

## Video

- Video từng chặng: `stage-n/video-01.mp4`
- **Video sinh nhật cuối: `final/birthday-video.mp4`** — đây là video quan trọng nhất, phát ở màn cuối.

Video không bao giờ tự phát. Nếu chưa có file, giao diện hiển thị khung chờ thay vì báo lỗi.

## Nhạc — mỗi chặng một bài

Mỗi chặng tự phát bài riêng khi mở, và tự chuyển bài (fade) khi sang chặng khác.

| File | Phát ở đâu | Bài bạn đã chọn |
|------|-----------|-----------------|
| `final/ambience.mp3` | Màn quán cà phê + bản đồ | (tùy bạn) |
| `stage-1/music.mp3` | Chặng 1 — Những ngày đầu | |
| **`stage-2/music.mp3`** | **Chặng 2 — Mùa hè bình yên** | **Nơi Này Có Anh — Sơn Tùng M-TP** |
| `stage-3/music.mp3` | Chặng 3 — Sinh nhật đầu tiên | |
| `stage-4/music.mp3` | Chặng 4 — Mùa đông | |
| `stage-5/music.mp3` | Chặng 5 — Xa cách | |
| `stage-6/music.mp3` | Chặng 6 — Tết | |
| `stage-7/music.mp3` | Chặng 7 — Đốm lửa | |
| `stage-8/music.mp3` | Chặng 8 — Cánh đồng hoa | |

Nhạc chỉ bắt đầu sau khi bạn nhấn "Mở bản đồ hành trình" (trình duyệt chặn tự phát tiếng trước khi người dùng bấm gì đó). Có nút bật/tắt ở góc dưới bên phải, và nhạc tự nhỏ lại khi video sinh nhật đang phát.

Chặng nào chưa có file thì đơn giản là im lặng, không lỗi.

## Khuyến nghị

- Ảnh ngang, tối thiểu 1600 px chiều rộng, định dạng `.jpg`
- Video nén sẵn, dưới khoảng 30 MB để mở nhanh trên điện thoại
- Giữ đúng tên file; có thể thay ảnh bất cứ lúc nào mà không cần sửa code
