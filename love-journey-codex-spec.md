# PROJECT BRIEF
# WEBSITE SINH NHẬT — “HÀNH TRÌNH CỦA CHÚNG TA”

## 1. Mục tiêu dự án

Xây dựng một website sinh nhật tương tác dành cho người yêu tôi.

Website kể lại hành trình tình yêu của hai người qua **8 giai đoạn**. Trải nghiệm phải giống một trò chơi kể chuyện nhẹ nhàng, trong đó người xem di chuyển qua một bản đồ và lần lượt mở từng chặng ký ức.

Ngày chính thức bắt đầu yêu nhau:

**27/01/2025**

Đây không phải landing page cuộn dọc thông thường.

Không hiển thị cả 8 chặng nối tiếp nhau trên một trang dài.

Bản đồ hành trình phải là giao diện trung tâm. Sau mỗi chặng, người xem quay lại bản đồ, chặng vừa hoàn thành phát sáng và con đường tiếp theo được mở khóa.

Luồng chính:

```text
Màn chào tại quán cà phê
→ Mở bản đồ
→ Đi đến chặng 1
→ Khám phá ảnh, video và lời kể
→ Quay lại bản đồ
→ Mở khóa chặng 2
→ Tiếp tục cho đến chặng 8
→ Mở món quà
→ Xem video sinh nhật
→ Đọc lời chúc và lời xin lỗi cuối cùng
```

---

## 2. Công nghệ

Sử dụng:

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion cho animation UI
- GSAP cho camera, bản đồ, di chuyển nhân vật và chuyển cảnh phức tạp
- GSAP MotionPathPlugin cho nhân vật đi theo đường SVG
- HTML5 Video cho video kỷ niệm
- HTML Audio API hoặc Howler.js cho nhạc nền
- Lucide React chỉ dùng cho các icon giao diện nhỏ

Không dùng thư viện UI khiến giao diện trông giống dashboard hoặc SaaS.

Không sử dụng layout card giống nhau cho tất cả các chặng.

---

## 3. Phong cách tổng thể

Phong cách:

- Romantic interactive storytelling
- Cinematic
- Mơ mộng nhưng chân thành
- Có cảm giác như một cuốn nhật ký tình yêu được biến thành thế giới phiêu lưu
- Tinh tế, trưởng thành
- Không quá trẻ con
- Không dùng quá nhiều trái tim, sticker hoặc icon dễ thương
- Ưu tiên thiên nhiên, ánh sáng, không gian, thời tiết và các vật thể kể chuyện

Mỗi chặng phải thể hiện một trạng thái cảm xúc khác nhau.

Hành trình cảm xúc:

```text
Ấm áp
→ Hạnh phúc
→ Gần gũi
→ Lạnh dần
→ Xa cách nhưng vẫn quan tâm
→ Tìm lại niềm vui và gặp thử thách
→ Im lặng, suy tư
→ Bình yên, chân thành và hy vọng
```

---

## 4. Hệ thống màu

Khai báo CSS variables:

```css
:root {
  --pink-primary: #E9A9BF;
  --pink-soft: #F7D6E1;
  --pink-light: #FFF1F6;
  --pink-deep: #C97E99;

  --cream: #FFF7F0;
  --warm-white: #FFFDFC;
  --peach: #F5C9B8;
  --lavender: #D9CEE8;

  --green-light: #B9C9A5;
  --green-natural: #718662;
  --green-deep: #3E5140;

  --brown-light: #C8A584;
  --brown-wood: #765641;
  --brown-dark: #44352E;

  --winter-blue: #AEBECC;
  --winter-grey: #79858C;
  --night-blue: #202632;
  --night-purple: #353044;

  --fire-light: #F2B66D;
  --fire-deep: #C97145;

  --text-primary: #493B40;
  --text-secondary: #74636A;
  --text-light: #FFF9FB;
  --text-muted: #A49399;

  --path-locked: #CFC8CB;
  --path-active: #E9A9BF;
  --path-completed: #C97E99;
}
```

Không dùng màu hồng giống nhau cho mọi chặng.

Màu hồng là màu nhận diện xuyên suốt, nhưng phải kết hợp với màu theo mùa và trạng thái cảm xúc.

---

## 5. Typography

Tiêu đề:

- Cormorant Garamond
- Hoặc Playfair Display

Nội dung:

- Manrope
- Hoặc Inter

Lời thư và lời xin lỗi:

- Caveat
- Hoặc một font viết tay nhẹ, dễ đọc

Không dùng quá nhiều font viết tay.

Kích thước:

```css
:root {
  --title-hero: clamp(46px, 7vw, 90px);
  --title-scene: clamp(34px, 5vw, 64px);
  --title-section: clamp(26px, 3vw, 42px);
  --body-large: clamp(17px, 1.5vw, 21px);
  --body-base: 16px;
  --caption: 13px;
}
```

---

## 6. Nguyên tắc animation

Animation phải chậm, mềm mại và có cảm xúc.

Easing chính:

```css
cubic-bezier(0.22, 1, 0.36, 1)
```

Easing cinematic:

```css
cubic-bezier(0.76, 0, 0.24, 1)
```

Thời lượng:

- Hover: 200–280ms
- Text reveal: 700–1000ms
- Modal: 600–800ms
- Scene transition: 1200–1800ms
- Camera zoom: 1400–2200ms
- Camera pan: 1800–3000ms
- Nhân vật di chuyển: 3000–6000ms
- Chuyển ngày sang đêm: 2500–4000ms

Không sử dụng:

- Bounce mạnh
- Elastic
- Camera rung
- Zoom đột ngột
- Confetti liên tục
- Trái tim bay khắp màn hình
- Text typewriter quá nhanh
- Animation làm người xem mất kiểm soát

Ưu tiên animate:

- `transform`
- `opacity`
- `filter` với mức blur vừa phải

---

## 7. Màn chào — quán cà phê nơi bắt đầu

Màn đầu tiên là nơi hai người bắt đầu gặp nhau.

Thiết kế một quán cà phê truyền thống trong khu vườn nhiều cây xanh, lấy cảm hứng từ ảnh tham khảo tôi cung cấp.

Đặc điểm không gian:

- Quán cà phê sân vườn truyền thống
- Nhiều cây xanh và tán lá lớn
- Bàn ghế gỗ
- Mái ngói đỏ
- Cột gạch mộc
- Đèn lồng vàng và đỏ
- Hồ nước hoặc tiểu cảnh đá nhỏ
- Ánh nắng xuyên qua tán cây
- Không gian đông người ở phía xa nhưng khu vực trung tâm vẫn riêng tư
- Cảm giác bình dị, gần gũi và mang nét truyền thống Việt Nam

Không sao chép nguyên ảnh. Chỉ sử dụng ảnh làm tài liệu tham khảo về không khí, cây xanh, đèn lồng, mái ngói và bố cục quán.

### Bố cục

- Toàn màn hình là cảnh quán cà phê
- Camera nhìn từ lối đi vào bên trong
- Ở trung tâm có một bàn gỗ dành cho hai người
- Trên bàn có hai cốc nước, một bông hoa nhỏ và một cuộn bản đồ
- Phía sau có đèn lồng, cây và mái quán
- Có các vùng ánh sáng và bóng cây chuyển động nhẹ

### Nội dung

Tiêu đề:

> Chào mừng em.

Nội dung phụ:

> Đây là nơi câu chuyện của chúng ta bắt đầu.

Dòng ngày:

> 27.01.2025

Lời mở đầu:

> Trước khi mở món quà sinh nhật, em hãy cùng anh đi lại hành trình của chúng ta nhé.

Nút:

> Mở bản đồ hành trình

### Animation khi vào

1. Background fade từ đen sang cảnh quán trong 1.4 giây.
2. Ánh nắng từ từ xuất hiện qua tán cây.
3. Lá cây chuyển động nhẹ.
4. Đèn lồng đung đưa rất chậm.
5. Hơi nước từ hai cốc nước bay lên.
6. Camera tiến nhẹ về phía chiếc bàn.
7. Tiêu đề “Chào mừng em” hiện lên bằng fade, blur và translateY.
8. Ngày 27.01.2025 xuất hiện sau tiêu đề 500ms.
9. Nút mở bản đồ xuất hiện cuối cùng.

### Khi nhấn “Mở bản đồ hành trình”

1. Camera tiến đến cuộn bản đồ trên bàn.
2. Cuộn bản đồ tự mở ra.
3. Ánh sáng hồng vàng xuất hiện từ bản đồ.
4. Camera zoom vào bản đồ.
5. Bản đồ giấy biến thành một thế giới sống động.
6. Chuyển sang màn bản đồ chính.

---

## 8. Bản đồ hành trình

Thiết kế một bản đồ fantasy nhẹ nhàng nhưng không quá hoạt hình.

Bản đồ gồm 8 khu vực nối với nhau bằng một con đường uốn lượn:

1. Núi và quán nhỏ — nơi bắt đầu và chuyến đi Mộc Châu
2. Mùa hè bình yên
3. Ngôi nhà sinh nhật đầu tiên
4. Mùa đông nhiều khoảng cách
5. Căn phòng hồi phục và những cuộc gọi
6. Tết và chuyến đi mới
7. Đêm im lặng bên đốm lửa
8. Cánh đồng hoa sinh nhật

Bản đồ phải thể hiện sự thay đổi thời gian và cảm xúc:

- Đầu bản đồ: sáng, xanh và trong trẻo
- Giữa bản đồ: ấm áp rồi chuyển lạnh
- Gần cuối: tối và nhiều sương
- Chặng cuối: ánh sáng hồng và bình minh mới

### Chặng chưa mở

- Phủ sương
- Màu xám
- Không thể nhấn

### Chặng hiện tại

- Có vòng sáng nhẹ
- Con đường đến chặng phát sáng
- Có animation pulse rất nhẹ

### Chặng hoàn thành

- Có hoa nhỏ hoặc ánh sáng
- Hiển thị dấu tích tinh tế
- Có thể mở lại sau khi hoàn thành toàn bộ hành trình

---

## 9. Nhân vật và camera

Có hai nhân vật nhỏ đại diện cho hai người.

Phong cách nhân vật:

- Nhìn từ phía sau
- Không cần chi tiết khuôn mặt
- Không quá chibi
- Trang phục đơn giản
- Dáng người nhỏ so với khung cảnh

Khi người dùng nhấn chặng tiếp theo:

1. Con đường SVG được vẽ sáng dần.
2. Hai nhân vật bắt đầu đi.
3. Camera pan theo nhân vật.
4. Background có parallax.
5. Thời tiết và ánh sáng thay đổi dần theo chặng.
6. Khi đến địa điểm, nhân vật dừng.
7. Node phát sáng.
8. Camera zoom vào chặng.
9. Màn ký ức mở ra.

Không dịch chuyển tức thời.

---

## 10. Chặng 1 — khởi đầu và chuyến đi Mộc Châu

### Nội dung cảm xúc

Chặng này lưu giữ:

- Những kỷ niệm đầu tiên
- Các bức ảnh ban đầu của hai người
- Video chuyến du lịch đầu tiên
- Những khoảnh khắc vui vẻ
- Chuyến đi Mộc Châu
- Không khí lạnh nhưng cảm xúc ấm áp

### Khung cảnh

- Mộc Châu vào mùa lạnh
- Đồi chè
- Núi xa
- Sương mỏng
- Trời xanh xám
- Một căn nhà gỗ hoặc quán nhỏ
- Hai chiếc khăn choàng
- Hơi thở lạnh
- Cây cối và đồng cỏ chuyển động nhẹ
- Ánh nắng mùa đông nhạt

Màu:

```css
--stage-1-sky: #DCE5E8;
--stage-1-green: #849879;
--stage-1-fog: #EDF1F0;
--stage-1-brown: #806A58;
--stage-1-warm: #E7B99C;
```

### Tương tác

Thiết kế như một cuốn sổ du lịch đặt trên một chiếc bàn gỗ ngoài trời.

Các phần:

- Vé xe hoặc tấm bản đồ Mộc Châu
- Các tấm ảnh Polaroid
- Một máy ảnh nhỏ
- Một chiếc điện thoại chứa video
- Một tờ ghi ngày tháng
- Một chiếc khăn

Người xem nhấn vào từng vật thể:

- Ảnh mở gallery
- Điện thoại mở video
- Vé xe mở lời kể về chuyến đi
- Khăn mở một lời nhắn về thời tiết lạnh
- Bản đồ đánh dấu những nơi đã đi

Lời dẫn:

> Chuyến đi đầu tiên của chúng ta là vào những ngày trời lạnh. Nhưng có lẽ vì có em, anh lại nhớ về nó như một khoảng thời gian rất ấm áp.

Khi mở đủ ký ức, sương tan nhẹ và con đường tiếp theo xuất hiện.

---

## 11. Chặng 2 — mùa hè bình yên

### Nội dung cảm xúc

Đây là quãng thời gian vui vẻ và bình yên nhất.

Hai người yêu nhau một cách đơn giản:

- Đi chơi
- Xem phim
- Đi ăn
- Đi dạo
- Cười nói
- Dành thời gian ở bên nhau
- Không cần điều gì quá đặc biệt

### Khung cảnh

- Mùa hè
- Bầu trời trong
- Nắng vàng
- Công viên
- Rạp chiếu phim
- Quán ăn nhỏ
- Con phố về chiều
- Cây xanh và gió nhẹ
- Một chiếc xe hoặc ghế đá

Màu:

```css
--stage-2-sky: #CFEAF2;
--stage-2-sun: #F4D58D;
--stage-2-green: #AFC49A;
--stage-2-peach: #F0BFAE;
--stage-2-cream: #FFF4DF;
```

### Tương tác

Thiết kế như một ngày hè có nhiều địa điểm nhỏ.

Người xem có thể nhấn vào:

- Rạp phim để xem video hoặc ảnh
- Ghế đá để đọc một lời kể
- Quầy đồ ăn để xem ảnh đi ăn
- Vé xem phim để mở ngày tháng
- Một chiếc máy ảnh để xem album ngắn
- Một cây kem để mở một câu nói vui

Lời dẫn:

> Có một khoảng thời gian, tình yêu của chúng ta thật đơn giản. Chỉ cần gặp nhau, đi đâu đó, xem một bộ phim hoặc cùng ngồi cạnh nhau là đã đủ vui.

Animation:

- Nắng di chuyển chậm
- Lá cây rung
- Mây trôi
- Ánh sáng phản chiếu
- Tiếng ve hoặc ambience mùa hè rất nhỏ

Chặng này phải sáng, nhẹ và thoải mái nhất trong toàn bộ hành trình.

---

## 12. Chặng 3 — sinh nhật đầu tiên bên nhau

### Nội dung cảm xúc

Đây là lần đầu tiên tôi đón sinh nhật cùng em.

Hai người có không gian riêng tư, gần gũi, như đang ở trong một căn nhà của riêng mình.

Dù đã có những cãi vã nhỏ, cả hai vẫn có một sinh nhật vui vẻ, cùng đi dạo, cười nói và ở bên nhau.

### Khung cảnh

- Một căn nhà nhỏ
- Ánh đèn vàng
- Sofa
- Bàn ăn
- Một chiếc bánh sinh nhật
- Hai chiếc cốc
- Cửa sổ nhìn ra buổi tối
- Ảnh được đặt trên tường
- Một máy chiếu hoặc TV phát video
- Không gian yên tĩnh và riêng tư

Màu:

```css
--stage-3-wall: #F4E5DC;
--stage-3-light: #F2C98F;
--stage-3-wood: #80614F;
--stage-3-night: #4D4A59;
--stage-3-pink: #DB9BB0;
```

### Tương tác

Người xem di chuyển trong căn phòng và nhấn vào các vật:

- Bánh sinh nhật mở lời kể
- Khung ảnh mở album
- TV hoặc máy chiếu mở video
- Cửa sổ mở cảnh hai người đi dạo
- Hai chiếc cốc mở một đoạn hội thoại
- Một tờ giấy nhỏ mở lời nhắn

Lời dẫn:

> Đó là lần đầu tiên anh được đón sinh nhật cùng em. Không phải mọi khoảnh khắc đều hoàn hảo, nhưng anh vẫn nhớ ngày hôm ấy như một ngày rất gần gũi và ấm áp.

Khi hoàn thành:

- Đèn phòng sáng hơn
- Hai chiếc bóng người ngồi gần nhau
- Camera lùi ra ngoài cửa sổ
- Chuyển sang bản đồ

---

## 13. Chặng 4 — mùa đông và những cãi vã

### Nội dung cảm xúc

Mùa đông bắt đầu.

Hai người xuất hiện nhiều cãi vã và hiểu lầm.

Những vấn đề không được giải quyết hoàn toàn.

Hai người đi chơi ít hơn, nhưng vẫn lựa chọn ở bên nhau.

Không biến chặng này thành quá bi kịch.

Phải thể hiện rằng dù khó khăn, cả hai vẫn chưa buông tay.

### Khung cảnh

- Một thành phố mùa đông
- Trời lạnh
- Mưa phùn hoặc tuyết tượng trưng rất nhẹ
- Hai người đứng ở hai đầu một cây cầu
- Đèn đường vàng nhạt
- Quán xá đóng cửa sớm
- Con đường vắng
- Sương lạnh
- Có một chiếc ô nằm giữa hai người

Màu:

```css
--stage-4-sky: #9DAAB3;
--stage-4-blue: #71808B;
--stage-4-grey: #626B72;
--stage-4-light: #D8C39E;
--stage-4-muted-pink: #B98C9D;
```

### Tương tác

Thiết kế các mảnh hội thoại bị tách rời trong không gian.

Người xem cần ghép từng đoạn hội thoại hoặc kéo hai mảnh giấy lại gần nhau.

Một số đoạn không ghép hoàn toàn, thể hiện những điều chưa được giải quyết.

Có thể có:

- Hai chiếc ghế cách xa nhau
- Hai màn hình tin nhắn
- Chiếc ô ở giữa
- Một bức ảnh cũ vẫn còn sáng
- Một đoạn đường nhỏ vẫn nối hai người

Lời dẫn:

> Chúng ta bắt đầu có những điều không hiểu được nhau. Có những cuộc nói chuyện không đi đến đâu. Nhưng giữa những ngày lạnh nhất, cả hai vẫn chọn chưa rời đi.

Kết chặng:

- Hai người cùng cầm chiếc ô
- Không ôm nhau hoặc quá lãng mạn
- Chỉ đơn giản là cùng bước tiếp

---

## 14. Chặng 5 — biến cố, xa cách và sinh nhật online

### Nội dung cảm xúc

Tôi gặp biến cố lớn và bị gãy tay.

Hai người xa cách về khoảng cách, nhưng vẫn trò chuyện qua điện thoại.

Tôi buồn vì em không đến thăm và không thể đón sinh nhật cùng nhau đúng ngày.

Sau đó em vẫn đến, mang đồ ăn khi tôi ra viện về nhà và cùng tôi đón sinh nhật online.

Mọi chuyện cuối cùng vẫn ổn và tiếp tục trôi qua.

### Khung cảnh

Chia màn hình thành hai không gian.

Bên trái:

- Phòng bệnh hoặc căn phòng hồi phục
- Cánh tay băng bó
- Ánh sáng xanh lạnh
- Một chiếc giường
- Bàn thuốc
- Điện thoại đang sáng

Bên phải:

- Căn phòng của cô ấy
- Ánh sáng ấm hơn
- Điện thoại
- Một túi đồ ăn
- Một chiếc bánh nhỏ hoặc ngọn nến
- Cửa sổ ban đêm

Hai không gian được nối bằng một đường sáng từ hai chiếc điện thoại.

Màu:

```css
--stage-5-hospital: #D8E2E5;
--stage-5-blue: #8EA3AC;
--stage-5-room: #E7C6AF;
--stage-5-phone: #E9A9BF;
--stage-5-night: #333846;
```

### Tương tác

Người xem nhấn vào điện thoại để mở:

- Cuộc gọi
- Tin nhắn vui
- Ảnh chụp màn hình
- Video call
- Lời kể về cảm giác xa cách

Một túi đồ ăn xuất hiện ở cuối chặng.

Khi nhấn vào túi đồ ăn:

- Ánh sáng căn phòng ấm lên
- Một lời nhắn xuất hiện:

> Dù em không xuất hiện theo cách anh đã mong đợi, anh vẫn nhớ khoảnh khắc em đến và mang theo sự quan tâm của mình.

Có một chiếc bánh nhỏ trên màn hình điện thoại để thể hiện sinh nhật online.

Không đổ lỗi hoặc tạo cảm giác trách móc nặng nề.

Cảm xúc phải gồm:

- Buồn
- Thất vọng
- Nhưng vẫn biết ơn
- Vẫn còn kết nối

---

## 15. Chặng 6 — Tết, chuyến đi mới và thử thách

### Nội dung cảm xúc

Hai người bắt đầu đón Tết cùng nhau và có thêm một chuyến du lịch.

Tình cảm bước sang một mức khác.

Đầu giai đoạn rất vui vẻ, nhưng về cuối lại xuất hiện một thử thách lớn:

Hai người có thể thấu hiểu và chấp nhận nhau hay không?

Có nhiều cuộc cãi vã, nhưng tôi vẫn muốn cảm ơn em vì em luôn chọn ở lại.

### Khung cảnh

Màn hình bắt đầu bằng không khí Tết:

- Hoa đào hoặc hoa mai
- Đèn lồng đỏ hồng
- Pháo hoa rất nhẹ ở xa
- Phố xuân
- Bao lì xì
- Hai người đi bên nhau

Sau đó chuyển sang:

- Một chuyến du lịch mới
- Núi, biển hoặc đường đi
- Album ảnh
- Những khoảnh khắc vui vẻ

Cuối chặng:

- Bầu trời chuyển dần tối
- Con đường chia thành hai hướng
- Hai người đứng ở ngã rẽ
- Nhưng sau đó cùng chọn một con đường

Màu:

```css
--stage-6-red: #C96B72;
--stage-6-pink: #E7A1B4;
--stage-6-gold: #DDB66D;
--stage-6-green: #73866A;
--stage-6-dusk: #665C72;
```

### Tương tác

Phần đầu:

- Mở lì xì để xem ảnh
- Nhấn đèn lồng để xem video
- Mở album chuyến đi
- Nhấn dấu ghim để xem địa điểm

Phần cuối:

- Người xem phải chọn một trong hai con đường
- Hai con đường có thể mang tên:
  - “Chỉ muốn được hiểu”
  - “Học cách hiểu nhau”

Dù chọn đường nào, trải nghiệm vẫn dẫn đến thông điệp:

> Tình yêu không phải lúc nào cũng là tìm được một người giống mình. Đôi khi, đó là học cách hiểu và chấp nhận một người khác mình.

Lời cảm ơn:

> Cảm ơn em vì dù có những lúc rất khó khăn, em vẫn chọn ở lại.

---

## 16. Chặng 7 — xa cách, im lặng và đốm lửa

### Nội dung cảm xúc

Hai người xa cách dần.

Tình yêu trở nên nặng nề.

Hai người cãi nhau nhiều hơn và không còn đi chơi nhiều như trước.

Cả hai đều chỉ muốn đối phương hiểu cho mình.

Những cuộc cãi vã không có hồi kết.

Đỉnh điểm là khoảng thời gian im lặng một tháng.

Chặng này cần thể hiện sự cô đơn, suy tư và tiếc nuối, nhưng vẫn còn một đốm lửa nhỏ chưa tắt.

### Khung cảnh

- Một không gian tối
- Có thể là bìa rừng, bãi đất hoặc đỉnh đồi ban đêm
- Hai người ngồi cách nhau
- Giữa hai người là một đốm lửa nhỏ
- Bầu trời nhiều mây
- Gió lạnh
- Cây khô
- Không gian rộng và yên lặng
- Không có quá nhiều vật thể

Màu:

```css
--stage-7-night: #191D27;
--stage-7-blue: #292E3C;
--stage-7-purple: #383142;
--stage-7-fire: #D6814D;
--stage-7-ember: #F1B46D;
--stage-7-text: #DED7DC;
```

### Âm thanh

- Tiếng gió rất nhẹ
- Tiếng củi cháy
- Không dùng nhạc quá buồn
- Có thể dùng piano tối giản với khoảng lặng dài

### Tương tác

Người xem nhấn vào các đốm than trong lửa.

Mỗi đốm than mở:

- Một lời nhắn
- Một điều chưa nói
- Một lời xin lỗi
- Một bức ảnh
- Một ký ức đẹp đã cũ
- Một câu thể hiện mong muốn được hiểu

Các lời nhắn không xuất hiện như chat bubble thông thường.

Chúng nên xuất hiện như các mảnh giấy hoặc câu chữ bay lên từ ngọn lửa.

Placeholder:

> Anh xin lỗi vì có những lúc chỉ muốn em hiểu cho anh, nhưng lại quên mất rằng em cũng đang cần được lắng nghe.

> Anh xin lỗi vì những lời nói trong lúc nóng giận đã khiến tình yêu của chúng ta trở nên nặng nề.

> Anh không muốn phủ nhận những tổn thương đã xảy ra. Anh chỉ muốn thành thật rằng anh vẫn luôn trân trọng em.

Khi mở đủ các lời nhắn:

- Ngọn lửa sáng hơn một chút
- Hai nhân vật không nhất thiết tiến sát lại
- Chỉ cần cùng nhìn vào ngọn lửa
- Một con đường hoa rất mờ xuất hiện phía trước

Thông điệp cuối:

> Có những khoảng lặng khiến hai người xa nhau. Nhưng trong anh, vẫn còn một điều chưa từng thật sự tắt.

Không làm chặng này quá bi lụy hoặc tạo áp lực để người xem phải tha thứ.

---

## 17. Chặng 8 — sinh nhật, lời chúc và lời xin lỗi

### Nội dung cảm xúc

Đây là chặng cuối cùng và là ngày sinh nhật của cô ấy.

Tôi muốn gửi:

- Một video do chính tôi quay
- Lời chúc sinh nhật
- Lời xin lỗi chân thành
- Sự biết ơn
- Tình yêu
- Mong muốn được lắng nghe và hiểu cô ấy hơn

Không biến lời chúc thành lời ép buộc quay lại hoặc yêu cầu tha thứ.

Phải chân thành, nhẹ nhàng và tôn trọng cảm xúc của cô ấy.

### Khung cảnh

- Một cánh đồng hoa rộng
- Tông hồng pastel
- Bầu trời bình minh hoặc hoàng hôn nhẹ
- Gió thổi qua cánh đồng
- Hoa chuyển động nhẹ
- Một con đường nhỏ dẫn đến giữa cánh đồng
- Một cây lớn hoặc mái hiên nhỏ
- Một hộp quà đặt ở cuối con đường
- Hai chiếc ghế hoặc hai chỗ ngồi cạnh nhau
- Không gian đơn giản, bình yên và nhiều khoảng thở

Màu:

```css
--stage-8-sky: #F4D7E2;
--stage-8-field: #D9B4C2;
--stage-8-flower: #EAAFC4;
--stage-8-cream: #FFF5EF;
--stage-8-light: #FFE5C7;
--stage-8-text: #59434C;
```

### Camera chuyển từ chặng 7 đến chặng 8

1. Camera đi theo con đường tối.
2. Đốm lửa phía sau trở nên nhỏ dần.
3. Bầu trời bắt đầu sáng.
4. Màu xanh tối chuyển sang lavender.
5. Lavender chuyển sang hồng pastel.
6. Hoa bắt đầu xuất hiện dọc con đường.
7. Camera tiến vào cánh đồng hoa.
8. Nhân vật dừng trước hộp quà.

### Nội dung trước khi mở quà

Tiêu đề:

> Chúc mừng sinh nhật em.

Nội dung:

> Cảm ơn em vì đã cùng anh đi qua toàn bộ hành trình này.

> Có những điều anh muốn nói bằng chính giọng nói của mình.

Nút:

> Mở món quà của anh

### Animation mở quà

1. Nút fade out.
2. Cánh hoa xung quanh chậm lại.
3. Hộp quà rung rất nhẹ một lần.
4. Nơ từ từ bung ra.
5. Nắp hộp mở lên.
6. Ánh sáng hồng và vàng tràn ra.
7. Các ảnh từ 7 chặng trước bay lên.
8. Ảnh tạo thành một vòng ký ức xung quanh hộp.
9. Camera tiến vào ánh sáng.
10. Màn video xuất hiện.

Không dùng confetti nhiều.

Không dùng hiệu ứng vui nhộn.

Cảm giác cần có:

- Chân thành
- Bình yên
- Trân trọng
- Riêng tư

---

## 18. Màn video cuối

Video không tự động phát khi chưa có tương tác.

Hiển thị:

> Có vài điều anh muốn tự mình nói với em.

Nút:

> Xem video

Khi phát video:

- Nhạc nền giảm âm lượng trong 800ms
- Background tối nhẹ
- Cánh hoa dừng hoặc giảm tốc
- Các nút phụ biến mất
- Video trở thành trung tâm
- Không tự động chuyển khỏi video khi video đang phát

Sau khi video kết thúc:

- Chờ 800ms
- Video fade out nhẹ
- Hiển thị lời chúc cuối

---

## 19. Lời chúc cuối

Hiển thị từng đoạn, không hiện tất cả cùng lúc.

Nội dung placeholder:

> Chúc mừng sinh nhật em.

> Cảm ơn em vì đã xuất hiện trong cuộc đời anh từ ngày 27/01/2025.

> Cảm ơn em vì những ngày vui vẻ, những chuyến đi, những khoảnh khắc bình thường và cả những lần chúng ta vẫn chọn ở lại.

> Anh xin lỗi vì những lúc anh chưa biết cách lắng nghe, vì những lời nói và hành động đã làm em tổn thương.

> Anh không mong món quà này có thể xóa đi những điều đã xảy ra. Anh chỉ mong nó giúp em hiểu rằng anh thật lòng trân trọng những gì chúng ta đã có.

> Anh chúc em tuổi mới luôn bình an, vui vẻ, được yêu thương và được sống đúng với những điều em mong muốn.

> Cảm ơn em vì đã cùng anh đi qua hành trình này.

Dòng cuối:

> Happy Birthday, my love.

Nút cuối:

> Xem lại hành trình của chúng ta

---

## 20. Cấu trúc dữ liệu

Không hard-code toàn bộ ảnh và video trong component.

Tạo file:

```text
data/journey.ts
```

Kiểu dữ liệu:

```ts
export type MemoryMedia = {
  id: string;
  type: "image" | "video";
  src: string;
  poster?: string;
  alt: string;
  caption?: string;
  date?: string;
};

export type JourneyStage = {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  period?: string;
  description: string[];
  theme: string;
  status: "locked" | "available" | "active" | "completed";
  position: {
    x: number;
    y: number;
  };
  camera: {
    x: number;
    y: number;
    scale: number;
  };
  media: MemoryMedia[];
  messages: string[];
};
```

Đường dẫn media:

```text
/public/memories/stage-1/photo-01.webp
/public/memories/stage-1/video-01.mp4
/public/memories/stage-2/photo-01.webp
/public/memories/stage-2/video-01.mp4
...
/public/memories/final/birthday-video.mp4
```

Nếu file chưa tồn tại, hiển thị placeholder đẹp thay vì làm lỗi giao diện.

---

## 21. Cấu trúc component

```text
app/
  page.tsx

components/
  journey/
    JourneyExperience.tsx
    IntroCafeScene.tsx
    AdventureMap.tsx
    MapCamera.tsx
    MapWorld.tsx
    MapPath.tsx
    MapNode.tsx
    CoupleCharacters.tsx
    JourneyProgress.tsx
    SceneTransition.tsx
    MusicControl.tsx

  stages/
    StageOneMocChau.tsx
    StageTwoSummer.tsx
    StageThreeFirstBirthday.tsx
    StageFourWinterConflict.tsx
    StageFiveRecovery.tsx
    StageSixTetJourney.tsx
    StageSevenSilentFire.tsx
    StageEightBirthdayField.tsx

  memories/
    MemoryGallery.tsx
    MemoryImage.tsx
    MemoryVideo.tsx
    MemoryModal.tsx
    LetterReveal.tsx
    PhoneCallMemory.tsx
    GiftOpening.tsx
    FinalVideo.tsx
    FinalMessage.tsx

data/
  journey.ts

hooks/
  useJourneyState.ts
  useBackgroundAudio.ts
  useReducedMotion.ts
```

---

## 22. State và luồng điều khiển

State:

```ts
type JourneyState = {
  currentStage: number;
  completedStages: number[];
  activeScene: number | null;
  isMoving: boolean;
  isTransitioning: boolean;
  musicEnabled: boolean;
  hasStarted: boolean;
};
```

Không cho phép người dùng:

- Nhấn nhiều chặng cùng lúc
- Mở chặng bị khóa
- Di chuyển khi animation trước chưa kết thúc
- Mở nhiều modal media cùng lúc

Flow:

```ts
async function visitStage(stageIndex: number) {
  if (isMoving || isTransitioning) return;
  if (!isStageAvailable(stageIndex)) return;

  setIsMoving(true);

  await animatePathUnlock(stageIndex);
  await moveCharacters(stageIndex);
  await focusCamera(stageIndex);
  await openStageScene(stageIndex);

  setIsMoving(false);
}
```

Hoàn thành chặng:

```ts
async function completeStage(stageIndex: number) {
  markStageCompleted(stageIndex);

  await closeStageScene();
  await zoomOutToMap();
  await illuminateStage(stageIndex);
  await unlockNextStage(stageIndex + 1);

  setCurrentStage(stageIndex + 1);
}
```

---

## 23. Âm thanh

Không tự phát âm thanh trước khi người dùng nhấn nút bắt đầu.

Mỗi chặng có ambience khác nhau:

- Màn cà phê: tiếng chim, lá cây và quán nhỏ
- Chặng 1: gió lạnh vùng núi
- Chặng 2: ambience mùa hè
- Chặng 3: tiếng phòng ấm và phố đêm
- Chặng 4: gió mùa đông
- Chặng 5: tiếng phòng yên tĩnh và âm báo điện thoại nhẹ
- Chặng 6: nhạc Tết nhẹ, sau đó chuyển cinematic
- Chặng 7: tiếng gió và củi cháy
- Chặng 8: piano nhẹ và tiếng gió qua cánh đồng hoa

Volume:

```text
Background music: 0.25–0.35
Ambience: 0.10–0.20
Interaction sound: 0.15–0.25
Final video: controlled by user
```

Có nút bật và tắt âm thanh ở góc màn hình.

---

## 24. Responsive

### Desktop

- Bản đồ rộng
- Camera có thể pan nhiều
- Hiển thị nhiều lớp phong cảnh
- Progress đặt bên phải

### Mobile

- Không dựa vào hover
- Tất cả node tối thiểu 48x48px
- Button cao tối thiểu 48px
- Giảm 50% số particle
- Giảm blur
- Camera zoom tối đa khoảng 1.5
- Nội dung dài sử dụng bottom sheet
- Gallery vuốt ngang
- Video full width
- Thanh tiến trình đặt ở dưới
- Hỗ trợ landscape nếu cần xem bản đồ rộng

---

## 25. Accessibility

Bắt buộc:

- Alt text cho ảnh
- Caption cho video nếu có
- Nút có `aria-label`
- Điều khiển được bằng bàn phím
- Focus state rõ
- Không sử dụng màu làm tín hiệu duy nhất
- Có chế độ giảm chuyển động
- Không autoplay video có tiếng
- Không chặn người dùng nếu họ muốn tắt nhạc

Với:

```css
@media (prefers-reduced-motion: reduce)
```

Hãy:

- Tắt parallax
- Thay character walk bằng fade hoặc translate ngắn
- Giảm camera zoom
- Giảm thời lượng animation
- Tắt particle liên tục

---

## 26. Hiệu năng

Bắt buộc:

- Dùng Next Image
- Ảnh dùng WebP hoặc AVIF
- Video có poster
- Lazy load video
- Không preload toàn bộ video
- Chỉ load media của chặng hiện tại và chặng kế tiếp
- Dừng animation khi tab bị ẩn
- Không render hàng trăm particle
- Không animate `width`, `height`, `top` hoặc `left`
- Ưu tiên `transform` và `opacity`
- Chỉ dùng `will-change` cho element đang animation
- Mobile giảm particle, shadow và backdrop blur

---

## 27. Yêu cầu về nội dung nhạy cảm

Website kể lại cả kỷ niệm vui và những giai đoạn khó khăn.

Không dùng câu chữ:

- Đổ lỗi
- Gây áp lực
- Ép cô ấy phải tha thứ
- Ép quay lại
- Khiến người xem cảm thấy có trách nhiệm với cảm xúc của người gửi

Lời xin lỗi phải:

- Nhận trách nhiệm
- Không biện minh
- Không phủ nhận tổn thương
- Không yêu cầu phản hồi ngay
- Tôn trọng lựa chọn và cảm xúc của cô ấy

Phong cách viết:

- Chân thành
- Nhẹ nhàng
- Trưởng thành
- Không quá sến
- Không bi lụy
- Không thao túng cảm xúc

---

## 28. Tiêu chí hoàn thành

Sản phẩm chỉ được coi là hoàn thành khi:

1. Có màn chào tại quán cà phê truyền thống.
2. Hiển thị rõ ngày 27.01.2025.
3. Có bản đồ với đúng 8 chặng.
4. Nhân vật di chuyển theo đường trên bản đồ.
5. Camera theo nhân vật và zoom vào chặng.
6. Mỗi chặng có phong cảnh riêng.
7. Mỗi chặng có kiểu tương tác riêng.
8. Có thể thêm ảnh và video bằng file dữ liệu.
9. Có trạng thái khóa, mở và hoàn thành.
10. Có nút bật tắt âm thanh.
11. Có màn mở quà.
12. Có video sinh nhật cuối.
13. Có lời chúc và lời xin lỗi cuối.
14. Hoạt động tốt trên desktop và mobile.
15. Không biến thành landing page cuộn dọc.
16. Không sử dụng một layout card lặp lại cho 8 chặng.
17. Code được chia component rõ ràng.
18. Không để lỗi khi media placeholder chưa tồn tại.

---

## 29. Thứ tự triển khai bắt buộc

Trước tiên hãy tạo:

1. Cấu trúc project
2. File dữ liệu 8 chặng
3. Bản đồ cơ bản
4. State quản lý hành trình
5. Màn quán cà phê
6. Chặng 1
7. Hệ thống animation dùng lại

Sau khi phần nền tảng hoạt động ổn định mới tiếp tục xây các chặng còn lại.

Không viết toàn bộ website trong một file duy nhất.

Không dùng dữ liệu giả khó thay thế.

Không tự thay đổi nội dung câu chuyện.

---

## 30. Yêu cầu cách làm việc dành cho AI coding agent

Trước khi code:

1. Đọc toàn bộ file này.
2. Tóm tắt kiến trúc sẽ triển khai.
3. Liệt kê các file sẽ tạo hoặc chỉnh sửa.
4. Chỉ bắt đầu code sau khi đã hiểu đúng luồng.
5. Không tự ý rút gọn từ 8 chặng xuống ít hơn.
6. Không chuyển thiết kế thành landing page.
7. Không thay đổi ngày bắt đầu 27/01/2025.
8. Không tự viết lại nội dung câu chuyện theo hướng khác.
9. Mỗi lần chỉ triển khai một phần rõ ràng.
10. Sau mỗi phần, chạy lint, type-check và build nếu project hỗ trợ.
